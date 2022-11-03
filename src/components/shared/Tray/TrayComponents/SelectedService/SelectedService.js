import React from 'react';
// Import customHooks
import useShowSelectedServicesInfo from './customHooks/useShowSelectedServiceInfo';
// Imported components
import DisruptedService from './DisruptedService/DisruptedService';
import InfoAboutSelectedService from './InfoAboutSelectedService/InfoAboutSelectedService';
import SaveRoutesMessage from './SaveRoutesMessage/SaveRoutesMessage';
import NoKnownDisruptionMessage from './NoKnownDisruptionMessage/NoKnownDisruptionMessage';

const SelectedService = () => {
  const {
    showInfoAboutSelectedService,
    showServiceMessage,
    showDisruptedServices,
    showLineBreak,
    disruptedServices,
  } = useShowSelectedServicesInfo();

  return (
    <>
      {/* If ann item has been selected that is not by the map then show selected services that you can fav and also show save message box. selectedItem.severity is used as the if statement to ensure all other data has been mapped to the state, using the id would cause an error as this can be gotten from the URL */}
      {showLineBreak && <hr className="wmnds-col-1" />}
      {showInfoAboutSelectedService && (
        <>
          <SaveRoutesMessage />
          <InfoAboutSelectedService />
        </>
      )}
      {/* If no selectedData then it must be good service */}
      {showServiceMessage && <NoKnownDisruptionMessage />}
      {/* If there are selectedData then there must be disruptions, loop through */}
      {showDisruptedServices &&
        disruptedServices.map((disruption) => (
          <DisruptedService disruption={disruption} key={disruption.id} />
        ))}
    </>
  );
};

export default SelectedService;
