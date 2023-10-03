import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { register as signup } from '../../actions/auth';

//TODO transform to Login modal using mateiral UI
//TODO move to component
const Register = () => {
    const { register, handleSubmit } = useForm()

    const dispatch = useDispatch();

    const submitForm = (data) => {
        console.log(data.email)

         dispatch(signup(data.login,data.email, data.password))
    }

    return (
        <>
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
                Register
            </button>
            
        </form>
        </>
    
    )
}
export default Register