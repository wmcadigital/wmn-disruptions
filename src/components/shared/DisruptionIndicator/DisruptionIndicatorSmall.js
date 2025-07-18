/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/shared/Icon/Icon';

function DisruptionIndicatorSmall({ className = '', iconLeft = null, severity = '' }) {
  let iconRightName;
  let disruptedClass;
  // Removed the if statement - Icon now showing.
  // Do a switch on the disruption severity, then map the type and iconRightName to the correct vars
  switch (severity) {
    // Major disruption (high)
    case 'high':
      iconRightName = 'warning-triangle';
      disruptedClass = 'error';
      break;
    // Severe disruption (veryHigh)
    case 'veryHigh':
      iconRightName = 'warning-triangle';
      disruptedClass = 'severe';
      break;
    // Major Disruption - Notice that the disruptionSeverity is capitalised in this case - Maybe ask Jon to make it lowercase?
    case 'Major':
      iconRightName = 'warning-triangle';
      disruptedClass = 'error';
      break;
    // Minor disruption (normal)
    default:
      iconRightName = 'warning-circle';
      disruptedClass = 'warning';
      break;
  }

  return (
    <span
      className={`wmnds-disruption-indicator-small ${
        disruptedClass ? `wmnds-disruption-indicator-small--${disruptedClass}` : ''
      } ${className}`}
    >
      <Icon iconName={iconLeft} iconClass="wmnds-disruption-indicator-small__icon" />
      <Icon
        iconName={`general-${iconRightName}`}
        iconClass="wmnds-disruption-indicator-small__icon"
      />
    </span>
  );
}

// Set props
DisruptionIndicatorSmall.propTypes = {
  className: PropTypes.string,
  iconLeft: PropTypes.string.isRequired,
  severity: PropTypes.string,
};

export default DisruptionIndicatorSmall;
