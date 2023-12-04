import customRender, { defaultWebSocketProviderProps } from './test-utils'
import Login from '../components/auth/Login'

const onLogin = () => {}

test('loads and displays Login', async () => {
    // ARRANGE
    const screen = customRender(<Login onLogin={onLogin}/>, {webSocketProviderProps: defaultWebSocketProviderProps})

    // ASSERT
    expect(screen.getByLabelText('Login'))
    expect(screen.getByLabelText('Password'))
})