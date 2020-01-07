import React, { Component } from 'react';
import axios from 'axios';

export class RestInfo extends Component {
  constructor() {
    super();
    state = {
      data: []
    };
  }

  componentDidMount() {
    axios.get('https://trasnport-api-isruptions-v2.azure-api.net/bus/v1/service', {
      headers: {
        'Ocp-Apim-Subscription-Key': '55060e2bfbf743c5829b9eef583506f7'
      }.then(res => {
        const data = res.data;
        this.setState({ data });
      })
    });
  }

  render() {
    return (
      <div>
        <h1>Hello Data</h1>
        <ul>
          {this.state.data.map(data => (
            <li>data.disruptions</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default RestInfo;
