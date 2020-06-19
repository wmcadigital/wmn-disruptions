import { useContext } from 'react';
// Import contexts
import { AutoCompleteContext, WhenContext, ModeContext } from 'globalState';

const useResetState = (type) => {
  const [whenState, whenDispatch] = useContext(WhenContext); // Get the state of whenButtons from WhenContext
  const [modeState, modeDispatch] = useContext(ModeContext); // Get the state of modeButtons from modeContext
  const [autoCompleteState, autoCompleteDispatch] = useContext(AutoCompleteContext); // Get the state of autoComplete from AutoCompleteContext

  const reset = () => {
    if (modeState.mode && type === 'when') {
      modeDispatch({ type: 'RESET' });
    }

    // Reset selected disruption ID from map (if any)
    if (autoCompleteState.selectedMapDisruption) {
      autoCompleteDispatch({ type: 'RESET_SELECTED_SERVICE' });
    }
  };

  return { reset };
};

export default useResetState;
