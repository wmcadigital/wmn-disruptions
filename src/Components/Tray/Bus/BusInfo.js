import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// Import styles
import s from './bus.module.scss';

// Import components
import Icon from '../../Icon/Icon';

class BusInfo extends Component {
  constructor() {
    super();

    this.state = {
      data: []
    };
  }

  componentDidUpdate(prevProps) {
    const { query } = this.props;
    // If the previous query doesn't equal the current query, hit API
    if (prevProps.query !== query) {
      axios
        .get(`https://trasnport-api-isruptions-v2.azure-api.net/bus/v1/service?q=${query}`, {
          headers: {
            'Ocp-Apim-Subscription-Key': '55060e2bfbf743c5829b9eef583506f7'
          }
        })
        .then(bus => {
          console.log(`This is the data :`, bus);
          this.setState({
            data: bus.data.services
          });
        });
    }
  }

  render() {
    const { data } = this.state;

    return (
      <div>
        <ul className={s.results}>
          {data.map(el => {
            let type;
            let iconName;
            let text;
            // If the current service has disruption
            if (el.hasDisruptions) {
              // Do a switch on the disruption severity, then map the type and iconName to the correct vars
              switch (el.disruptionSeverity) {
                // Minor disruption (normal)
                case 'normal':
                  type = 'warning';
                  iconName = 'warning-circle';
                  text = 'Minor disruption';
                  break;
                // Major disruption (high)
                case 'high':
                  type = 'error';
                  iconName = 'warning-triangle';
                  text = 'Major disruption';
                  break;
                // Severe disruption (veryHigh)
                case 'veryHigh':
                  type = 'severe';
                  iconName = 'warning-triangle';
                  text = 'Severe disruption';
                  break;
                // Good service (low)
                default:
                  type = 'success';
                  iconName = 'success';
                  text = 'Good service';
                  break;
              }
            } else {
              // No disruptions, so show success
              type = 'success';
              iconName = 'success';
              text = 'Good service';
            }
            // Return service with the above disruption logic, replace type and iconName with correc icon and class depending on disruption type
            return (
              <li className="wmnds-grid" key={el.id} title={`${text} on ${el.serviceNumber}`}>
                <div className={`${s.indicator} wmnds-col-auto`}>
                  <div
                    className={`wmnds-disruption-indicator-medium wmnds-disruption-indicator-medium--with-icon wmnds-disruption-indicator-medium--${type}`}
                  >
                    {el.serviceNumber}
                    <Icon
                      iconClass="wmnds-disruption-indicator-medium__icon wmnds-disruption-indicator-medium__icon--right"
                      iconName={`general-${iconName}`}
                    />
                  </div>
                </div>
                {/* Right section */}
                <div className="wmnds-col-1-2 wmnds-col-sm-2-3">
                  <strong>{el.routes[0].routeName}</strong>
                  <br />
                  and return journey
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

// Set Props
BusInfo.propTypes = {
  query: PropTypes.string.isRequired
};

export default BusInfo;
