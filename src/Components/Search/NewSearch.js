import React, { Component } from 'react';

class NewSearch extends Component {
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
          <input type="text" value="Search for a route" onChange={e => this.setState({ term: e.target.value })} />
        </form>
      </div>
    );
  }
}

export default NewSearch;
