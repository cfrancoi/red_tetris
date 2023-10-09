import ErrorPage from '../pages/error/error.jsx';
import {createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom';
import LoginScreen from '../pages/login/Login.jsx';
import Home from '../pages/home/Home.jsx';
import Tetris from '../pages/game/tetris/Tetris.jsx';
import Room from '../pages/game/room/Room.jsx';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />} >
        <Route path="/" element={<Home />} />
        <Route path="login" element={<LoginScreen />}/>
        <Route path="/game/tetris" element={<Tetris />}/>
        <Route path="/room/:roomId" element={<Room />}/>
    </Route>
));