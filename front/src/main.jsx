import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './routes/router'
import { Provider } from 'react-redux';
import { store } from './store';
import punycode from 'punycode';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <WebSocketProvider> */}
      <RouterProvider router={router} />
      {/* </WebSocketProvider> */}
    </Provider>
  </React.StrictMode>,
)
