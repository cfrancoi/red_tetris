import { useDispatch, useSelector } from "react-redux";
import TetrisTable from "../../../components/tetris/TetrisTable";
import { useSocket } from "../../../context/SocketContext";
import { useEffect } from "react";


export default function Tetris() {


    const tetris = useSelector(state => state.tetris);
    const dispatch = useDispatch();
    const { socket } = useSocket();

    // const useSocket


    useEffect(() => {
        if (socket) {
            socket.on('moveDown', (payload) => {
                dispatch({
                    type: 'tetris/moveDown', payload: {
                        playerId: (payload.id) ? payload.id : null
                    }
                })

                if (payload.fixed) {
                    dispatch({
                        type: 'tetris/blockPiece', payload: {
                            playerId: (payload.id) ? payload.id : null
                        }
                    })
                }
            })

            socket.on('newPiece', (payload) => {
                console.log(payload)
                dispatch({
                    type: 'tetris/newPiece', payload: {
                        playerId: payload.playerId,
                        tetromino: payload.tetromino,
                        position: payload.position
                    }
                })
            })


            socket.on('moveLeft', (payload) => {
                dispatch({
                    type: 'tetris/moveLeft', payload: {
                        playerId: (payload.id) ? payload.id : null
                    }
                })

                if (payload.fixed) {
                    dispatch({
                        type: 'tetris/blockPiece', payload: {
                            playerId: (payload.id) ? payload.id : null
                        }
                    })
                }
            })

            socket.on('moveRight', (payload) => {
                dispatch({
                    type: 'tetris/moveRight', payload: {
                        playerId: (payload.id) ? payload.id : null
                    }
                })

                if (payload.fixed) {
                    dispatch({
                        type: 'tetris/blockPiece', payload: {
                            playerId: (payload.id) ? payload.id : null
                        }
                    })
                }
            })

            socket.on('updatePiece', (payload) => {

                console.log(payload);
                dispatch({
                    type: 'tetris/updatePiece', payload: payload
                })

                if (payload.fixed) {
                    dispatch({
                        type: 'tetris/blockPiece', payload: {
                            playerId: (payload.id) ? payload.id : null
                        }
                    })
                }
            })
        }

        return () => {
            socket?.off('moveDown');
            socket?.off('moveRight');
            socket?.off('moveLeft');
            socket?.off('updatePiece');
            socket?.off('newPiece');
        }

    }, [dispatch, socket, tetris]);


    return (
        <>
            {tetris.players.map(p => {
                if (p.id) {
                    return (
                        <TetrisTable key={p.id} height={20} width={10} playerId={p.id} />
                    )
                }
            })}
            {/* <TetrisTable height={20} width={10} playerId={0} isControlled={true} />
            <TetrisTable height={20} width={10} playerId={1} /> */}
        </>
    )
}