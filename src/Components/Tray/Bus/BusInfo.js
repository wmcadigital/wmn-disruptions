import React, { Component } from 'react';
import axios from 'axios';

class BusInfo extends Component {
  constructor() {
    super();
    this.state = {
      busData: []
    };
  }

  async componentDidMount() {
    const res = await axios.get(
      'https://raw.githubusercontent.com/wmcadigital/wmn-disruptions/master/public/newBusData.json'
    );

    this.setState({
      busData: []
    });

    // eslint-disable-next-line no-console
    console.log(`Bus Data!`, res);
  }

  render() {
    const { state } = this;

    const listItems = state.busData.map(res => (
      <div key={res.id}>
        {res.operatorName}
        <br />
        {res.routeDesc}
        <br />
        {res.serviceNumber}
        <br />
        {res.direction}
        <br />
      </div>
    ));

    return <div className="bus-info">{listItems}</div>;
  }
}

export default BusInfo;
