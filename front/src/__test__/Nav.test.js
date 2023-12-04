import '@testing-library/jest-dom'
import Navbar from '../components/layout/Navbar'
import { offlineRoutes, onlineRoutes, routes } from '../routes/route.constant'
import customRender, { defaultWebSocketProviderProps as defaultProps } from './test-utils'


const LINKNUMBER = 2;

test('loads and displays Nav connected', async () => {
    // ARRANGE
    const screen = customRender(<Navbar routes={routes} />, { webSocketProviderProps: defaultProps })

    const links = screen.getAllByRole('link');

    // HOME link less loggin link
    expect(links.length).toBe(LINKNUMBER - 1 + onlineRoutes.length);
})

test('loads and displays Nav disconnected', async () => {
    // ARRANGE

    const screen = customRender(<Navbar routes={routes} />, { webSocketProviderProps: defaultProps, preloadedState: { auth: { isLoggedIn: true } } })

    const links = screen.getAllByRole('link');

    expect(links.length).toBe(LINKNUMBER + offlineRoutes.length);

})


test('loads and displays Navbar with null route', async () => {
    // ARRANGE
    const screen = customRender(<Navbar routes={null} />, { webSocketProviderProps: defaultProps })

    const links = screen.getAllByRole('link');

    expect(links.length).toBe(LINKNUMBER);

})