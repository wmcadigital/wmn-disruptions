import React, { useContext } from 'react';
import { FetchDisruptionsContext, AutoCompleteContext } from 'globalState';
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
  // The below will check all disruptions and will return any disruption where the mode is bus and the id the user clicked in the autocomplete is within the servicesAffected array
  const selectedData = useFilterLogic();

  return (
    <>
      {/* If ann item has been selected that is not by the map then show selected services that you can fav and also show save message box. selectedItem.severity is used as the if statement to ensure all other data has been mapped to the state, using the id would cause an error as this can be gotten from the URL */}
      {autoCompleteState.selectedItem.severity && !autoCompleteState.selectedItem.selectedByMap && (
        <>
          <hr className="wmnds-col-1" />
          <SaveRoutesMessage />
          <InfoAboutSelectedService />
        </>
      )}
      {/* If no selectedData then it must be good service */}
      {!selectedData.length && <Message />}
      {/* If there are selectedData then there must be disruptions, loop through */}
      {selectedData.length > 0 &&
        fetchDisruptionsState.isMapVisible &&
        selectedData.map((disruption) => (
          <DisruptedService disruption={disruption} key={disruption.id} />
        ))}
    </>
  );
};

export default SelectedService;
