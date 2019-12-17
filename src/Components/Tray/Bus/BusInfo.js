import React, { Component } from 'react';

// Import styles
import s from './bus.module.scss';

// Import components
import Icon from '../../Icon/Icon';

class BusInfo extends Component {
  constructor() {
    super();
    this.state = { data: [] };
  }

  componentDidMount() {
    fetch(`https://trasnport-api-isruptions-v2.azure-api.net/bus/v1/service?q=167`, {
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
        console.log(json);
        this.setState({ data: json.services });
      });
  }

  render() {
    const { data } = this.state;

    return (
      <ul className={s.results}>
        {data.map(el => (
          <li className="wmnds-grid">
            <div className={`${s.indicator} wmnds-col-auto`}>
              {el.hasDisruptions ? (
                // Has disruptions
                <div className="wmnds-disruption-indicator-medium wmnds-disruption-indicator-medium--with-icon wmnds-disruption-indicator-medium--warning">
                  {el.serviceNumber}
                  <Icon
                    iconClass="wmnds-disruption-indicator-medium__icon wmnds-disruption-indicator-medium__icon--right"
                    iconName="general-warning-circle"
                  />
                </div>
              ) : (
                // No disruptions
                <div className="wmnds-disruption-indicator-medium wmnds-disruption-indicator-medium--with-icon wmnds-disruption-indicator-medium--success">
                  {el.serviceNumber}
                  <Icon
                    iconClass="wmnds-disruption-indicator-medium__icon wmnds-disruption-indicator-medium__icon--right"
                    iconName="general-success"
                  />
                </div>
              )}
            </div>
            {/* Right section */}
            <div className="wmnds-col-1-2 wmnds-col-sm-2-3">
              <strong>{el.routes[0].routeName}</strong>
              <br />
              and return journey
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

export default BusInfo;
