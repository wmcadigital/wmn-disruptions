import React, { useContext } from 'react';

// Import contexts
import { ModeContext } from '../Mode/ModeContext';
// Import components
import BusAutoComplete from './Bus/BusAutoComplete';

const AutoComplete = () => {
  const [modeState] = useContext(ModeContext); // Get the state of modeButtons from modeContext

  // Do a switch on the mode, then return the component related to that
  const autoCompleteToShow = () => {
    switch (modeState.mode) {
      case 'bus':
        return <BusAutoComplete />;

      default:
        return null;
    }
  };

  // Render the correct component based on logic in switch statement above
  return <>{autoCompleteToShow()}</>;
};

export default AutoComplete;
