import PropTypes from 'prop-types';
import './styles/Cell.css'

export default function Line({ line }) {
  return (
    <div className='line'>
      {line.map((cell, index) => {
        return (
          <div className={`defaultCell ${(cell.type != 'default') ? cell.type + 'Cell' : ''}`} key={index}>
            {/* {cell.color} */}
          </div>
        )
      })}
    </div>

  );
}

Line.propTypes = {
  line: PropTypes.array.isRequired
}