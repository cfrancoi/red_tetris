import PropTypes from 'prop-types';
import './styles/Cell.css'
import Line from './Line';
import { useState } from 'react';

export default function FakeTetrisBoard({ playerId, isControlled, height, width }) {
    const [show, setShow] = useState(false);
    const [grid, setGrid] = useState(Array.from(Array(height), () => new Array(width).fill({})));



    return (
        <div onMouseOver={() => { setShow(true) }}
            onMouseLeave={() => { setShow(false) }}

            className={show ? 'show' : ''}>
            {show ? "true" : "flase"}

            {grid.map((line, index) => {
                return (
                    <div key={index}>
                        <Line line={line} isOpponent={!isControlled}></Line>
                    </div>
                );
            })}

            {`score: ${0} playerId: ${playerId} isOpponent:${!isControlled}`}
        </div>
    );
}

FakeTetrisBoard.propTypes = {
    playerId: PropTypes.string.isRequired,
    isControlled: PropTypes.bool.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
}