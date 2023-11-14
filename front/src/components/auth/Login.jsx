import { useForm } from 'react-hook-form'
import { useCallback } from 'react';
import PropTypes from 'prop-types';

const Login = ({ onLogin }) => {
    const { register, handleSubmit } = useForm()

    const submitForm = useCallback((data) => {
        onLogin(data.login, data.password);
    }, [onLogin]);

    return (
        <div>
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
        </div>
    )
}

Login.propTypes = {
    onLogin: PropTypes.func.isRequired,
}

export default Login;