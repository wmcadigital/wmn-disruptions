import React, { Component } from 'react';
import Icon from '../../Icon/Icon';

class BusInfo extends Component {
  constructor() {
    super();
    this.state = { data: [] };
  }

  componentDidMount() {
    fetch(`https://raw.githubusercontent.com/wmcadigital/wmn-disruptions/master/public/newBusData.json`)
      .then(res => res.json())
      .then(json => this.setState({ data: json }));
  }

  render() {
    const { data } = this.state;

    return (
      <div>
        <ul>
          {data.map(el => (
            <>
              <em>{el.operatorName}</em>
              <br />
              <em>{el.routeDesc}</em>
              <br />
              <em>{el.direction}</em>
              <hr />
            </>
          ))}
        </ul>

        <div className="wmnds-disruption-indicator-large wmnds-disruption-indicator-large--undefined">
          <div className="wmnds-disruption-indicator-large__left-wrapper">
            <span className="wmnds-disruption-indicator-large__left-icon-wrapper">
              <svg className="wmnds-disruption-indicator-large__icon">
                <Icon iconName="modes-isolated-bus" iconClass="wmnds-disruption-indicator-large__icon" />
              </svg>
              <br />
              Trains
            </span>
            <span className="wmnds-disruption-indicator-large__text">
              <strong>Good service</strong>
              <br />
              Cross City Line
            </span>
          </div>
          <svg className="wmnds-disruption-indicator-large__icon wmnds-disruption-indicator-large__icon--right">
            <Icon iconName="general-success" iconClass="disruption-indicator-large__icon--right" />
          </svg>
        </div>
      </div>
    );
  }
}

export default BusInfo;
