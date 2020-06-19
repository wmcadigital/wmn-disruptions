import { useContext } from 'react';
// Import contexts
import { AutoCompleteContext, WhenContext, ModeContext } from 'globalState';

const useResetState = (type) => {
  const [whenState, whenDispatch] = useContext(WhenContext); // Get the state of whenButtons from WhenContext
  const [modeState, modeDispatch] = useContext(ModeContext); // Get the state of modeButtons from modeContext
  const [autoCompleteState, autoCompleteDispatch] = useContext(AutoCompleteContext); // Get the state of autoComplete from AutoCompleteContext

  const reset = () => {
    // Reset selected disruption ID from map (if any)
    if (autoCompleteState.selectedMapDisruption || autoCompleteState.query) {
      autoCompleteDispatch({ type: 'RESET_SELECTED_SERVICE' });
    }
  };

  const updateWhen = (when, date) => {
    if (when === 'customDate') {
      whenDispatch({ type: 'UPDATE_CUSTOMDATE', date });
    } else {
      // Update the when context to selected when
      whenDispatch({ type: 'UPDATE_WHEN', when });
    }

    if (modeState.mode) {
      modeDispatch({ type: 'RESET' });
    }
  };

  const updateMode = (mode) => {
    // Update the mode context to selected mode
    modeDispatch({
      type: 'UPDATE_MODE',
      mode,
    });

    reset();
  };

  return { reset, updateWhen, updateMode, modeState };
};

export default useResetState;
