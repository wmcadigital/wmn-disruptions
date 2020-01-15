import React, { Component } from 'react';
import Debounce from 'react-debounce-component';
import BusInfo from './BusInfo';
import NewSearch from '../../Search/NewSearch';

export default class Bus extends Component {
  constructor(props) {
    super(props);

    this.updateQuery = this.updateQuery.bind(this);

    this.state = {
      query: ''
    };
  }

  // Update the users "query" in state
  updateQuery(e) {
    this.setState({ query: e.target.value });

    const optionValue = e.target.value.length;

    if (optionValue >= 2) {
      console.log('more than 2');
    } else {
      console.log('none');
    }
  }

  render() {
    const { query } = this.state;
    return (
      <div>
        <br />
        <NewSearch query={query} updateQuery={this.updateQuery} />
        <Debounce ms={1000}>
          <BusInfo query={query} />
        </Debounce>
      </div>
    );
  }
}
