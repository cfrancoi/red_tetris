import ErrorPage from '../pages/error/error.jsx';
import {createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom';
import App from '../App.jsx'
import LoginScreen from '../pages/login/Login.jsx';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />} >
        <Route path="/" element={<App />} />
        <Route path="login" element={<LoginScreen />}/>
    </Route>
));