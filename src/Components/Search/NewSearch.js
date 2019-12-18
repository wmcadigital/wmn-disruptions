import React from 'react';
import PropTypes from 'prop-types';
import Debounce from 'react-debounce-component';

const NewSearch = ({ query, updateQuery }) => {
  return (
    <div className="wmnds-fe-input">
      <Debounce ms={150}>
        <input
          type="text"
          name="busSearch"
          className="wmnds-col-1"
          placeholder="Search for a service or a stop"
          value={query}
          onChange={updateQuery}
        />
      </Debounce>
    </div>
  );
};

// Set Props
NewSearch.propTypes = {
  query: PropTypes.string.isRequired,
  updateQuery: PropTypes.func.isRequired
};

export default NewSearch;
