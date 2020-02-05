import React from 'react'
import PropTypes from 'prop-types';
import dompurify from 'dompurify';
import Icon from 'components/shared/Icon/Icon';

const {sanitize} = dompurify;

const DisruptionItem = ({disruption}) => {


  let iconName;
  let newClass;
  // Removed the if statement - Icon now showing.
  // Do a switch on the disruption severity, then map the type and iconName to the correct vars
  switch (disruption.disruptionSeverity) {
    // Minor disruption (normal)
    case 'normal':
      iconName = 'warning-circle';
      newClass = 'warning';
      break;
    // Major disruption (high)
    case 'high':
      iconName = 'warning-triangle';
      newClass = 'error';
      break;
    // Severe disruption (veryHigh)
    case 'veryHigh':
      iconName = 'warning-triangle';
      newClass = 'severe';
      break;
    // Major Disruption - Notice that the disruptionSeverity is capitalised in this case - Maybe ask Jon to make it lowercase?
    case 'Major':
      iconName = 'warning-triangle';
      newClass = 'error';
      break;
    // Good service (low)
    default:
      iconName = 'success';
      newClass = 'success';
      break;
  }

  return (
    <div>
      <div className="wmnds-accordion wmnds-m-b-lg" key={disruption.id}>
        <button
          type="button"
          aria-controls="accordion-custom-01"
          className="wmnds-accordion__summary-wrapper"
          aria-expanded="true"
          // onClick={() => this.toggle(key)}
        >
          <div className="wmnds-accordion__summary">
            {disruption.mode}
            <div className="wmnds-grid wmnds-grid--align-center">
              <div
                className={`wmnds-disruption-indicator-small wmnds-col-auto wmnds-m-r-md wmnds-disruption-indicator-medium--${newClass}`}
              >
                {/* Bus Icon Only */}
                <svg className="wmnds-disruption-indicator-small__icon">
                  <Icon iconName="modes-isolated-bus" iconClass="modes-isolated-bus" />
                </svg>

                <svg className="wmnds-disruption-indicator-small__icon">
                  <Icon iconName={`general-${iconName}`} iconClass={`general-${iconName}`} />
                </svg>
              </div>
              <div className="wmnds-col-auto">
                {/* Title of disruptions */}
                <strong>{disruption.title}</strong>
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
        {/* Accordion Start */}

        <div className="wmnds-accordion__content" id="accordion-custom-01">
          <div className="wmnds-grid">
            {/* {disruptions.length > 1 && (
                    <div className="wmnds-col-1-1">
                      <h4 className="serviceAffected">Affected Service(s) </h4>
                    </div>
                  )} */}

            {disruption.servicesAffected &&
              disruption.servicesAffected.map(affected => (
                <div className="wmnds-col-1-5">
                  {/* Key ID */}
                  <div key={affected.id}>
                    <span>
                      {/* Services Affected */}
                      <div
                        className={`wmnds-disruption-indicator-medium wmnds-disruption-indicator-medium--with-icon wmnds-disruption-indicator-medium--${newClass}`}
                      >
                        <span className="serviceNumber">{affected.serviceNumber}</span>
                        {/* Affected Icon */}
                        <svg className="wmnds-disruption-indicator-small__icon">
                          <Icon iconName={`general-${iconName}`} iconClass="disruption-indicator-large__icon--right" />
                        </svg>
                      </div>
                    </span>
                    {/* Faved Routed to be saved to local storage */}

                    <div>
                      <svg className="favStar">
                        <Icon iconName="general-star" iconClass="disruption-indicator-small__icon" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {/* Accordion End */}

          {/* Description Start */}
          <div className="clear">
            <hr />
            <h3>{disruption.title}</h3>

            <div dangerouslySetInnerHTML={{ __html: sanitize(disruption.text) }} />
          </div>
          {/* Description End */}
        </div>
      </div>
    </div>
  );
}

// PropTypes
DisruptionItem.propTypes = {
  disruption: PropTypes.objectOf(PropTypes.any).isRequired
};

export default DisruptionItem
