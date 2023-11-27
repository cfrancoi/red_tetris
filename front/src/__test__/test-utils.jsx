import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import { store } from "../store";
import { WebSocketContext } from "../context/SocketContext";
// import { BrowserRouter } from "react-router-dom"



export const defaultProps = {
    value: {
        socket: null,
        isConnected: false
    }
}


export default function customRender(ui, {providerProps, ...renderOptions}) {
    return render(
        <Provider store={store}>
            <BrowserRouter>
                <WebSocketContext.Provider {...providerProps}>
                    {ui}
                </WebSocketContext.Provider>
            </BrowserRouter>
        </Provider>,
      renderOptions,)
  }
