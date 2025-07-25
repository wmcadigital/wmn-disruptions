import React, { useContext } from 'react';
// Import contexts
import { ModeContext, WhenContext } from 'globalState';
// Import components
import BusAutoComplete from './BusAutocomplete/BusAutoComplete';
import TramAutoComplete from './TramAutoComplete/TramAutoComplete';
import TrainAutoComplete from './TrainAutoComplete/TrainAutocomplete';
import RoadsAutoComplete from './RoadsAutocomplete/RoadsAutocomplete';

function AutoComplete() {
  const [modeState] = useContext(ModeContext); // Get the state of modeButtons from modeContext
  const [whenState] = useContext(WhenContext);

  // Do a switch on the mode, then return the component related to that
  const autoCompleteToShow = () => {
    // This is used as a template html for the title of the autocomplete box. It changes depending on the mode
    const autoCompleteTitle = (title, subtitle = '') => {
      return (
        <div className="wmnds-col-1">
          <h2 className="wmnds-h4">{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
      );
    };

    switch (modeState.mode) {
      case 'bus':
        return (
          <>
            {autoCompleteTitle('Search for a bus service', 'For example, X8 or 101')}
            <BusAutoComplete />
          </>
        );

      case 'train':
        return (
          whenState.when === 'now' && (
            <>
              {autoCompleteTitle('Trains between')}
              <TrainAutoComplete />
              {autoCompleteTitle('and')}
              <TrainAutoComplete to />
            </>
          )
        );

      case 'tram':
        return (
          <>
            {autoCompleteTitle('Stops between')}
            <TramAutoComplete />
            {autoCompleteTitle('and')}
            <TramAutoComplete to />
          </>
        );

      case 'roads':
        return (
          <>
            {autoCompleteTitle('Enter a location', 'A postcode, road name or place of interest')}
            <RoadsAutoComplete />
          </>
        );

      default:
        return null;
    }
  };

  // Render the correct component based on logic in switch statement above
  return <div className="wmnds-grid">{autoCompleteToShow()} </div>;
}

export default AutoComplete;
