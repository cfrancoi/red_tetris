import './style.css'
import PropTypes from 'prop-types';

function ChooseBox({ restartRoom, goHome }) {

    return (
        <div className='box'>
            <button onClick={restartRoom}> Restart Room </button>
            <button onClick={goHome}> Go Home </button>
        </div>
    )
}

ChooseBox.propTypes = {
    restartRoom: PropTypes.func,
    goHome: PropTypes.func
}

export default ChooseBox;