import React, { Component } from 'react';
import axios from 'axios';
import Icon from '../Icon/Icon';

class RestInfo extends Component {
  constructor() {
    super();

    this.toggle = this.toggle.bind(this);

    this.state = {
      disruptions: [],
      activeAcc: 0
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

  toggle(key) {
    this.setState(prevState => {
      return {
        activeAcc: prevState.activeAcc === key ? false : key
      };
    });
  }

  render() {
    const { disruptions, activeAcc } = this.state;

    return (
      <div>
        {disruptions.length > 0 ? (
          disruptions.map((post, key) => {
            return (
              <div key={post.id}>
                <div className={`wmnds-accordion ${activeAcc === key ? 'wmnds-is--open' : ''}`}>
                  <button
                    type="button"
                    aria-controls="accordion-custom-01"
                    className="wmnds-accordion__summary-wrapper"
                    aria-expanded="true"
                    onClick={() => this.toggle(key)}
                  >
                    <div className="wmnds-accordion__summary">
                      <div className="wmnds-grid wmnds-grid--align-center">
                        <span className="wmnds-disruption-indicator-small wmnds-col-auto wmnds-m-r-md">
                          <svg className="wmnds-disruption-indicator-small__icon">
                            <Icon iconName="modes-isolated-bus" iconClass="modes-isolated-bus" />
                          </svg>
                          <svg className="wmnds-disruption-indicator-small__icon">
                            <Icon iconName="general-warning-circle" iconClass="general-warning-circle" />
                          </svg>
                        </span>
                        <div className="wmnds-col-auto">
                          <strong>{post.title}</strong>
                        </div>
                      </div>
                    </div>

                    <svg className="wmnds-accordion__icon">
                      <Icon iconName="general-expand" iconClass="general-expand" />
                    </svg>

                    <svg className="wmnds-accordion__icon wmnds-accordion__icon--minimise">
                      <Icon iconName="general-minimise" iconClass="general-minimise" />
                    </svg>
                  </button>

                  <div className="wmnds-accordion__content" id="accordion-custom-01">
                    <h4 className="serviceAffected">Affected Service(s) </h4>
                    {post.servicesAffected.map(affected => (
                      <div key={affected.id}>
                        <span className="wmnds-disruption-indicator-small wmnds-col-auto wmnds-m-r-md">
                          <svg className="wmnds-disruption-indicator-small__icon">
                            <Icon iconName="modes-isolated-bus" iconClass="modes-isolated-bus">
                              {affected.serviceNumber}
                            </Icon>
                          </svg>
                          <svg className="wmnds-disruption-indicator-small__icon">
                            <Icon iconName="general-warning-circle" iconClass="general-warning-circle" />
                          </svg>
                        </span>

                        <h5>routeDesc:</h5>
                        {affected.routeDesc}
                        <h5>serviceNumber:</h5>
                        {affected.serviceNumber}
                        <h5>direction</h5>
                        {affected.direction}
                      </div>
                    ))}

                    <p>{post.title}</p>
                    <p>{post.description}</p>
                    <p>{post.disruptionSeverity}</p>
                    <p>{post.mode}</p>
                    <p>{post.disruptionSeverity}</p>
                  </div>
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
