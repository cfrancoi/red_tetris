import { useDispatch } from 'react-redux'
import { logout } from '../../actions/auth';

const Logout = () => {
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(logout())
    }

    return (
        <>
            <button onClick={onClick}>Logout</button>
        </>

    )
}
export default Logout