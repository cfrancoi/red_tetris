import PropTypes from 'prop-types';
import './styles/Cell.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '../../context/SocketContext'


export default function TetrisTable({ height, width, playerId, isControlled = false }) {
  const [show, setShow] = useState(false);


  //TODO clean me
  const tetris = useSelector(state => (state.tetris.players.find(p => p.id === playerId)));
  const dispatch = useDispatch();

  const { socket } = useSocket();


  //TODO bind key
  function onKeyPressEvent(e) {
    console.log(e.key)

    if (e.key === 's')
      down()

  }

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
  }, []);


  useEffect(() => {
    if (socket) {
      socket.on('moveDown', () => {
        dispatch({
          type: 'tetris/moveDown', payload: {
            playerId: tetris.id
          }
        })
      })
    }

    return () => {
      socket?.off('moveDown');
    }

  }, [dispatch, socket, tetris]);


  useEffect(() => {
    console.log(tetris);
  }, [tetris]);

  function down() {
    dispatch({
      type: 'tetris/moveDown', payload: {
        playerId: playerId
      }
    })
  }

  function right() {
    dispatch({
      type: 'tetris/moveRight', payload: {
        playerId: playerId
      }
    })
  }

  function left() {
    dispatch({
      type: 'tetris/moveLeft', payload: {
        playerId: playerId
      }
    })
  }

  function rotate() {
    dispatch({
      type: 'tetris/rotatePiece', payload: {
        playerId: playerId
      }
    })
  }

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
      <button onClick={down}>down</button>
      <button onClick={left}>left</button>
      <button onClick={right}>right</button>
      <button onClick={rotate}>rotate</button>
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
        if (cell.type)
          console.log(cell.type);

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