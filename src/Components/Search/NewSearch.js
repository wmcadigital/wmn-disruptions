/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';

class NewSearch extends Component {
  constructor() {
    super();

    this.state = {
      term: 'Search for a service or a stop'
    };
  }

  render() {
    const { term } = this.state;
    return (
      <div>
        <form>
          <input type="text" value={term} onChange={e => this.setState({ term: e.target.value })} />
        </form>
      </div>
    );
  }
}

export default NewSearch;
