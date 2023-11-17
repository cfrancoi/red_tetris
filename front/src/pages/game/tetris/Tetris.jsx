import { useDispatch, useSelector } from "react-redux";
import TetrisTable from "../../../components/tetris/TetrisTable";
import { useSocket } from "../../../context/SocketContext";
import { useEffect } from "react";
import Navbar from "../../../components/layout/Navbar";
import { routes } from "../../../routes/route.constant";

import './styles.css'


export default function Tetris() {


    const tetris = useSelector(state => state.tetris);
    const dispatch = useDispatch();
    const { socket } = useSocket();

    // const useSocket


    useEffect(() => {
        if (socket) {
            socket.on('newPiece', (payload) => {
                dispatch({
                    type: 'tetris/newPiece', payload: {
                        playerId: payload.playerId,
                        tetromino: payload.tetromino,
                        position: payload.position
                    }
                })
            })

            socket.on('updatePiece', (payload) => {
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
        }
        socket.on('breakLine', (payload) => {
            console.log("payload = ", payload);
            dispatch({
                type: 'tetris/breakLine', payload
            })
            dispatch({
                type: 'tetris/downGrid', payload
            })
        })
        return () => {
            socket?.off('moveDown');
            socket?.off('moveRight');
            socket?.off('moveLeft');
            socket?.off('updatePiece');
            socket?.off('newPiece');
            socket?.off('breakLine');
        }

    }, [dispatch, socket, tetris]);


    return (
        <div className="tetris-list">
            {tetris.players.map(p => {
                if (p.id) {
                    return (
                        <TetrisTable key={p.id} height={20} width={10} playerId={p.id} isControlled={p.me} />
                    )
                }
            })}
        </div>
    )
}