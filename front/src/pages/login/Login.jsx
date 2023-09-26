import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { LOGIN_SUCCESS } from '../../actions/auth.types';
import { login } from '../../actions/auth';
import { routes } from '../../routes/route.constant';
import Navbar from '../../components/layout/Navbar';

//TODO transform to Login modal using mateiral UI
const LoginScreen = () => {
    const { register, handleSubmit } = useForm()
    const auth = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const submitForm = (data) => {
        console.log(data.email)
    }

    const onClick = () => {
        console.log(auth)
        // dispatch(login("username", "password"))
        dispatch({
            type: LOGIN_SUCCESS
        })
    }

    return (
        <>
         <Navbar routes={routes} />
        <form onSubmit={handleSubmit(submitForm)}>
            <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
                type='email'
                className='form-input'
                {...register('email')}
                required
            />
            </div>
            <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
                type='password'
                className='form-input'
                {...register('password')}
                required
            />
            </div>
            <button type='submit' className='button'>
                Login
            </button>
            
            <button onClick={onClick}>ok:{(auth?.isLoggedIn) ? "y" : "n"}:</button>
            <div>
                {(auth?.isLoggedIn) ? "y" : "n"}
            </div>
        </form>
        </>
    
    )
}
export default LoginScreen