import { createContext } from 'react'
import io from 'socket.io-client';
// import { WS_BASE } from './config';
// import { useDispatch } from 'react-redux';

const WebSocketContext = createContext(null);

export { WebSocketContext }

// eslint-disable-next-line react-refresh/only-export-components
export default function WebSocketProvider({ children }) {
    let socket;
    let ws;

    // const dispatch = useDispatch();

    // const sendMessage = (roomId, message) => {
    //     const payload = {
    //         roomId: roomId,
    //         data: message
    //     }
    //     socket.emit("event://send-message", JSON.stringify(payload));
    //     dispatch(updateChatLog(payload));
    // }

    if (!socket) {
        socket = io('locahost', { autoConnect: false, token: "abcd"})

        socket.connect();

        socket.on("event://get-message", (msg) => {
            const payload = JSON.parse(msg);
            // dispatch(updateChatLog(payload));
        })

        socket.on("connect_error", (err) => {
            if (err.message === "invalid credentials") {
              socket.auth.token = "efgh";
              socket.connect();
            }
          });

        ws = {
            socket: socket,
        }
    }

    return (
        <WebSocketContext.Provider value={ws}>
            {children}
        </WebSocketContext.Provider>
    )
}