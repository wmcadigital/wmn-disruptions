import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/shared/Icon/Icon';

const DisruptionIndicatorMedium = ({ className, iconLeft, narrow, severity, text }) => {
  let iconRightName;
  let disruptedClass;
  // Removed the if statement - Icon now showing.
  // Do a switch on the disruption severity, then map the type and iconRightName to the correct vars
  switch (severity) {
    case 'normal':
      iconRightName = 'warning-circle';
      disruptedClass = 'warning';
      break;
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
      iconRightName = 'success';
      disruptedClass = 'success';
      break;
  }

  return (
    <div
      className={`
        wmnds-disruption-indicator-medium
        ${disruptedClass ? `wmnds-disruption-indicator-medium--${disruptedClass}` : ''}
        ${className} ${narrow ? 'wmnds-disruption-indicator-medium--narrow' : ''}
        wmnds-disruption-indicator-medium--with-icon`}
    >
      {/* If iconLeft, show icon left */}
      {iconLeft && (
        <Icon
          iconName={iconLeft}
          iconClass="wmnds-disruption-indicator-medium__icon wmnds-disruption-indicator-medium__icon--left"
        />
      )}
      {text}
      <Icon
        iconName={`general-${iconRightName}`}
        iconClass={`wmnds-disruption-indicator-medium__icon wmnds-disruption-indicator-medium__icon--right ${
          !iconLeft && narrow ? 'wmnds-m-l-xl' : ''
        }`}
      />
    </div>
  );
};

// Set props
DisruptionIndicatorMedium.propTypes = {
  className: PropTypes.string,
  iconLeft: PropTypes.string,
  narrow: PropTypes.bool,
  severity: PropTypes.string,
  text: PropTypes.string
};

DisruptionIndicatorMedium.defaultProps = {
  className: '',
  iconLeft: null,
  narrow: false,
  severity: '',
  text: null
};

export default DisruptionIndicatorMedium;
