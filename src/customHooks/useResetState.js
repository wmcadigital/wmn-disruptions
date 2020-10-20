import { useContext } from 'react';
// Import contexts
import { AutoCompleteContext, WhenContext, ModeContext } from 'globalState';

const useResetState = () => {
  const [whenState, whenDispatch] = useContext(WhenContext); // Get the state of whenButtons from WhenContext
  const [modeState, modeDispatch] = useContext(ModeContext); // Get the state of modeButtons from modeContext
  const [autoCompleteState, autoCompleteDispatch] = useContext(AutoCompleteContext); // Get the state of autoComplete from AutoCompleteContext

  // Function for checking and resetting any selected service or query
  const resetQueryAndSelected = () => {
    // Reset selected disruption ID from map (if any)
    if (autoCompleteState.selectedItem.id || autoCompleteState.query) {
      autoCompleteDispatch({ type: 'RESET_SELECTED_SERVICE' });
    }
  };

  // Function used in when.js to update when state and reset any state "below" it in the tray
  const updateWhen = (when, date) => {
    if (when === 'customDate') {
      whenDispatch({ type: 'UPDATE_CUSTOMDATE', date });
    } else {
      // Update the when context to selected when
      whenDispatch({ type: 'UPDATE_WHEN', when });
    }
    // If a mode is selected/in state, reset it
    if (modeState.mode) {
      modeDispatch({ type: 'RESET' });
    }
    resetQueryAndSelected(); // Reset autocomplete/selectedService if in state
  };

  // Function used in mode.js to update mode state and reset any state "below" it in the tray
  const updateMode = (mode) => {
    // Update the mode context to selected mode
    modeDispatch({
      type: 'UPDATE_MODE',
      mode,
    });
    resetQueryAndSelected(); // Reset autocomplete/selectedService if in state
  };

  // Function used in busautocomplete.js to update busautocomplete state and reset any state "below" it in the tray
  const updateQuery = (query, to) => {
    if (to) {
      // resetQueryAndSelected(); // Reset autocomplete/selectedService if in state
      autoCompleteDispatch({ type: 'UPDATE_QUERY_TO', query }); // Update query to what user has typed
    } else {
      // resetQueryAndSelected(); // Reset autocomplete/selectedService if in state
      autoCompleteDispatch({ type: 'UPDATE_QUERY', query }); // Update query to what user has typed
    }
  };

  // Function which resets all the trays/applications state and sets "when" to equal "now"
  const resetTray = () => {
    updateWhen('now');
  };

  return {
    updateWhen,
    whenState,
    whenDispatch,
    updateMode,
    modeState,
    updateQuery,
    autoCompleteState,
    autoCompleteDispatch,
    resetTray,
  };
};

export default useResetState;
