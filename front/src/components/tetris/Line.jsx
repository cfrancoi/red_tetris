import PropTypes from 'prop-types';
import './styles/Cell.css'

export default function Line({ line, isOpponent }) {
  return (
    <div className='line'>
      {line.map((cell, index) => {
        const preview = (cell.preview) ? 'preview' : '';
        return (
          <div key={index} className={`defaultCell
            ${(isOpponent) ? 'opponentCell' : ''}
            ${(cell.type != 'default') ? cell.type + 'Cell' : ''}
            ${preview}`}>
            {/* {cell.color} */}
          </div>
        )
      })}
    </div>

  );
}

Line.propTypes = {
  line: PropTypes.array.isRequired,
  isOpponent: PropTypes.bool
}