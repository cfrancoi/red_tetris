
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import RoomPlayerList from "../../../components/room/RoomPlayerList/RoomPlayerList";
import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../../../context/SocketContext";
import StartRoomComponent from "../../../components/room/startRoom/StartRoomComponent";
import { ERoomStatus, addPlayerToRoom, removePlayer, setGameState, setRoomId, updatePlayer } from "../../../slice/tetrisSlice";
import Tetris from "../tetris/Tetris";
import Navbar from "../../../components/layout/Navbar";
import { routes } from "../../../routes/route.constant";
import RoomStatus from "../../../components/room/roomStatus/RoomStatus";
import EndingRoom from "../../../components/room/EndingRoom/EndingRoom";
import GameEvent from "../../../components/tetris/GameEvent";
import ChangeName from "../../../components/room/changeName/ChangeName";


const toPrint = [
    <div key={ERoomStatus.NOT_STARTED}>waiting</div>,
    <Tetris key={ERoomStatus.IN_PROGRESS}>in game</Tetris>,
    <div key={ERoomStatus.PAUSED}>waiting</div>,
    <EndingRoom key={ERoomStatus.GAME_OVER}>end</EndingRoom>
]

export default function Room() {

    const { roomId } = useParams();
    const { socket } = useSocket();
    const [nameIsSet, setNameIsSet] = useState(false);
    const search = new URLSearchParams(useLocation().search);
    const dispatch = useDispatch();
    const tetris = useSelector(state => state.tetris);

    const joinRoom = useCallback((payload) => {
        dispatch(setRoomId(payload));
        dispatch(setGameState({ gameState: payload.status }));
        dispatch(addPlayerToRoom(payload));
    }, [dispatch]);

    const leftRoom = useCallback((payload) => {
        dispatch(removePlayer(payload));
        dispatch(updatePlayer({ playerId: payload.owner, toUpdate: { isOwner: true } }))
    }, [dispatch]);


    useEffect(() => {
        if (socket && search.get('name') && !nameIsSet) {
            socket.emit('change_pseudo', search.get('name'))
            setNameIsSet(true);
            return () => {
            }
        }
    }, [nameIsSet, search, socket]);

    useEffect(() => {
        if (socket && !tetris.roomId) {
            socket.emit('requestRoom', roomId)
            return () => {
            }
        }
    }, [roomId, socket, tetris]);

    useEffect(() => {
        if (socket) {
            socket.on('roomJoined', joinRoom);
            socket.on('roomLeft', leftRoom);

            return () => {
                socket.off('roomJoined');
                socket.off('roomLeft');
            }
        }
    }, [socket, joinRoom, leftRoom]);

    return (
        <>
            <Navbar routes={routes} />
            <RoomStatus />
            {roomId} {search.get('name')}
            <ChangeName />

            <div>{tetris.roomId}</div>
            <RoomPlayerList players={tetris.players}></RoomPlayerList>
            <StartRoomComponent></StartRoomComponent>
            {tetris.gameState}

            <GameEvent />

            {toPrint[tetris.gameState]}
        </>
    )

}