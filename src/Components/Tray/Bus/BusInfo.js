import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import styles
import s from './bus.module.scss';

// Import components
import Icon from '../../Icon/Icon';

class BusInfo extends Component {
  constructor() {
    super();
    this.state = { data: [] };
  }

  componentDidUpdate(prevProps) {
    const { query } = this.props;

    // If the previous query doesn't equal the current query, hit API
    if (prevProps.query !== query) {
      fetch(`https://trasnport-api-isruptions-v2.azure-api.net/bus/v1/service?q=${query}`, {
        headers: {
          'Ocp-Apim-Subscription-Key': '55060e2bfbf743c5829b9eef583506f7'
        }
      })
        .then(res => {
          // If response is bad, then throw error
          if (!res.ok) {
            throw Error(res.statusText);
          }
          return res.json(); // Else return response
        })
        .then(json => {
          this.setState({ data: json.services });
        });
    }
  }

  render() {
    const { data } = this.state;

    return (
      <ul className={s.results}>
        {data.map(el => {
          let type;
          if (el.hasDisruptions) {
            type = 'warning';
          } else {
            // No disruptions
            type = 'success';
          }

          return (
            <li className="wmnds-grid" key={el.id}>
              <div className={`${s.indicator} wmnds-col-auto`}>
                <div
                  className={`wmnds-disruption-indicator-medium wmnds-disruption-indicator-medium--with-icon wmnds-disruption-indicator-medium--${type}`}
                >
                  {el.serviceNumber}
                  <Icon
                    iconClass="wmnds-disruption-indicator-medium__icon wmnds-disruption-indicator-medium__icon--right"
                    iconName="general-success"
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
    );
  }
}

// Set Props
BusInfo.propTypes = {
  query: PropTypes.string.isRequired
};

export default BusInfo;
