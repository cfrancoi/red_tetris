import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../context/SocketContext";
import { useNavigate } from "react-router-dom";
import { reset } from "../../slice/tetrisSlice";

export default function ButtonLeaveRoom() {
    const tetris = useSelector(state => state.tetris);
    const dispatch = useDispatch();
    const { socket } = useSocket();
    const navigate = useNavigate();

    const leaveRoom = useCallback(() => {
        socket.emit('leaveRoom', tetris.roomId);
        dispatch(reset());
        navigate('/');
    }, [dispatch, socket, tetris.roomId, navigate])

    return (
        <>
            {((tetris.roomId || tetris.gameState || tetris.gameState === 0) ? <button onClick={leaveRoom} style={{ background: 'red' }} >LEAVE</button > : <></>)
            }
        </>
    )
}