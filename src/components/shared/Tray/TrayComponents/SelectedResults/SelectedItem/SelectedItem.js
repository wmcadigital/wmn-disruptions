import React from 'react';
import PropTypes from 'prop-types';
import dompurify from 'dompurify';
// Imported components
import Button from 'components/shared/Button/Button';
import Icon from 'components/shared/Icon/Icon';
import DisruptionIndicatorSmall from 'components/shared/DisruptionIndicator/DisruptionIndicatorSmall';
import DisruptionIndicatorMedium from 'components/shared/DisruptionIndicator/DisruptionIndicatorMedium';

const { sanitize } = dompurify;

const SelectedItem = ({ disruption }) => {
  return (
    <div className="wmnds-grid" key={disruption.id}>
      {/* Title of disruptions */}
      <div className="wmnds-col-1 wmnds-m-b-lg wmnds-m-t-lg">
        <div className="wmnds-grid wmnds-grid--align-center">
          <DisruptionIndicatorSmall
            severity={disruption.disruptionSeverity}
            iconLeft={`modes-isolated-${disruption.mode}`}
            className="wmnds-col-auto wmnds-m-r-md"
          />

          <div className="wmnds-col-3-4">
            <h4 className="wmnds-m-none">{disruption.title}</h4>
          </div>
        </div>
      </div>

      {/* Affected Services */}
      <div className="wmnds-col-1 ">
        <strong>Affected Services:</strong>
      </div>
      <div className="">
        {disruption.servicesAffected &&
          disruption.servicesAffected.map(affected => (
            <div className="wmnds-col-1-3" key={affected.id}>
              {/* Services Affected */}
              <DisruptionIndicatorMedium
                narrow
                text={affected.serviceNumber}
                severity={disruption.disruptionSeverity}
              />

              {/* Faved Routed to be saved to local storage */}
              <div className="wmnds-m-t-md wmnds-p-l-lg wmnds-m-b-lg ">
                <svg className="favStar ">
                  <Icon iconName="general-star" iconClass="disruption-indicator-small__icon" />
                </svg>
              </div>
            </div>
          ))}
      </div>
      {/* Disruption description */}
      <div
        className="wmnds-col-1 wmnds-m-b-lg"
        dangerouslySetInnerHTML={{ __html: sanitize(disruption.description) }}
      />
      {/* Replan button */}
      <Button
        btnClass="wmnds-btn--start wmnds-col-1 wmnds-m-b-md"
        text="Replan Your Journey"
        iconRight="general-chevron-right"
      />
      {/* Share button */}
      <Button btnClass="wmnds-col-1" text="Share Disruption" iconRight="general-share" />
    </div>
  );
};

// PropTypes
SelectedItem.propTypes = {
  disruption: PropTypes.objectOf(PropTypes.any).isRequired
};

export default SelectedItem;
