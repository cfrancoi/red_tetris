import { useForm } from 'react-hook-form'
import { useCallback } from 'react';
import PropTypes from 'prop-types';


const Register = ({ onSignUp }) => {
    const { register, handleSubmit } = useForm()

    const submitForm = useCallback((data) => {
        onSignUp(data.login, data.email, data.password);
    }, [onSignUp]);

    return (
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
    )
}

Register.propTypes = {
    onSignUp: PropTypes.func.isRequired,
}

export default Register