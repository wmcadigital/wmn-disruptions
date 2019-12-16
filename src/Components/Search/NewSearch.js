/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';

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
      <div className="wmnds-fe-input">
        <input
          type="text"
          name="busSearch"
          className="wmnds-col-1"
          placeholder="Search for a service or a stop"
          value={term}
          onChange={e => this.setState({ term: e.target.value })}
        />
      </div>
    );
  }
}

export default NewSearch;
