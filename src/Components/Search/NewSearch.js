import React from 'react';
import PropTypes from 'prop-types';

const NewSearch = ({ query, updateQuery }) => {
  return (
    <div className="wmnds-fe-input">
      <input
        type="text"
        name="busSearch"
        className="wmnds-col-1"
        placeholder="Search for a service or a stop"
        value={query}
        onChange={updateQuery}
      />
    </div>
  );
};

// Set Props
NewSearch.propTypes = {
  query: PropTypes.string.isRequired,
  updateQuery: PropTypes.func.isRequired
};

export default NewSearch;
