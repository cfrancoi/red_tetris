import { createContext, useEffect, useState, useContext } from 'react'
import io from 'socket.io-client';


const WebSocketContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useSocket() {
    return useContext(WebSocketContext);
}


// eslint-disable-next-line react-refresh/only-export-components
export default function WebSocketProvider({ children }) {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const newSocket = io({ autoConnect: true, path: '/api/socket.io', token: "abcd" });

        setSocket(newSocket);

        return function cleanup() {
            newSocket.disconnect();
            newSocket.off();
        }
    }, []);

    useEffect(() => {
        if (socket)
            socket.on('connect', setIsConnected(true));

        return function cleanup() {
            if (socket)
                socket.off('connect');
        }
    }, [socket, setIsConnected]);


    return (
        <WebSocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </WebSocketContext.Provider>
    )
}