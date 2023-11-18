import { createContext, useEffect, useState, useContext } from 'react'
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';


const WebSocketContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useSocket() {
    return useContext(WebSocketContext);
}


// eslint-disable-next-line react-refresh/only-export-components
export default function WebSocketProvider() {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        const newSocket = io({ transports: ['websocket'], autoConnect: true, path: '/api/socket.io', token: "abcd" });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
            newSocket.off();
        }
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on('connect', setIsConnected(true));

            socket.on('disconnect', () => {
                setIsConnected(false)

                dispatch({ type: 'tetris/reset' });
                navigate('/');

            });
        }


        return function cleanup() {
            if (socket)
                socket.off('connect');
        }
    }, [socket, setIsConnected]);

    return (
        <WebSocketContext.Provider value={{ socket, isConnected }}>
            <Outlet />
        </WebSocketContext.Provider>
    )
}