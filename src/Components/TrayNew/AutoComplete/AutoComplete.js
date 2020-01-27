import React, { useContext } from 'react';

// Import contexts
import { ModeContext } from '../Mode/ModeContext';
// Import components
import BusAutoComplete from './Bus/BusAutoComplete';

const AutoComplete = () => {
  const [modeState] = useContext(ModeContext); // Get the state of modeButtons from modeContext

  const autoCompleteToShow = () => {
    switch (modeState.mode) {
      case 'bus':
        return <BusAutoComplete />;

      default:
        return null;
    }
  };

  return <div>{autoCompleteToShow()}</div>;
};

export default AutoComplete;
