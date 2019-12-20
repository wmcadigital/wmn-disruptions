import React from 'react';
import Icon from '../Icon/Icon';

import Accordion from './Accordion';

function NewListView() {
  return (
    <div>
      <div className="wmnds-grid">
        <div className="wmnds-col-2-5" />
        <div className="wmnds-col-3-5">
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
          <Accordion allowMultipleOpen>
            <div label="Alligator Mississippiensis" isOpen>
              <p>
                <strong>Common Name:</strong>
                American Alligator
              </p>
              <p>
                <strong>Distribution:</strong>
                Texas to North Carolina, US
              </p>
              <p>
                <strong>Endangered Status:</strong>
                Currently Not Endangered
              </p>
            </div>
            <div label="Alligator Sinensis">
              <p>
                <strong>Common Name:</strong>
                Chinese Alligator
              </p>
              <p>
                <strong>Distribution:</strong>
                Eastern China
              </p>
              <p>
                <strong>Endangered Status:</strong>
                Critically Endangered
              </p>
            </div>
          </Accordion>
          <br />
        </div>
      </div>
    </div>
  );
}

export default NewListView;
