import { React } from 'react';
import Icon from 'components/shared/Icon/Icon';
// Import styles
import styles from './DisruptionLinesGrouping.module.scss';

const DisruptionLinesGrouping = (disruptionServicesAffected) => {
  const servicesAffected = disruptionServicesAffected.disruptionServicesAffected.map(
    (affected) => affected
  );
  let iconRightName;
  let disruptedClass;

  switch (disruptionServicesAffected.severity) {
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
    // Severe disruption (veryHigh)
    case 'severe':
      iconRightName = 'warning-triangle';
      disruptedClass = 'severe';
      break;
    case 'purple':
      iconRightName = '';
      disruptedClass = 'purple';
      break;
    // Minor disruption (normal)
    default:
      iconRightName = 'success';
      disruptedClass = 'success';
      break;
  }

  const noMarginOnIcon = false;
  const narrow = true;
  const servicesAff = Object.values(servicesAffected);
  const iconLeft = disruptionServicesAffected.mode;
  const groupedLineList = servicesAff.reduce((accumulator, operator) => {
    operator.routeDescriptions.forEach((r) => {
      // if the route has not been added to the dictionary yet then add a new entry for it, intialise it to be an empty array
      if (!accumulator[r.description]) {
        accumulator[r.description] = [];
      }
      // add the operator name to the route
      accumulator[r.description].push(operator.operatorName);
    });
    return accumulator;
  }, {});

  let key = 0;
  return Object.keys(groupedLineList).map((route) => {
    key += 1; // Increment the key variable before returning the JSX element
    return (
      <div
        key={key}
        className={`
      wmnds-disruption-indicator-medium
      ${disruptedClass ? `wmnds-disruption-indicator-medium--${disruptedClass}` : ''}        
      ${styles.affectedRoute}
      wmnds-disruption-indicator-medium--with-icon`}
      >
        {route}
        <Icon
          key={key}
          iconName={`general-${iconRightName}`}
          iconClass={`wmnds-disruption-indicator-medium__icon ${
            noMarginOnIcon ? '' : 'wmnds-disruption-indicator-medium__icon--right'
          }
      ${!iconLeft && narrow ? 'wmnds-m-l-xl' : ''}`}
        />
      </div>
    );
  });
};
export default DisruptionLinesGrouping;
