import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../context/SocketContext";

export default function ButtonLeaveRoom() {

    const tetris = useSelector(state => state.tetris);
    const dispatch = useDispatch();
    const { socket } = useSocket();

    const leaveRoom = useCallback(() => {
        socket.emit('leaveRoom', tetris.roomId);
        dispatch({ type: 'tetris/reset' });
    }, [dispatch, socket, tetris.roomId])

    return (
        <>
            {((tetris.gameState || tetris.gameState === 0) ? <button onClick={leaveRoom} style={{ background: 'red' }} >LEAVE</button > : <></>)
            }
        </>
    )
}