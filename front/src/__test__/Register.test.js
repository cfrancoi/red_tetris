import { prettyDOM, screen } from '@testing-library/react'
import Register from '../pages/login/Register'
import customRender, { defaultWebSocketProviderProps } from './test-utils'

test('loads and displays Register', async () => {
    // ARRANGE
    customRender(<Register />, {webSocketProviderProps: defaultWebSocketProviderProps})
    // ASSERT
    expect(screen.getByText('Login'))
    expect(screen.getByText('Email'))
    expect(screen.getByText('Password'))
    expect(screen.getByText('Register'))
})