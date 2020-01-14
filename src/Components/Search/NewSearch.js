import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';

const NewSearch = ({ query, updateQuery }) => {
  return (
    <div className="wmnds-autocomplete wmnds-grid wmnds-is--loading">
      <div className="wmnds-loader" />

      <svg className="wmnds-autocomplete__icon">
        <Icon iconName="wmnds-general-search" iconClass="wmnds-general-search" />
      </svg>

      <div className="wmnds-loader" role="alert" aria-live="assertive">
        <p className="wmnds-loader__content">Content is loading...</p>
      </div>

      <div className="wmnds-fe-input">
        <input
          type="text"
          name="busSearch"
          placeholder="Search for a service or a stop"
          className="wmnds-autocomplete__input wmnds-col-1 wmnds-is--loading"
          value={query}
          onChange={updateQuery}
        />
      </div>
    </div>
  );
};

// Set Props
NewSearch.propTypes = {
  query: PropTypes.string.isRequired,
  updateQuery: PropTypes.func.isRequired
};

export default NewSearch;
