import React, { useContext } from 'react';

// Import contexts
import { ModeContext } from '../../../globalState/ModeContext';

// Import Providers
import { AutoCompleteProvider } from '../../../globalState/AutoCompleteContext';

// Import components
import BusAutoComplete from './Bus/BusAutoComplete';

const AutoComplete = () => {
  const [modeState] = useContext(ModeContext); // Get the state of modeButtons from modeContext

  // Do a switch on the mode, then return the component related to that
  const autoCompleteToShow = () => {
    // This is used as a template html for the title of the autocomplete box. It changes depending on the mode
    const autoCompleteTitle = text => {
      return (
        <div className="wmnds-col-1">
          <h4>{text}</h4>
        </div>
      );
    };

    switch (modeState.mode) {
      case 'bus':
        return (
          <>
            {autoCompleteTitle('Search for a service')}
            <BusAutoComplete />
          </>
        );

      default:
        return null;
    }
  };

  // Render the correct component based on logic in switch statement above
  return <AutoCompleteProvider>{autoCompleteToShow()}</AutoCompleteProvider>;
};

export default AutoComplete;
