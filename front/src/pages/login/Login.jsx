import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { login } from '../../actions/auth';
import { routes } from '../../routes/route.constant';
import Navbar from '../../components/layout/Navbar';
import Register from './Register';

//TODO transform to Login modal using mateiral UI
//TODO move to component
//TODO redirect
const LoginScreen = () => {
    const { register, handleSubmit } = useForm()

    const dispatch = useDispatch();

    const submitForm = (data) => {
        console.log(data.login)

        dispatch(login(data.login, data.password))
    }

    return (
        <>
            <Navbar routes={routes} />
            <form onSubmit={handleSubmit(submitForm)}>
                <div className='form-group'>
                    <label htmlFor='text'>Login</label>
                    <input
                        type='text'
                        className='form-input'
                        {...register('login')}
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
                <button
                    type='submit'
                    className='button'
                    data-testid="login-button"
                >
                    Login
                </button>

            </form>


            {/* <Register></Register> */}
        </>

    )
}
export default LoginScreen