/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';

// Import components
import Icon from '../Icon/Icon';

class NewSearch extends Component {
  constructor() {
    super();

    this.state = {
      term: ''
    };
  }

  render() {
    const { term } = this.state;
    return (
      <div className="wmnds-fe-autocomplete wmnds-grid">
        <div className="wmnds-fe-autocomplete__wrapper wmnds-col-1">
          <Icon iconClass="wmnds-fe-autocomplete__icon" iconName="general-search" />

          <input
            type="text"
            name="searchExample"
            className="wmnds-fe-autocomplete__input wmnds-col-1"
            data-placeholder="Search for a service or a stop"
            value={term}
            onChange={e => this.setState({ term: e.target.value })}
          />
        </div>
        <input type="submit" value="Go" className="wmnds-btn wmnds-btn__primary" />
      </div>
    );
  }
}

export default NewSearch;
