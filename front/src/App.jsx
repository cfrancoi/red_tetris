import React from 'react'
import './App.css'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { store } from './store'
import { router } from './routes/router'

function App() {

  return (
    <Provider store={store}>
      {/* <WebSocketProvider> */}
      <RouterProvider router={router} />
      {/* </WebSocketProvider> */}
    </Provider>
  )
}

export default App
