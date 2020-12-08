import React, { useContext } from 'react';
import { FetchDisruptionsContext, AutoCompleteContext, ModeContext } from 'globalState';
// Import customHooks
import useFilterLogic from 'customHooks/useFilterLogic';
// Imported components
import Message from 'components/shared/Message/Message';
import DisruptedService from './DisruptedService/DisruptedService';
import InfoAboutSelectedService from './InfoAboutSelectedService/InfoAboutSelectedService';
import SaveRoutesMessage from './SaveRoutesMessage/SaveRoutesMessage';

const SelectedService = () => {
  const [fetchDisruptionsState] = useContext(FetchDisruptionsContext);
  const [autoCompleteState] = useContext(AutoCompleteContext);
  const [modeState] = useContext(ModeContext);
  // The below will check all disruptions and will return any disruption where the mode is bus and the id the user clicked in the autocomplete is within the servicesAffected array
  const selectedData = useFilterLogic();

  // Variables used to toggle the display of each element
  const isModeSelected = Object.keys(modeState).length !== 0 && modeState.mode !== null;
  // Toggle display of SaveRoutesMessage and InfoAboutSelectedService
  const showSelectedServiceInfo =
    autoCompleteState.selectedItem.severity && !autoCompleteState.selectedItem.selectedByMap;

  // Toggle display of 'Good Service' message
  const showMessage = (() => {
    // If no mode has been selected or if there are disruptions on the map are  then don't show anything
    if (!isModeSelected || selectedData.length || !fetchDisruptionsState.isMapVisible) {
      return false;
    }

    return true;
  })();

  // Toggle display of filtered disrupted services
  const showDisruptedServices = (() => {
    if (!isModeSelected || selectedData.length < 1 || !fetchDisruptionsState.isMapVisible) {
      return false;
    }

    switch (modeState.mode) {
      case 'bus':
        return !!autoCompleteState.selectedItem.id;

      case 'train':
        return autoCompleteState.selectedItem.id && autoCompleteState.selectedItemTo.id;

      case 'tram':
        return autoCompleteState.selectedItem.id && autoCompleteState.selectedItemTo.id;

      default:
        return true;
    }
  })();

  return (
    <>
      {/* If ann item has been selected that is not by the map then show selected services that you can fav and also show save message box. selectedItem.severity is used as the if statement to ensure all other data has been mapped to the state, using the id would cause an error as this can be gotten from the URL */}
      {showSelectedServiceInfo && (
        <>
          <hr className="wmnds-col-1" />
          <SaveRoutesMessage />
          <InfoAboutSelectedService />
        </>
      )}
      {/* If no selectedData then it must be good service */}
      {showMessage && <Message />}
      {/* If there are selectedData then there must be disruptions, loop through */}
      {showDisruptedServices &&
        selectedData.map((disruption) => (
          <DisruptedService disruption={disruption} key={disruption.id} />
        ))}
    </>
  );
};

export default SelectedService;
