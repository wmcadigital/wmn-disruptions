import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Imported components
import Icon from 'components/shared/Icon/Icon';
import DisruptionIndicatorSmall from 'components/shared/DisruptionIndicator/DisruptionIndicatorSmall';
import DisruptionInfo from 'components/shared/DisruptionInfo/DisruptionInfo';
import FavBusButton from 'components/shared/FavButtons/FavBusButton/FavBusButton';

const DisruptionItem = ({ disruption }) => {
  const [openAccordions, setopenAccordions] = useState({}); // Used to track state of open and closed accordions

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
                iconLeft={`modes-isolated-${disruption.mode}`}
                className="wmnds-col-auto wmnds-m-r-md"
              />

              <div className="wmnds-col-1 wmnds-col-sm-3-4">
                {/* Title of disruptions */}
                {disruption.title} at <strong>{disruption.subtitle}</strong>
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
          <p>Affected Services:</p>
        </div>

        <div className="wmnds-p-l-md">
          {disruption.servicesAffected &&
            disruption.servicesAffected
              .sort(
                (a, b) => a.serviceNumber.replace(/\D/g, '') - b.serviceNumber.replace(/\D/g, '')
              )
              .map((affected) => (
                <FavBusButton
                  id={affected.id}
                  mode={disruption.mode}
                  severity={disruption.disruptionSeverity}
                  text={affected.serviceNumber}
                  title={`${affected.routeDescriptions[0].description} (${affected.operatorName})`}
                  key={affected.id}
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
