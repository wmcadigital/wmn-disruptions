import React, { useContext } from 'react';
import { AutoCompleteContext } from 'globalState';
// Import components

const RoadsAutocompleteResult = (props) => {
  const { result, radius, handleKeyDown } = props || {};
  const [, autoCompleteDispatch] = useContext(AutoCompleteContext);

  const updateSelectedService = () => {
    autoCompleteDispatch({
      type: 'UPDATE_SELECTED_LOCATION',
      payload: {
        address: result.address,
        lat: result.location.y,
        lon: result.location.x,
        radius,
      },
    });
  };

  // Return service with the above disruption logic, replace type and iconName with correc icon and class depending on disruption type
  return (
    <li
      className="wmnds-autocomplete-suggestions__li wmnds-grid"
      title={result.address}
      tabIndex="0"
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
      role="button"
      aria-pressed="false"
      onKeyDown={(e) => handleKeyDown(e)}
      onClick={() => updateSelectedService()}
    >
      {/* Right section */}
      <strong className="wmnds-col-auto">{result.address}</strong>
    </li>
  );
};

export default RoadsAutocompleteResult;
