import { screen } from "@testing-library/react"
import Home from "../../pages/home/Home";
import customRender, { defaultProps } from "../test-utils";


test('full Home page rendering/navigating', async () => {
    customRender(<Home />, {providerProps: defaultProps});
    
    screen.debug();
  })