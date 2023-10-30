import { useSelector } from 'react-redux';
import './navbar.css'
import { Link } from 'react-router-dom';
import Logout from '../auth/Logout';
import { useSocket } from '../../context/SocketContext';
import RoomStatus from '../room/roomStatus/RoomStatus';


//TODO transalte
//TODO test
//TODO change <a href='link'> tag with react-router components
export default function Navbar({ routes }) {

    const { isConnected } = useSocket();
    const auth = useSelector(state => state.auth);



    return (
        <nav className="navigation">
            <Link to="/" className="brand-name">
                RedTetris {(!isConnected) ? 'false' : 'true'}
            </Link>
            <button className="hamburger">
                {/* icon from heroicons.com */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="white"
                >
                    <path
                        fillRule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
            <div style={{ margin: 'auto' }}>
                <RoomStatus />
            </div>
            <div
                className="navigation-menu">
                <ul>
                    {routes?.map((route, index) => {
                        if (auth.isLoggedIn === route.isLoggedIn)
                            return (
                                <li key={index}>
                                    <Link to={route.href}>{route.name}</Link>
                                </li>
                            )
                    })}
                    {(auth?.isLoggedIn) ? <li> <Logout /> </li> : <li>  <a href="login">login</a> </li>}
                </ul>
            </div>
        </nav>
    );
}