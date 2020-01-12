import React, { Component } from 'react';
import axios from 'axios';

class AllInfo extends Component {
  constructor() {
    super();

    this.state = {
      disruptions: []
    };
  }

  componentDidMount() {
    axios
      .get('https://trasnport-api-isruptions-v2.azure-api.net/Disruption/v2/', {
        headers: {
          'Ocp-Apim-Subscription-Key': '55060e2bfbf743c5829b9eef583506f7'
        }
      })
      .then(response => {
        this.setState({
          disruptions: response.data.disruptions
        });
      });
  }

  render() {
    const { disruptions } = this.state;

    return (
      <div>
        <h5>Info Below</h5>

        {disruptions.map(({ disruption, serviceAffected }) => (
          <div key={disruption.id}>
            <div>
              <h1>{disruption.title}</h1>
              {serviceAffected.map(service => (
                <p key={service.id}>{service.id}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default AllInfo;
