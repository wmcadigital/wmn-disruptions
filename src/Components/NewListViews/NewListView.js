import React from 'react';

import RestInfo from './RestInfo';
import Icon from '../Icon/Icon';
import './NewListView.scss';

function NewListView() {
  return (
    <div>
      <div className="wmnds-grid">
        <div className="wmnds-col-2-5" />
        <div className="wmnds-col-3-5">
          <RestInfo />

          <br />
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
          <br />
          <div className="wmnds-disruption-indicator-large wmnds-disruption-indicator-large--error">
            <div className="wmnds-disruption-indicator-large__left-wrapper">
              <span className="wmnds-disruption-indicator-large__left-icon-wrapper">
                <svg className="wmnds-disruption-indicator-large__icon">
                  <Icon iconName="modes-isolated-bus" iconClass="wmnds-disruption-indicator-large__icon" />
                </svg>
                <br />
                Trains
              </span>
              <span className="wmnds-disruption-indicator-large__text">
                <strong>Major Disruption</strong>
                <br />
                Cross City Line
              </span>
            </div>
            <svg className="wmnds-disruption-indicator-large__icon wmnds-disruption-indicator-large__icon--right">
              <Icon iconName="general-warning" iconClass="disruption-indicator-large__icon--right" />
            </svg>
          </div>
          <br />
          <p>
            Gas Main Repairs at
            <span className="bolder"> Long Lane, Halesowen</span>
          </p>
          <p>Affected Service(s):</p>
          <div className="wmnds-disruption-indicator-medium wmnds-disruption-indicator-medium--with-icon wmnds-disruption-indicator-medium--warning">
            X15
            <svg className="wmnds-disruption-indicator-medium__icon wmnds-disruption-indicator-medium__icon--right">
              <Icon iconName="general-warning-circle" iconClass="disruption-indicator-large__icon--right" />
            </svg>
          </div>
          <svg>
            <Icon iconName="general-star-empty" iconClass="disruption-indicator-large__icon--right" />
          </svg>
          <div className="wmnds-disruption-indicator-medium wmnds-disruption-indicator-medium--with-icon wmnds-disruption-indicator-medium--warning">
            15A
            <svg className="wmnds-disruption-indicator-medium__icon wmnds-disruption-indicator-medium__icon--right">
              <Icon iconName="general-warning-circle" iconClass="disruption-indicator-large__icon--right" />
            </svg>
          </div>
          <div className="wmnds-disruption-indicator-medium wmnds-disruption-indicator-medium--with-icon wmnds-disruption-indicator-medium--warning">
            15
            <svg className="wmnds-disruption-indicator-medium__icon wmnds-disruption-indicator-medium__icon--right">
              <Icon iconName="general-warning-circle" iconClass="disruption-indicator-large__icon--right" />
            </svg>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
}

export default NewListView;
