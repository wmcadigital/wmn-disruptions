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
            let newClass;
            // Removed the if statement - Icon now showing.
            // Do a switch on the disruption severity, then map the type and iconName to the correct vars
            switch (post.disruptionSeverity) {
              // Minor disruption (normal)
              case 'normal':
                iconName = 'warning-circle';
                newClass = 'warning';
                break;
              // Major disruption (high)
              case 'high':
                iconName = 'warning-triangle';
                newClass = 'error';
                break;
              // Severe disruption (veryHigh)
              case 'veryHigh':
                iconName = 'warning-triangle';
                newClass = 'severe';
                break;
              // Good service (low)
              default:
                iconName = 'success';
                newClass = 'success';
                break;
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
                          <div
                            className={`wmnds-disruption-indicator-small wmnds-col-auto wmnds-m-r-md wmnds-disruption-indicator-medium--${newClass}`}
                          >
                            {/* Bus Icon Only */}
                            <svg className="wmnds-disruption-indicator-small__icon">
                              <Icon iconName="modes-isolated-bus" iconClass="modes-isolated-bus" />
                            </svg>

                            <svg className="wmnds-disruption-indicator-small__icon">
                              <Icon iconName={`general-${iconName}`} iconClass={`general-${iconName}`} />
                            </svg>
                          </div>
                          <div className="wmnds-col-auto">
                            {/* Title of disruptions */}
                            <strong>{post.title}</strong>
                          </div>
                        </div>
                      </div>
                      {/* Expand Icon Only */}
                      <svg className="wmnds-accordion__icon">
                        <Icon iconName="general-expand" iconClass="general-expand" />
                      </svg>
                      {/* Minimise Icon Only */}
                      <svg className="wmnds-accordion__icon wmnds-accordion__icon--minimise">
                        <Icon iconName="general-minimise" iconClass="general-minimise" />
                      </svg>
                    </button>
                    {/* Accordion Start */}

                    <div className="wmnds-accordion__content" id="accordion-custom-01">
                      <div className="wmnds-grid">
                        {disruptions.length > 1 && (
                          <div className="wmnds-col-1-1">
                            <h4 className="serviceAffected">Affected Service(s) </h4>
                          </div>
                        )}

                        {post.servicesAffected &&
                          post.servicesAffected.map(affected => (
                            <div className="wmnds-col-1-5">
                              {/* Key ID */}
                              <div key={affected.id}>
                                <span>
                                  {/* Services Affected */}
                                  <div
                                    className={`wmnds-disruption-indicator-medium wmnds-disruption-indicator-medium--with-icon wmnds-disruption-indicator-medium--${newClass}`}
                                  >
                                    <span className="serviceNumber">{affected.serviceNumber}</span>
                                    {/* Affected Icon */}
                                    <svg className="wmnds-disruption-indicator-small__icon">
                                      <Icon
                                        iconName={`general-${iconName}`}
                                        iconClass="disruption-indicator-large__icon--right"
                                      />
                                    </svg>
                                  </div>
                                </span>
                                {/* Faved Routed to be saved to local storage */}
                                <div className="isFav">
                                  <svg className="favStar">
                                    <Icon iconName="general-star-empty" iconClass="disruption-indicator-small__icon" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                      {/* Accordion End */}

                      {/* Description Start */}
                      <div className="clear">
                        <hr />
                        <p>{post.title}</p>
                        <div dangerouslySetInnerHTML={{ __html: post.description }} />
                      </div>
                      {/* Description End */}
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
