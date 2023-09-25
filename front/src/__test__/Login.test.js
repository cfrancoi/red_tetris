import {render, screen} from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import LoginScreen from '../pages/login/Login'


test('loads and displays login', async () => {
  // ARRANGE
  render(<LoginScreen/>)

  // ACT
  await screen.findByRole('button')

  // ASSERT
  expect(screen.getByRole('button')).toBeVisible()
  expect(screen.getByRole('button')).toHaveTextContent('Login')
})