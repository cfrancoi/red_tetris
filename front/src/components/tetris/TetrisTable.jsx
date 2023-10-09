import PropTypes from 'prop-types';
import './styles/Cell.css'
import { useEffect, useState } from 'react';
// import { I_TETROMINO } from './tetrominos-constant.js';
// import { useInterval } from '../../hooks/useInterval';
import { useDispatch, useSelector } from 'react-redux';




export default function TetrisTable({height, width, playerId, isControlled = false}) {
    const [show, setShow] = useState(false);

    const tetris = useSelector(state => state.tetris.players[playerId]);
    const dispatch = useDispatch();


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

    function down() {
      dispatch({type: 'tetris/moveDown', payload: {
        playerIndex: playerId
      }})
    }
    
    function right() {
      dispatch({type: 'tetris/moveRight', payload: {
        playerIndex: playerId
      }})
    }
    
    function left() {
      dispatch({type: 'tetris/moveLeft', payload: {
        playerIndex: playerId
      }})
    }

    function rotate() {
      dispatch({type: 'tetris/rotatePiece', payload: {
        playerIndex: playerId
      }})
    }

    function blockPiece() {
      dispatch({type: 'tetris/blockPiece', payload: {
        playerIndex: playerId
      }})
    }

    function newPiece() {
      dispatch({type: 'tetris/newPiece', payload: {
        playerIndex: playerId
      }})
    }

    return (
      <div onMouseOver={() => {setShow(true)}}
          onMouseLeave={() => {setShow(false)}}
          
          className={show ? 'show' : ''}>
        {show ? "true" : "flase"}
        <button onClick={down}>down</button>
        <button onClick={left}>left</button>
        <button onClick={right}>right</button>
        <button onClick={rotate}>rotate</button>
        <button onClick={blockPiece}>block</button>
        <button onClick={newPiece}>new</button>
        {tetris.grid.map((line, index) => {
            return (
                <div  key={index}>
                    {/* {index} */}
                      <Cell cells={line}></Cell>
                </div>
            );
        })}

        {`score: ${tetris.score} playerId: ${playerId}`}
      </div>
    );
  }


function Cell({cells}) {
    return (
      <div className='line'>
        {cells.map((cell, index) => {
          if (cell.type)
            console.log(cell.type);

          return (
            <div className={`defaultCell ${(cell.type != 'default') ?  cell.type + 'Cell' : ''}`} key={index}>
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