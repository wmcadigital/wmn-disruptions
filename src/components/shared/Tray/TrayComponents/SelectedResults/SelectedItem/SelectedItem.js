import React from 'react';
import PropTypes from 'prop-types';
import dompurify from 'dompurify';
// Imported components
import Button from 'components/shared/Button/Button';
import Icon from 'components/shared/Icon/Icon';
import DisruptionIndicatorSmall from 'components/shared/DisruptionIndicator/DisruptionIndicatorSmall';
import FavBusButton from 'components/shared/FavButtons/FavBusButton/FavBusButton';

import s from './SelectedItem.module.scss';

const { sanitize } = dompurify;

const SelectedItem = ({ disruption }) => {
  return (
    <div className={`wmnds-grid wmnds-m-t-lg wmnds-p-t-lg ${s.disruption}`} key={disruption.id}>
      {/* Title of disruptions */}
      <div className="wmnds-col-1 wmnds-m-b-lg">
        <div className="wmnds-grid wmnds-grid--align-center">
          <DisruptionIndicatorSmall
            severity={disruption.disruptionSeverity}
            iconLeft={`modes-isolated-${disruption.mode}`}
            className="wmnds-col-auto wmnds-m-r-md"
          />

          <div className="wmnds-col-3-4">
            {disruption.title} at <strong>{disruption.subtitle}</strong>
          </div>
        </div>
      </div>

      {/* Affected Services */}
      <div className="wmnds-col-1 ">
        <strong>Affected Services:</strong>
      </div>
      <div className="wmnds-col-1">
        {disruption.servicesAffected &&
          disruption.servicesAffected.map(affected => (
            <FavBusButton
              id={affected.id}
              severity={disruption.disruptionSeverity}
              text={affected.serviceNumber}
              title={`${affected.routeDescriptions[0].description} (${affected.operatorName})`}
            />
          ))}
      </div>
      {/* Disruption description */}
      <div
        className="wmnds-col-1 wmnds-m-b-lg"
        dangerouslySetInnerHTML={{ __html: sanitize(disruption.description) }}
      />
      {/* Replan button */}
      <a
        className="wmnds-btn wmnds-btn--start wmnds-col-1 wmnds-m-b-md"
        href="https://journeyplanner.networkwestmidlands.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Replan your journey
        <Icon iconName="general-chevron-right" iconClass="wmnds-btn__icon wmnds-btn__icon--right" />
      </a>
      {/* Share button */}
      <Button btnClass="wmnds-col-1" text="Share disruption" iconRight="general-share" />
    </div>
  );
};

// PropTypes
SelectedItem.propTypes = {
  disruption: PropTypes.objectOf(PropTypes.any).isRequired
};

export default SelectedItem;
