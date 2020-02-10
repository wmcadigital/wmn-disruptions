import React, { useContext } from 'react';
import { AutoCompleteContext } from 'globalState';

// Import components
import DisruptionIndicatorMedium from 'components/shared/DisruptionIndicator/DisruptionIndicatorMedium';

const BusAutoCompleteResult = props => {
  const { result } = props || {};

  const [, autoCompleteDispatch] = useContext(AutoCompleteContext);

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
      onKeyDown={() =>
        autoCompleteDispatch({
          type: 'UPDATE_ID',
          id: result.id
        })
      }
      onClick={() =>
        autoCompleteDispatch({
          type: 'UPDATE_ID',
          id: result.id
        })
      }
    >
      <div className="wmnds-col-auto">
        <DisruptionIndicatorMedium
          severity={result.disruptionSeverity}
          text={result.serviceNumber}
        />
      </div>
      {/* Right section */}
      <div className="wmnds-col-1-2 wmnds-col-sm-1-2">
        <strong>{result.routes[0].routeName}</strong>
        {/* <br />
        and return journey */}
      </div>
    </li>
  );
};

export default BusAutoCompleteResult;
