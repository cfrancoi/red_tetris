import PropTypes from 'prop-types';
import './styles/Cell.css'

export default function Line({ line }) {
  return (
    <div className='line'>
      {line.map((cell, index) => {
        const preview = (cell.preview) ? 'preview' : '';
        return (
          <div className={`defaultCell ${(cell.type != 'default') ? cell.type + 'Cell' : ''} ${preview}`} key={index}>
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