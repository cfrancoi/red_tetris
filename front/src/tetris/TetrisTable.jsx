import PropTypes from 'prop-types';
import './styles/cell.css'
import { useEffect, useState } from 'react';

export default function TetrisTable({height, width}) {

    const [table, setTable] = useState([]);


    useEffect(() => {
        let buildTable = [];

        for(var i = 0; i < height; i++) {
            let start = i * width;
            buildTable.push(new Array(width).fill(1).map( () => {start+=1; return(start);} ))
        }

        setTable(buildTable)

        console.log(buildTable)

    }, [height, width])

    return (
      <div >
        {table.map((line, index) => {
            return (
                <div key={index}>
                        |{line}|
                        <hr />
                </div>
            );
        })}
      </div>
    );
  }

TetrisTable.propTypes = {
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
}