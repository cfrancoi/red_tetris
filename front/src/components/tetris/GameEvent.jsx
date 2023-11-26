import { useDispatch } from "react-redux";
import { useSocket } from "../../context/SocketContext";
import { useEffect } from "react";

export default function GameEvent() {
    const dispatch = useDispatch();
    const { socket } = useSocket();

    useEffect(() => {
        socket?.on('newPiece', (payload) => {
            console.log(payload);
            dispatch({
                type: 'tetris/newPiece', payload: {
                    playerId: payload.playerId,
                    tetromino: payload.tetromino,
                    position: payload.position,
                    nextPiece: payload.nextPiece
                }
            })
        })

        socket?.on('updatePiece', (payload) => {
            dispatch({
                type: 'tetris/updatePiece', payload: payload
            })

            if (payload.fixed) {
                dispatch({
                    type: 'tetris/blockPiece', payload: {
                        playerId: (payload.playerId) ? payload.playerId : null
                    }
                })
            }
        })

        socket?.on('freezeLine', (payload) => {
            console.log("payload = ", payload);
            dispatch({
                type: 'tetris/freezeLine', payload
            })

        })
        socket?.on('breakLine', (payload) => {
            console.log("payload = ", payload);
            dispatch({
                type: 'tetris/breakLine', payload
            })
            dispatch({
                type: 'tetris/downGrid', payload
            })
        })

        socket?.on('shadowBoard', (payload) => {
            console.log("payload = ", payload);

            dispatch({
                type: 'tetris/printShadowBoard', payload
            })
        })
        return () => {
            socket?.off('moveDown');
            socket?.off('moveRight');
            socket?.off('moveLeft');
            socket?.off('updatePiece');
            socket?.off('newPiece');
            socket?.off('breakLine');
            socket?.off('freezeLine');
            socket?.off('shadowBoard');
        }

    }, [dispatch, socket]);


    return (<></>)
}
