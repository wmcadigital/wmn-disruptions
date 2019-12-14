import React, { Component } from 'react';

class BusInfo extends Component {
  constructor() {
    super();
    this.state = { data: [] };
  }

  componentDidMount() {
    fetch(`https://raw.githubusercontent.com/wmcadigital/wmn-disruptions/master/public/newBusData.json`)
      .then(res => res.json())
      .then(json => this.setState({ data: json }));
  }
  // eslint-disable-next-line no-console

  render() {
    const { data } = this.state;
    return (
      <div>
        <ul>
          {data.map(el => (
            <>
              <em>{el.operatorName}</em>
              <br />
              <em>{el.routeDesc}</em>
              <br />
              <em>{el.direction}</em>
              <hr />
            </>
          ))}
        </ul>
      </div>
    );
  }
}

export default BusInfo;
