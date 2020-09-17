import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Imported components
import Icon from 'components/shared/Icon/Icon';
import DisruptionIndicatorSmall from 'components/shared/DisruptionIndicator/DisruptionIndicatorSmall';
import DisruptionInfo from 'components/shared/DisruptionInfo/DisruptionInfo';
import FavBusButton from 'components/shared/FavButtons/FavBusButton/FavBusButton';

const DisruptionItem = ({ disruption }) => {
  const [openAccordions, setopenAccordions] = useState({}); // Used to track state of open and closed accordions
  const iconLeft = disruption.mode === 'tram' ? 'metro' : disruption.mode; // set icon to correct name for tram/metro

  return (
    <>
      {/* Accordion Start */}
      <div
        className={`wmnds-accordion wmnds-m-b-lg ${
          openAccordions[disruption.id] ? 'wmnds-is--open' : ''
        }`}
      >
        <button
          type="button"
          aria-controls="accordion-custom-01"
          className="wmnds-accordion__summary-wrapper"
          aria-expanded={!!openAccordions[disruption.id]}
          onClick={() =>
            setopenAccordions((prevState) => ({
              ...prevState,
              [disruption.id]: !prevState[disruption.id],
            }))
          }
        >
          <div className="wmnds-accordion__summary">
            <div className="wmnds-grid wmnds-grid--align-center">
              <DisruptionIndicatorSmall
                severity={disruption.disruptionSeverity}
                iconLeft={`modes-isolated-${iconLeft}`}
                className="wmnds-col-auto wmnds-m-r-md"
              />

              <div className="wmnds-col-1 wmnds-col-sm-3-4">
                {/* Title of disruptions */}
                {disruption.title.charAt(0).toUpperCase() + disruption.title.slice(1)}
                {disruption.mode !== 'tram' && (
                  <>
                    {' '}
                    at <strong>{disruption.subtitle}</strong>
                  </>
                )}
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

        <div className="wmnds-p-l-md">
          <p>Affected {disruption.mode !== 'tram' ? 'Services' : 'Stops'}:</p>
        </div>

        <div className="wmnds-p-l-md">
          {disruption.servicesAffected &&
            disruption.mode === 'bus' &&
            disruption.servicesAffected
              .sort(
                (a, b) => a.serviceNumber.replace(/\D/g, '') - b.serviceNumber.replace(/\D/g, '')
              )
              .map((affected) => (
                <FavBusButton
                  id={affected.id}
                  severity={disruption.disruptionSeverity}
                  text={affected.serviceNumber}
                  title={`${affected.routeDescriptions[0].description} (${affected.operatorName})`}
                  mode={disruption.mode}
                  key={affected.id}
                />
              ))}

          {disruption.servicesAffected &&
            disruption.mode === 'tram' &&
            disruption.stopsAffected
              .sort((a, b) => a.name.replace(/\D/g, '') - b.name.replace(/\D/g, ''))
              .map((affected) => (
                <FavBusButton
                  id={affected.atcoCode}
                  severity={disruption.disruptionSeverity}
                  text={affected.name}
                  title={`${disruption.servicesAffected[0].routeDescriptions[0].description} (${disruption.servicesAffected[0].operatorName})`}
                  mode={disruption.mode}
                  key={affected.atcoCode}
                />
              ))}
        </div>

        <div className="wmnds-accordion__content" id="accordion-custom-01">
          <DisruptionInfo disruption={disruption} listView />
        </div>
      </div>
      {/* Accordion End */}
    </>
  );
};

// PropTypes
DisruptionItem.propTypes = {
  disruption: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DisruptionItem;
