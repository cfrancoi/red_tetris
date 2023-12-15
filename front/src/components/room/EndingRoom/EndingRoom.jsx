import { useDispatch, useSelector } from 'react-redux';
import ChooseBox from './ChooseBox';
import './style.css'
import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSocket } from '../../../context/SocketContext';
import GameResults from './GameResults';
import { reset, resetGrid } from '../../../slice/tetrisSlice';

function EndingRoom() {
    const tetris = useSelector(state => state.tetris);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { socket } = useSocket();
    const { roomId } = useParams();

    const resetRoom = useCallback(() => {
        dispatch(reset());
    }, [dispatch]);

    const goHome = useCallback(() => {
        resetRoom()
        navigate('/');
    }, [resetRoom, navigate]);

    const restartRoom = useCallback(() => {
        dispatch(resetGrid());
        socket.emit('restartRoom', roomId);
    }, [socket, roomId, dispatch]);

    return (
        <div className='box'>
            <GameResults result={tetris.result} />
            <ChooseBox restartRoom={restartRoom} goHome={goHome} />
        </div >
    )
}

export default EndingRoom;