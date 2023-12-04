import { render, screen } from "@testing-library/react"
import App from "../App"
// import { BrowserRouter } from "react-router-dom"


test('full app rendering/navigating', async () => {
    render(<App />);
    
  })