import PropTypes from 'prop-types';
import './styles/Cell.css'
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '../../context/SocketContext'

const EMOVE = {
  DOWN: 'moveDown',
  RIGHT: 'moveRight',
  LEFT: 'moveLeft',
  ROTATE: 'rotatePiece'
}

export default function TetrisTable({ height, width, playerId, isControlled = false }) {
  const [show, setShow] = useState(false);


  //TODO clean me
  const tetris = useSelector(state => (state.tetris.players.find(p => p.id === playerId)));
  const roomId = useSelector(state => (state.tetris.roomId));

  const dispatch = useDispatch();

  const { socket } = useSocket();

  const move = useCallback((moveDirection) => {
    socket.emit(moveDirection, roomId);
  }, [socket, roomId]);

  const onKeyPressEvent = useCallback((e) => {
    if (e.sss === 's')
      move(EMOVE.DOWN);
  }, [move]);

  useEffect(() => {
    if (isControlled) {
      console.log(' add event')

      window.addEventListener('keypress', onKeyPressEvent);
    }
    return () => {
      if (isControlled) {
        window.removeEventListener('keypress', onKeyPressEvent);
      }
    }
  }, [isControlled, onKeyPressEvent]);

  useEffect(() => {
    console.log(tetris);
  }, [tetris]);


  function blockPiece() {
    dispatch({
      type: 'tetris/blockPiece', payload: {
        playerId: playerId
      }
    })
  }

  function newPiece() {
    dispatch({
      type: 'tetris/newPiece', payload: {
        playerId: playerId
      }
    })
  }

  return (
    <div onMouseOver={() => { setShow(true) }}
      onMouseLeave={() => { setShow(false) }}

      className={show ? 'show' : ''}>
      {show ? "true" : "flase"}
      <button onClick={() => { move(EMOVE.DOWN) }}>down</button>
      <button onClick={() => { move(EMOVE.LEFT) }}>left</button>
      <button onClick={() => { move(EMOVE.RIGHT) }}>right</button>
      <button onClick={() => { move(EMOVE.ROTATE) }}>rotate</button>
      <button onClick={blockPiece}>block</button>
      <button onClick={newPiece}>new</button>
      {tetris?.grid.map((line, index) => {
        return (
          <div key={index}>
            {/* {index} */}
            <Cell cells={line}></Cell>
          </div>
        );
      })}

      {`score: ${tetris.score} playerId: ${playerId}`}
    </div>
  );
}


function Cell({ cells }) {
  return (
    <div className='line'>
      {cells.map((cell, index) => {
        return (
          <div className={`defaultCell ${(cell.type != 'default') ? cell.type + 'Cell' : ''}`} key={index}>
            {/* {cell.color} */}
          </div>
        )
      })}
    </div>

  );
}

TetrisTable.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
}