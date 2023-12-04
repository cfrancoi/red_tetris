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
                    <label htmlFor='Login'>Login
                        <input
                            type='text'
                            className='form-input'
                            {...register('login') }
                            aria-label='Login'
                            required
                        />
                    </label>
                </div>
                <div className='form-group'>
                    <label htmlFor='Password'>Password</label>
                    <input
                        type='password'
                        className='form-input'
                        {...register('password')}
                        aria-label='Password'
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