import React, { useContext } from 'react';
import { AutoCompleteContext } from 'globalState';
// Import components
import DisruptionIndicatorMedium from 'components/shared/DisruptionIndicator/DisruptionIndicatorMedium';
// Import styles
import s from './TramAutoCompleteResult.module.scss';

function TramAutoCompleteResult(props) {
  const { result, handleKeyDown, to } = props || {};

  const [autoCompleteState, autoCompleteDispatch] = useContext(AutoCompleteContext);

  const updateSelectedService = () => {
    // Reset selected disruption ID from map (if any)
    if (autoCompleteState.selectedItem.selectedByMap) {
      autoCompleteDispatch({ type: 'RESET_SELECTED_SERVICES' });
    }
    autoCompleteDispatch({
      type: 'UDPATE_SELECTED_ITEM',
      payload: {
        id: result?.naPTAN,
        severity: result?.disruptionSeverity || 'success',
        stopName: result.name,
        operator: 'MML1',
        lines: [],
        naPTAN: result.naPTAN,
        to,
      },
    });
  };

  // Set placeholder vars for switch below
  let text;
  // If the current service has disruption
  if (result.hasDisruptions) {
    // Do a switch on the disruption severity, then map the type and iconName to the correct vars
    switch (result?.disruptionSeverity) {
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
      title={`${text} on ${result.name} stop`}
      tabIndex="0"
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
      role="button"
      aria-pressed="false"
      onKeyDown={(e) => handleKeyDown(e)}
      onClick={() => updateSelectedService()}
    >
      <DisruptionIndicatorMedium
        className="wmnds-col-auto"
        severity={result?.disruptionSeverity || 'success'}
        noMarginOnIcon
      />
      {/* Right section */}
      <strong className={`wmnds-col-auto ${s.routeName}`}>{result.name}</strong>
    </li>
  );
}

export default TramAutoCompleteResult;
