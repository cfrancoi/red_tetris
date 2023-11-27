import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '../../../context/SocketContext';
import { useCallback, useEffect } from 'react';
import { CHANGE_GAME_STATE, SET_GAME_RESULT } from '../../../actions/tetris.types';
import { ERoomStatus } from '../../../slice/tetrisSlice';


export default function StartRoomComponent() {

    const { socket } = useSocket();
    const roomId = useSelector(state => state.tetris.roomId);
    const dispatch = useDispatch();

    const startGame = useCallback(() => {
        dispatch({ type: CHANGE_GAME_STATE, gameState: ERoomStatus.IN_PROGRESS })
    }, [dispatch])


    const restartRoom = useCallback((room) => {
        dispatch({ type: CHANGE_GAME_STATE, gameState: room.status })
    }, [dispatch])

    const gameOver = useCallback((room, result) => {
        dispatch({ type: CHANGE_GAME_STATE, gameState: room.status })
        dispatch({ type: SET_GAME_RESULT, result: result })
    }, [dispatch])

    useEffect(() => {
        if (socket) {
            socket.on('roomStarted', () => {
                startGame();
            })

            socket.on('roomRestarted', (room) => {
                restartRoom(room);
            })
            
        }

        return () => {
            socket?.off('roomStarted');
            socket?.off('roomRestarted');
        }
    }, [socket, startGame])

    useEffect(() => {
        if (socket) {
            socket.on('roomGameOver', ({room, result}) => {

                console.log(room, result);
                gameOver(room, result);
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