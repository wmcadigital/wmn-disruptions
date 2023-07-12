import React, { useContext } from 'react';
import { AutoCompleteContext } from 'globalState';
import FavBtn from 'components/shared/FavBtn/FavBtn';

function BusInfoAboutSelectedService() {
  const [autoCompleteState] = useContext(AutoCompleteContext);
  const { selectedItem } = autoCompleteState;

  // Make any letters in the service name uppercase
  const service = selectedItem.serviceNumber.toUpperCase();

  return (
    <>
      <p>
        Select the star icon to add service <strong>{service}</strong> to the homepage
      </p>

      <FavBtn
        id={selectedItem.id}
        text={service}
        title={`${selectedItem.routeName} (${selectedItem.operator})`}
        mode="bus"
        narrow
      />
    </>
  );
}

export default BusInfoAboutSelectedService;
