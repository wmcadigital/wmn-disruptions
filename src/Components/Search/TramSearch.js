/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';

class TramSearch extends Component {
  constructor() {
    super();

    this.state = {
      term: ''
    };
  }

  render() {
    return (
      <div>
        <form>
          <input
            type="text"
            value="Search For A Line Or Stop"
            onChange={e => this.setState({ term: e.target.value })}
          />
        </form>
      </div>
    );
  }
}

export default TramSearch;
