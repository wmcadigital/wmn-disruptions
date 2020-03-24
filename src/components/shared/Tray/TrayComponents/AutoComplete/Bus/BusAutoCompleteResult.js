import React, { useContext } from 'react';
import { AutoCompleteContext } from 'globalState';
// Import components
import DisruptionIndicatorMedium from 'components/shared/DisruptionIndicator/DisruptionIndicatorMedium';
// Import styles
import s from './BusAutoCompleteResult.module.scss';

const BusAutoCompleteResult = (props) => {
  const { result } = props || {};

  const [autoCompleteState, autoCompleteDispatch] = useContext(AutoCompleteContext);

  const updateSelectedService = () => {
    // Reset selected disruption ID from map (if any)
    if (autoCompleteState.selectedMapDisruption) {
      autoCompleteDispatch({ type: 'RESET_SELECTED_SERVICE' });
    }

    autoCompleteDispatch({
      type: 'UPDATE_SELECTED_SERVICE',
      selectedService: {
        id: result.id,
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
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex="0"
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
      role="button"
      aria-pressed="false"
      onKeyDown={() => updateSelectedService()}
      onClick={() => updateSelectedService()}
    >
      <div className="wmnds-col-auto">
        <DisruptionIndicatorMedium
          severity={result.disruptionSeverity}
          text={result.serviceNumber}
        />
      </div>
      {/* Right section */}
      <strong className={`${s.routeName} wmnds-col-auto`}>{result.routes[0].routeName}</strong>
      {/* <br />
        and return journey */}
    </li>
  );
};

export default BusAutoCompleteResult;
