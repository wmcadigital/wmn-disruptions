import React, { Component } from 'react';
import axios from 'axios';
import Icon from '../Icon/Icon';

class RestInfo extends Component {
  constructor() {
    super();

    this.toggle = this.toggle.bind(this);

    this.state = {
      disruptions: [],
      activeAcc: ''
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
            let iconName;

            // If the current service has disruption
            if (post.disruptions) {
              // Do a switch on the disruption severity, then map the type and iconName to the correct vars
              switch (post.disruptionSeverity) {
                // Minor disruption (normal)
                case 'normal':
                  iconName = 'warning-circle';
                  break;
                // Major disruption (high)
                case 'high':
                  iconName = 'triangle';
                  break;
                // Severe disruption (veryHigh)
                case 'veryHigh':
                  iconName = 'triangle';
                  break;
                // Good service (low)
                default:
                  iconName = 'success';
                  break;
              }
            } else {
              // No disruptions, so show success
              iconName = 'success';
            }
            return (
              <div className="wmnds-container wmnds-container--main">
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
                            {/* Bus Icon */}

                            <svg className="wmnds-disruption-indicator-small__icon">
                              <Icon iconName="modes-isolated-bus" iconClass="modes-isolated-bus" />
                            </svg>

                            <svg className="wmnds-disruption-indicator-small__icon">
                              <Icon
                                iconName={`general-warning-${iconName}`}
                                iconClass={`general-warning-${iconName}`}
                              />
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
                      <div className="wmnds-grid">
                        {post.servicesAffected &&
                          post.servicesAffected.map(affected => (
                            <div className="wmnds-col-1-5">
                              <div key={affected.id}>
                                <span className="wmnds-disruption-indicator-small wmnds-col-auto wmnds-m-r-md">
                                  <svg className="wmnds-disruption-indicator-small__icon">
                                    <Icon iconName="modes-isolated-bus" iconClass="modes-isolated-bus" />
                                  </svg>
                                  {affected.serviceNumber}
                                </span>
                                <div className="isFav">
                                  <svg>
                                    <Icon iconName="general-star-empty" iconClass="disruption-indicator-small__icon" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>

                      <div className="clear">
                        <hr />
                        <p>{post.title}</p>
                        <p>{post.description}</p>
                        <p>{post.disruptionSeverity}</p>
                        <p>{post.mode}</p>
                      </div>
                    </div>
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
