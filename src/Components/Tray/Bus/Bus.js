import React, { Component } from 'react';
import Debounce from 'react-debounce-component';
import BusInfo from './BusInfo';
import NewSearch from '../../Search/NewSearch';

export default class Bus extends Component {
  constructor() {
    super();

    this.updateQuery = this.updateQuery.bind(this);

    this.state = {
      query: ''
    };
  }

  updateQuery(e) {
    this.setState({
      query: e.target.value,
      optionValue: e.target.value.length
    });
  }

  render() {
    const { query, optionValue } = this.state;

    return (
      <div>
        <br />
        <div className={`wmnds-autocomplete wmnds-grid ${optionValue > 1 ? 'wmnds-is--loading' : ''}`}>
          <NewSearch query={query} updateQuery={this.updateQuery} />
        </div>
        <Debounce ms={1000}>
          <BusInfo query={query} />
        </Debounce>
      </div>
    );
  }
}
