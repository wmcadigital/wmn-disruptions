import React from 'react';
import dompurify from 'dompurify';

// Imported components
import FavBusButton from 'components/shared/FavButtons/FavBusButton/FavBusButton';
import Button from 'components/shared/Button/Button';
import Icon from 'components/shared/Icon/Icon';

const { sanitize } = dompurify;

const DisruptionInfo = ({ disruption }) => {
  return (
    <>
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
    </>
  );
};

export default DisruptionInfo;
