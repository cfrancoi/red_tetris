import PropTypes from 'prop-types';
import './styles/cell.css'

export default function Cell({className}) {
    return (
      <div className={className} >

      </div>
    );
  }

Cell.propTypes = {
  className: PropTypes.string.isRequired
}