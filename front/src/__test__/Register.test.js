import { prettyDOM, screen } from '@testing-library/react'
import Register from '../pages/login/Register'
import customRender, { defaultProps } from './test-utils'

test('loads and displays Register', async () => {
    // ARRANGE
    customRender(<Register />, defaultProps)

    console.log(prettyDOM())

    // ASSERT
    expect(screen.getByText('Login'))
    expect(screen.getByText('Email'))
    expect(screen.getByText('Password'))
    expect(screen.getByText('Register'))
})