import React, { useContext } from 'react';
import { AutoCompleteContext } from 'globalState';
// Import components

const RoadsAutocompleteResult = (props) => {
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
        id: result.address,
        location: result.location,
        address: result.address,
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
