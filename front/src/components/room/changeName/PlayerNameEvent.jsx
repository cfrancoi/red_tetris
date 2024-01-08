import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../../context/SocketContext";
import { useCallback, useEffect } from "react";
import { setPlayerName } from "../../../slice/tetrisSlice";
import { useSearchParams } from "react-router-dom";

const PlayerNameEvent = () => {
    const { socket } = useSocket();
    const dispatch = useDispatch();
    // const search = new URLSearchParams(useLocation().search);
    const [searchParams, setSearchParams] = useSearchParams();
    const me = useSelector(state => (state.tetris.players.find(p => p.me)));



    const changeName = useCallback((payload) => {
        console.log('[change_pseudo]');
        console.log(payload);

        dispatch(setPlayerName(payload));
        // search.set('player_name', payload.name);



        if (me.id === payload.playerId) {
            setSearchParams(params => {
                params.set('player_name', payload.name);
                return params;
            });
        }
    }, [dispatch, me, setSearchParams]);

    useEffect(() => {
        if (socket) {
            socket.on('change_pseudo', changeName);

            return () => {
                socket.off('change_pseudo');
            }
        }
    }, [socket, changeName]);

    return (
        <>
        </>
    )
}
export default PlayerNameEvent;