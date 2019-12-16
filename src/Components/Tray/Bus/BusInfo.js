import React, { Component } from 'react';

class BusInfo extends Component {
  constructor() {
    super();
    this.state = { data: [] };
  }

  componentDidMount() {
    fetch(`https://trasnport-api-isruptions-v2.azure-api.net/bus/v1/service?q=2`, {
      headers: {
        'Ocp-Apim-Subscription-Key': '55060e2bfbf743c5829b9eef583506f7'
      }
    })
      .then(res => res.json())
      .then(json => this.setState({ data: json }));
  }

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
