import React, { Component } from 'react';
import axios from 'axios';

class RestInfo extends Component {
  componentDidMount() {
    axios
      .get('https://trasnport-api-isruptions-v2.azure-api.net/Disruption/v2/', {
        headers: {
          'Ocp-Apim-Subscription-Key': '55060e2bfbf743c5829b9eef583506f7'
        }
      })
      .then(response => {
        console.log(`this is the ${response}`);
      });
  }

  render() {
    return (
      <div>
        <h1>The Disruptions</h1>
      </div>
    );
  }
}

export default RestInfo;
