import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';

const NewSearch = ({ query, updateQuery }) => {
  return (
    <div>
      <Icon iconName="general-search" iconClass="wmnds-autocomplete__icon" />
      <div className="wmnds-loader" role="alert" aria-live="assertive">
        <p className="wmnds-loader__content">Content is loading...</p>
      </div>
      <input
        type="text"
        name="busSearch"
        placeholder="Search for a service or a stop"
        className="wmnds-autocomplete__input wmnds-col-1 wmnds-is--loading"
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
