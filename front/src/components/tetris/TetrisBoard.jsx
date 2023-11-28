import PropTypes from 'prop-types';
import './styles/Cell.css'
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSocket } from '../../context/SocketContext'
import Line from './Line';

const EMOVE = {
  DOWN: 'moveDown',
  RIGHT: 'moveRight',
  LEFT: 'moveLeft',
  ROTATE: 'rotatePiece',
  DROP: 'drop'
}

export default function TetrisBoard({ playerId, isControlled }) {
  const [show, setShow] = useState(false);
  const tetris = useSelector(state => (state.tetris.players.find(p => p.id === playerId)));
  const roomId = useSelector(state => (state.tetris.roomId));
  const { socket } = useSocket();

  const move = useCallback((moveDirection) => {
    socket.emit(moveDirection, roomId);
  }, [socket, roomId]);

  const onKeyPressEvent = useCallback((e) => {
    if (e.key === 's')
      move(EMOVE.DOWN);
    if (e.key === 'd')
      move(EMOVE.RIGHT);
    if (e.key === 'a')
      move(EMOVE.LEFT);
    if (e.key === ' ')
      move(EMOVE.ROTATE);
  }, [move]);

  useEffect(() => {
    if (isControlled) {
      console.log(' add event')

      window.addEventListener('keypress', onKeyPressEvent);
    }
    return () => {
      if (isControlled) {
        console.log('remove event');
        window.removeEventListener('keypress', onKeyPressEvent);
      }
    }
  }, [isControlled, onKeyPressEvent]);

  return (
    <div onMouseOver={() => { setShow(true) }}
      onMouseLeave={() => { setShow(false) }}

      className={show ? 'show' : ''}>
      {show ? "true" : "flase"}
      <button onClick={() => { move(EMOVE.DOWN) }}>down</button>
      <button onClick={() => { move(EMOVE.LEFT) }}>left</button>
      <button onClick={() => { move(EMOVE.RIGHT) }}>right</button>
      <button onClick={() => { move(EMOVE.ROTATE) }}>rotate</button>
      <button onClick={() => { move(EMOVE.DROP) }}>drop</button>
      {tetris?.grid.map((line, index) => {
        return (
          <div key={index}>
            <Line line={line} isOpponent={!isControlled}></Line>
          </div>
        );
      })}

      {`score: ${tetris?.score} playerId: ${playerId} isOpponent:${!isControlled}`}
    </div>
  );
}

TetrisBoard.propTypes = {
  playerId: PropTypes.string.isRequired,
  isControlled: PropTypes.bool.isRequired
}