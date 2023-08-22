import React from 'react';
import PropTypes from 'prop-types';

function Filter({ filter, onChange }) {
  return (
    <label>
      Filter by name:
      <input type="text" value={filter} onChange={onChange} />
    </label>
  );
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
