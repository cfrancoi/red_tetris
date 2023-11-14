import { prettyDOM, render, screen } from '@testing-library/react'
import Register from '../pages/login/Register'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import WebSocketProvider from '../context/SocketContext'
import { store } from '../store'

test('loads and displays login', async () => {
    // ARRANGE
    render(
        <BrowserRouter>
            <Provider store={store}>
                <WebSocketProvider>
                    <Register />
                </ WebSocketProvider>
            </ Provider>
        </ BrowserRouter>)

    console.log(prettyDOM())

    // ASSERT
    expect(await screen.getByText('Login')).toBeVisible()
    expect(screen.getByText('Email')).toBeVisible()
    expect(screen.getByText('Password')).toBeVisible()

    expect(screen.getByText('Register')).toBeVisible()
    // expect(screen.getByTestId('login-button')).toHaveTextContent('Login')
})