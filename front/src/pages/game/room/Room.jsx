
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import RoomPlayerList from "../../../components/room/RoomPlayerList/RoomPlayerList";
import { useCallback, useEffect } from "react";
import { useSocket } from "../../../context/SocketContext";
import { ADD_PLAYER_TO_ROOM, CHANGE_GAME_STATE, SET_ROOM } from "../../../actions/tetris.types";
import StartRoomComponent from "../../../components/room/startRoom/StartRoomComponent";
import { ERoomStatus } from "../../../slice/tetrisSlice";
import Tetris from "../tetris/Tetris";
import Navbar from "../../../components/layout/Navbar";
import { routes } from "../../../routes/route.constant";
import RoomStatus from "../../../components/room/roomStatus/RoomStatus";
import EndingRoom from "../../../components/room/EndingRoom/EndingRoom";
import GameEvent from "../../../components/tetris/GameEvent";


const toPrint = [
    <div key={ERoomStatus.NOT_STARTED}>waiting</div>,
    <Tetris key={ERoomStatus.IN_PROGRESS}>in game</Tetris>,
    <div key={ERoomStatus.PAUSED}>waiting</div>,
    <EndingRoom key={ERoomStatus.GAME_OVER}>end</EndingRoom>
]

export default function Room() {

    const { roomId } = useParams();
    const { socket } = useSocket();
    const search = new URLSearchParams(useLocation().search);
    const dispatch = useDispatch();
    const tetris = useSelector(state => state.tetris);

    const joinRoom = useCallback((payload) => {
        dispatch({ type: SET_ROOM, id: payload.id });
        dispatch({ type: CHANGE_GAME_STATE, gameState: payload.status });
        dispatch({ type: ADD_PLAYER_TO_ROOM, players: payload.players });
    }, [dispatch]);

    const leftRoom = useCallback((payload) => {
        dispatch({ type: 'tetris/removePlayer', id: payload.playerId });
    }, [dispatch]);

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

            <div>{tetris.roomId}</div>
            <RoomPlayerList players={tetris.players}></RoomPlayerList>
            <StartRoomComponent></StartRoomComponent>
            {tetris.gameState}

            <GameEvent />

            {toPrint[tetris.gameState]}
        </>
    )

}