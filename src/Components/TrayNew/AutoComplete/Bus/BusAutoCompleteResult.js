import React from 'react';

// Import components
import Icon from '../../../Icon/Icon';

const BusAutoCompleteResult = props => {
  const { result } = props || {};

  let type;
  let iconName;
  let text;
  // If the current service has disruption
  if (result.hasDisruptions) {
    // Do a switch on the disruption severity, then map the type and iconName to the correct vars
    switch (result.disruptionSeverity) {
      // Minor disruption (normal)
      case 'normal':
        type = 'warning';
        iconName = 'warning-circle';
        text = 'Minor disruption';
        break;
      // Major disruption (high)
      case 'high':
        type = 'error';
        iconName = 'warning-triangle';
        text = 'Major disruption';
        break;
      // Severe disruption (veryHigh)
      case 'veryHigh':
        type = 'severe';
        iconName = 'warning-triangle';
        text = 'Severe disruption';
        break;
      // Good service (low)
      default:
        type = 'success';
        iconName = 'success';
        text = 'Good service';
        break;
    }
  } else {
    // No disruptions, so show success
    type = 'success';
    iconName = 'success';
    text = 'Good service';
  }

  // Return service with the above disruption logic, replace type and iconName with correc icon and class depending on disruption type
  return (
    <li
      className="wmnds-autocomplete-suggestions__li wmnds-grid"
      title={`${text} on ${result.serviceNumber}`}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex="0"
    >
      <div className="wmnds-col-auto">
        <div
          className={`wmnds-disruption-indicator-medium wmnds-disruption-indicator-medium--with-icon wmnds-disruption-indicator-medium--${type}`}
        >
          {result.serviceNumber}
          <Icon
            iconClass="wmnds-disruption-indicator-medium__icon wmnds-disruption-indicator-medium__icon--right"
            iconName={`general-${iconName}`}
          />
        </div>
      </div>
      {/* Right section */}
      <div className="wmnds-col-1-2 wmnds-col-sm-1-2">
        <strong>{result.routes[0].routeName}</strong>
        <br />
        and return journey
      </div>
    </li>
  );
};

export default BusAutoCompleteResult;
