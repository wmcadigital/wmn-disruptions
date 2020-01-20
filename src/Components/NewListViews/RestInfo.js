import React, { Component } from 'react';
import axios from 'axios';

class RestInfo extends Component {
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
        {disruptions.length > 0 ? (
          disruptions.map(post => {
            return (
              <div key={post.id}>
                <button
                  type="button"
                  aria-controls="accordion-01"
                  className="wmnds-accordion__summary-wrapper"
                  aria-expanded="false"
                >
                  <div className="wmnds-accordion wmnds-is--open">
                    <div className="wmnds-accordion__summary">
                      <div className="wmnds-grid wmnds-grid--align-center">
                        <span className="wmnds-disruption-indicator-small wmnds-col-auto wmnds-m-r-md">
                          <svg className="wmnds-disruption-indicator-small__icon">
                            <p>Icon Here</p>
                          </svg>
                          <svg className="wmnds-disruption-indicator-small__icon">
                            <p>Icon Here</p>
                          </svg>
                        </span>
                        <div className="wmnds-col-auto">
                          <strong>{post.title}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>

                <div className="wmnds-accordion__content" id="accordion-open-01">
                  {post.description}
                  <br />

                  <br />
                  {post.disruptionSeverity}
                  <br />
                  {post.id}
                  <br />
                  {post.title}
                  <br />
                  {post.mode}

                  <h2>serviceAffected:</h2>
                  {post.servicesAffected.map(affected => (
                    <div key={affected.id}>
                      <h5>Operator code:</h5>
                      {affected.operatorCode}
                      <h5>routeDesc:</h5>
                      {affected.routeDesc}
                      <h5>serviceNumber:</h5>
                      {affected.serviceNumber}
                      <h5>direction</h5>
                      {affected.direction}
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <div className="wmnds-loader" />
          </div>
        )}
      </div>
    );
  }
}

export default RestInfo;
