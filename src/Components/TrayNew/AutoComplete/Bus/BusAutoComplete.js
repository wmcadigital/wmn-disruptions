import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../Icon/Icon';

const BusAutoComplete = ({ query, updateQuery }) => {
  return (
    <>
      <div className="wmnds-autocomplete wmnds-grid">
        <Icon iconName="general-search" iconClass="wmnds-autocomplete__icon" />
        <div className="wmnds-loader" role="alert" aria-live="assertive">
          <p className="wmnds-loader__content">Content is loading...</p>
        </div>
        <input
          type="text"
          name="busSearch"
          placeholder="Search for a service"
          className="wmnds-autocomplete__input wmnds-col-1"
          value={query}
          onChange={updateQuery}
          aria-label="Search for a service"
        />
      </div>
    </>
  );
};

// Set Props
BusAutoComplete.propTypes = {
  query: PropTypes.string.isRequired,
  updateQuery: PropTypes.func.isRequired
};

export default BusAutoComplete;
