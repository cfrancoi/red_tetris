import PropTypes from 'prop-types';
import './styles/Cell.css'
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSocket } from '../../context/SocketContext'
import Line from './Line';
import { EKEYCODE } from '../../utils/EKEYCODE';

const EMOVE = {
  DOWN: 'moveDown',
  RIGHT: 'moveRight',
  LEFT: 'moveLeft',
  ROTATE: 'rotatePiece',
  DROP: 'drop'
}

export default function TetrisBoard({ playerId, isControlled }) {
  const player = useSelector(state => (state.tetris.players.find(p => p.id === playerId)));
  const roomId = useSelector(state => (state.tetris.roomId));
  const { socket } = useSocket();

  const move = useCallback((moveDirection) => {
    socket.emit(moveDirection, roomId);
  }, [socket, roomId]);

  const onKeyDownEvent = useCallback((e) => {
    if (e.keyCode === EKEYCODE.UP_ARROW) {
      move(EMOVE.ROTATE);
    }
    if (e.keyCode === EKEYCODE.DOWN_ARROW) {
      move(EMOVE.DOWN);
    }
    if (e.keyCode === EKEYCODE.RIGHT_ARROW) {
      move(EMOVE.RIGHT);
    }
    if (e.keyCode === EKEYCODE.LEFT_ARROW) {
      move(EMOVE.LEFT);
    }
    if (e.keyCode === EKEYCODE.SPACE) {
      move(EMOVE.DROP)
    }

  }, [move]);

  useEffect(() => {
    if (isControlled) {
      console.log(' add event')

      window.addEventListener('keydown', onKeyDownEvent);
    }
    return () => {
      if (isControlled) {
        console.log('remove event');
        window.addEventListener('keydown', onKeyDownEvent);

      }
    }
  }, [isControlled, onKeyDownEvent]);

  return (
    <div>
      {player?.grid.map((line, index) => {
        return (
          <div key={index}>
            <Line line={line} isOpponent={!isControlled}></Line>
          </div>
        );
      })}

      {`score: ${player?.score} playerId: ${playerId} isOpponent:${!isControlled}`}
    </div>
  );
}

TetrisBoard.propTypes = {
  playerId: PropTypes.string.isRequired,
  isControlled: PropTypes.bool.isRequired
}