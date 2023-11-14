import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import LoginScreen from '../pages/login/Login'
import { Provider } from 'react-redux'
import { store } from '../store'
import WebSocketProvider from '../context/SocketContext'
import { BrowserRouter } from 'react-router-dom'

test('loads and displays login', async () => {
  // ARRANGE
  render(
    <BrowserRouter>
      <Provider store={store}>
        <WebSocketProvider>
          <LoginScreen />
        </ WebSocketProvider>
      </ Provider>
    </ BrowserRouter>)

  // ASSERT
  // expect(screen.getByTestId('login-button')).toBeVisible()
  // expect(screen.getByTestId('login-button')).toHaveTextContent('Login')
})