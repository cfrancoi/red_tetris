
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import RoomPlayerList from "../../../components/room/RoomPlayerList/RoomPlayerList";
import { useCallback, useEffect } from "react";
import { useSocket } from "../../../context/SocketContext";
import { ADD_PLAYER_TO_ROOM } from "../../../actions/tetris.types";


export default function Room() {

    let { roomId } = useParams();
    const { socket } = useSocket();
    const dispatch = useDispatch();
    const tetris = useSelector(state => state.tetris);

    const joinRoom = useCallback((payload) => {
        console.log('joining');
        dispatch({ type: ADD_PLAYER_TO_ROOM, players: payload.players });
    }, [dispatch]);

    useEffect(() => {
        if (socket) {
            socket.on('roomJoined', joinRoom);

            return () => {
                socket.off('roomJoined');
            }
        }
    }, [socket, joinRoom]);

    return (
        <>
            {roomId}

            <div>{tetris.roomId}</div>
            <RoomPlayerList players={tetris.players}></RoomPlayerList>

        </>
    )

}