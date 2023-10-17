import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import LoginScreen from '../pages/login/Login'
import { Provider } from 'react-redux'
import { store } from '../store'
import WebSocketProvider from '../context/SocketContext'
import Navbar from '../components/layout/Navbar'
import { routes } from '../routes/route.constant'
import { BrowserRouter } from 'react-router-dom'

test('loads and displays Nav', async () => {
    // ARRANGE
    render(
        <BrowserRouter>
            <Provider store={store}>
                <WebSocketProvider>
                    <Navbar routes={routes} />
                </ WebSocketProvider>
            </ Provider>
        </BrowserRouter>)

    // ACT
    await screen.findByRole('button')

    // ASSERT
    expect(screen.getByRole('button')).toBeVisible()
    // expect(screen.getByRole('button')).toHaveTextContent('Login')
})


test('loads and displays Navbar with null route', async () => {
    // ARRANGE
    render(
        <BrowserRouter>
            <Provider store={store}>
                <WebSocketProvider>
                    <Navbar routes={null} />
                </ WebSocketProvider>
            </ Provider>
        </BrowserRouter>)

    // ACT
    // await screen.findByRole('button')

    // ASSERT
    // expect(screen.toBeTruthy());
    // expect(screen.getByRole('button')).toHaveTextContent('Login')
})