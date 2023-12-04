import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import { store } from "../store";
import { WebSocketContext } from "../context/SocketContext";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "../slice/authSlice";
import tetrisSlice from "../slice/tetrisSlice";
// import { BrowserRouter } from "react-router-dom"



export const defaultWebSocketProviderProps = {
    value: {
        socket: null,
        isConnected: false
    }
}

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
    auth: authSlice.reducer,
    tetris: tetrisSlice.reducer
})

export const setupStore = preloadedState => {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    })
}


export default function customRender(ui, { webSocketProviderProps, preloadedState, ...renderOptions }) {
    return render(
        <Provider store={setupStore(preloadedState)}>
            <BrowserRouter>
                <WebSocketContext.Provider {...webSocketProviderProps}>
                    {ui}
                </WebSocketContext.Provider>
            </BrowserRouter>
        </Provider>,
        renderOptions,)
}
