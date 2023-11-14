import { useDispatch } from 'react-redux'
import { login, register as signup } from '../../actions/auth';
import { routes } from '../../routes/route.constant';
import Navbar from '../../components/layout/Navbar';
import { useCallback } from 'react';
import Login from '../../components/auth/Login';
import Register from '../../components/auth/Register';

const LoginScreen = () => {
    const dispatch = useDispatch();

    const submitForm = useCallback((username, password) => {
        console.log(`${username} ${password}`);
        dispatch(login(login, password));
    }, [dispatch]);

    const onSignUp = useCallback((username, email, password) => {
        console.log(`${username} ${email} ${password}`);

        dispatch(signup(username, email, password))
    }, [dispatch]);

    return (
        <>
            <Navbar routes={routes} />
            <Login onLogin={submitForm} />
            <Register onSignUp={onSignUp} />
        </>
    )
}
export default LoginScreen