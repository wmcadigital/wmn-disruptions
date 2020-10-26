import React, { useContext } from 'react';
import { AutoCompleteContext } from 'globalState';
// Import components
import DisruptionIndicatorMedium from 'components/shared/DisruptionIndicator/DisruptionIndicatorMedium';
// Import styles
import s from './BusAutoCompleteResult.module.scss';

const BusAutoCompleteResult = (props) => {
  const { result, handleKeyDown } = props || {};

  const [autoCompleteState, autoCompleteDispatch] = useContext(AutoCompleteContext);

  const updateSelectedService = () => {
    // Reset selected disruption ID from map (if any)
    if (autoCompleteState.selectedItem.selectedByMap) {
      autoCompleteDispatch({ type: 'RESET_SELECTED_SERVICES' });
    }

    autoCompleteDispatch({
      type: 'UDPATE_SELECTED_ITEM',
      payload: {
        id: result.id,
        operator: result.routes[0].operatorCode,
        severity: result.disruptionSeverity,
        serviceNumber: result.serviceNumber,
        routeName: result.routes[0].routeName,
      },
    });
  };

  // Set placeholder vars for switch below
  let text;
  // If the current service has disruption
  if (result.hasDisruptions) {
    // Do a switch on the disruption severity, then map the type and iconName to the correct vars
    switch (result.disruptionSeverity) {
      // Minor disruption (normal)
      case 'normal':
        text = 'Minor disruption';
        break;
      // Major disruption (high)
      case 'high':
        text = 'Major disruption';
        break;
      // Severe disruption (veryHigh)
      case 'veryHigh':
        text = 'Severe disruption';
        break;
      // Good service (low)
      default:
        text = 'Good service';
        break;
    }
  } else {
    // No disruptions, so show success
    text = 'Good service';
  }

  // Return service with the above disruption logic, replace type and iconName with correc icon and class depending on disruption type
  return (
    <li
      className="wmnds-autocomplete-suggestions__li wmnds-grid"
      title={`${text} on ${result.serviceNumber}`}
      tabIndex="0"
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
      role="button"
      aria-pressed="false"
      onKeyDown={(e) => handleKeyDown(e)}
      onClick={() => updateSelectedService()}
    >
      <DisruptionIndicatorMedium
        className="wmnds-col-auto"
        severity={result.disruptionSeverity}
        text={result.serviceNumber}
      />
      {/* Right section */}
      <strong className={`wmnds-col-auto ${s.routeName}`}>{result.routes[0].routeName}</strong>
    </li>
  );
};

export default BusAutoCompleteResult;
