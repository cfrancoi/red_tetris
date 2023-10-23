import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '../../../context/SocketContext';
import { useCallback, useEffect } from 'react';
import { CHANGE_GAME_STATE } from '../../../actions/tetris.types';
import { ERoomStatus } from '../../../slice/tetrisSlice';


export default function StartRoomComponent() {

    const { socket } = useSocket();
    const roomId = useSelector(state => state.tetris.roomId);
    const dispatch = useDispatch();


    const startGame = useCallback(() => {
        dispatch({ type: CHANGE_GAME_STATE, gameState: ERoomStatus.IN_PROGRESS })
    }, [dispatch])

    useEffect(() => {
        socket.on('roomStarted', () => {
            startGame();
        })

        return () => {
            socket.off('roomStarted');
        }
    }, [socket, startGame])

    function onClick() {
        console.log('click for start room')
        socket.emit('startRoom', roomId);
    }

    return (
        <button onClick={onClick}> START GAME </button>
    )

}