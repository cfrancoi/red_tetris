import { useDispatch } from "react-redux";
import { useSocket } from "../../context/SocketContext";
import { useEffect } from "react";
import { blockPiece, breakLine, downGrid, freezeLine, newPiece, updatePiece, updateShadowBoard } from "../../slice/tetrisSlice";

export default function GameEvent() {
    const dispatch = useDispatch();
    const { socket } = useSocket();

    useEffect(() => {
        socket?.on('newPiece', (payload) => {
            dispatch(newPiece(payload))
        })

        socket?.on('updatePiece', (payload) => {
            dispatch(updatePiece(payload));
            if (payload.fixed) {
                dispatch(blockPiece({ playerId: (payload.playerId) ? payload.playerId : null }));
            }
        })

        socket?.on('freezeLine', (payload) => {
            dispatch(freezeLine(payload));
        })
        socket?.on('breakLine', (payload) => {
            dispatch(breakLine(payload));
            dispatch(downGrid(payload));
        })

        socket?.on('shadowBoard', (payload) => {
            dispatch(updateShadowBoard(payload));
        })
        return () => {
            socket?.off('updatePiece');
            socket?.off('newPiece');
            socket?.off('breakLine');
            socket?.off('freezeLine');
            socket?.off('shadowBoard');
        }

    }, [dispatch, socket]);


    return (<></>)
}
