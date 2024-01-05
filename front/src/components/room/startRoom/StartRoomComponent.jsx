import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '../../../context/SocketContext';
import { useCallback, useEffect } from 'react';
import { ERoomStatus, cleanRoom, setGameResult, setGameState, setPlayerInGame } from '../../../slice/tetrisSlice';


export default function StartRoomComponent() {
    const me = useSelector(state => (state.tetris.players.find(p => p.me)));

    const { socket } = useSocket();
    const roomId = useSelector(state => state.tetris.roomId);
    const dispatch = useDispatch();

    const startGame = useCallback(() => {
        dispatch(setPlayerInGame({ inGame: true }));
        dispatch(setGameState({ gameState: ERoomStatus.IN_PROGRESS }))
    }, [dispatch])

    const restartRoom = useCallback((room) => {
        dispatch(setGameState({ gameState: room.status }));
    }, [dispatch])

    const gameOver = useCallback((room, result) => {
        dispatch(setGameState({ gameState: room.status }));
        dispatch(setGameResult({ result }));
        dispatch(cleanRoom());
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
            socket.on('roomGameOver', ({ room, result }) => {

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

    useEffect(() => { console.log(me) }, [me])

    return (

        <button onClick={onClick}>
            START GAME
            {`is Owner ${(me?.isOwner) ? 'owner' : 'not owner'}`}
        </button>
    )
}