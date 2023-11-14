import { useDispatch } from 'react-redux'
import { logout } from '../../actions/auth';
import { useCallback } from 'react';

const Logout = () => {
    const dispatch = useDispatch();

    const onClick = useCallback(() => {
        dispatch(logout())
    }, [dispatch])

    return (
        <>
            <button onClick={onClick}>Logout</button>
        </>

    )
}
export default Logout