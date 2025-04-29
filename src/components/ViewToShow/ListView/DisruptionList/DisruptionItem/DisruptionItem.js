import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Imported components
import Icon from 'components/shared/Icon/Icon';
import DisruptionIndicatorSmall from 'components/shared/DisruptionIndicator/DisruptionIndicatorSmall';
import DisruptionInfo from 'components/shared/DisruptionInfo/DisruptionInfo';
import useDisruptionAffectedItems from 'customHooks/useDisruptionAffectedItems';

function DisruptionItem({ disruption }) {
  const [openAccordions, setopenAccordions] = useState({}); // Used to track state of open and closed accordions
  const { iconLeft, title, affectedItems } = useDisruptionAffectedItems(disruption); // Get the correct modal icon and affectedItems

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
                {title()}
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

        {affectedItems()}

        <div className="wmnds-accordion__content" id="accordion-custom-01">
          <DisruptionInfo disruption={disruption} listView />
        </div>
      </div>
      {/* Accordion End */}
    </>
  );
}

// PropTypes
DisruptionItem.propTypes = {
  disruption: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default DisruptionItem;
