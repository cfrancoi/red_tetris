import PropTypes from 'prop-types';
import './styles/cell.css'
import { useEffect, useState } from 'react';
import { I_TETROMINO } from './tetrominos-constant.js';
import { useInterval } from '../../hooks/useInterval';
import { useDispatch, useSelector } from 'react-redux';




export default function TetrisTable({height, width}) {
    const [show, setShow] = useState(false);
    // const [pos, setPos] = useState({x:0, y:0});


    const tetris = useSelector(state => state.tetris);

    const dispatch = useDispatch();

    // console.log(tetrisModel);

    // useEffect(() => {
    //     let buildTable = [];

    //     for(var i = 0; i < height; i++) {
    //         let start = i * width;
    //         buildTable.push(new Array(width).fill({}).map( () => {start+=1; return({index: start, color: 'default', fixed: false});} ))
    //     }

    //     setTable(buildTable)

    //     console.log(buildTable)

    // }, [height, width])

    // useEffect(drawTable, [pos])

    // useInterval(() => {setPos(oldPos => { return {x: oldPos.x + 1, y: oldPos.y}})}, 1000);


    // function drawTable() {
    //  setTable((oldTable) => {
    //   oldTable = clear(oldTable);
    //   oldTable = draw(oldTable, pos, 'red');

    //   return oldTable
    //  })
    // }

    // function clear(table) {
    //   for(let x = 0; x < table.length; x++) {
    //     for (let y = 0; y < table[x].length; y++) {
    //       if (table[x][y].fixed === false) {
    //         table[x][y].color = 'default';
    //       }
    //     }
    //   }
     
    //   return table;
    // }

    // function draw(table, pos, color) {
    //   let x = pos.x;
    //   let y = pos.y;

    //   for(const line in I_TETROMINO) {

    //     for (const cell in line) {
    //       if (cell && table[x] && table[x][y]) {
    //         table[x][y].color = color;
    //       }
    //       y++;
    //     }
    //     y = pos.y;
    //     x++;
    //   }
     

    //   return table;
    // }

    function down() {
      dispatch({type: 'tetris/moveDown'})
    }

    
    function right() {
      dispatch({type: 'tetris/moveRight'})
    }

    
    function left() {
      dispatch({type: 'tetris/moveLeft'})
    }

    function rotate() {
      dispatch({type: 'tetris/rotatePiece'})
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
        {tetris.grid.map((line, index) => {
            return (
                <div  key={index}>
                    {/* {index} */}
                      <Cell cells={line}></Cell>
                </div>
            );
        })}
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

// Cell.propTypes = {
//   className: PropTypes.string.isRequired
// }

TetrisTable.propTypes = {
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
}