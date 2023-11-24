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

    const gameOver = useCallback((room) => {
        console.log(room)
        dispatch({ type: CHANGE_GAME_STATE, gameState: room.status })
    }, [dispatch])

    useEffect(() => {
        if (socket) {
            socket.on('roomStarted', () => {
                startGame();
            })
        }

        return () => {
            socket?.off('roomStarted');
        }
    }, [socket, startGame])

    useEffect(() => {
        if (socket) {
            socket.on('roomGameOver', (room) => {
                gameOver(room);
            })
        }

        return () => {
            socket?.off('roomGameOver');
        }
    }, [socket, gameOver])

    function onClick() {
        console.log('click for start room')
        socket.emit('startRoom', roomId);
    }

    return (
        <button onClick={onClick}> START GAME </button>
    )

}