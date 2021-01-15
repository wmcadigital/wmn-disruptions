import React, { useContext } from 'react';
import { AutoCompleteContext } from 'globalState';
import FavBtn from 'components/shared/FavBtn/FavBtn';

const BusInfoAboutSelectedService = () => {
  const [autoCompleteState] = useContext(AutoCompleteContext);
  const { selectedItem } = autoCompleteState;

  // Make any letters in the service name uppercase
  const service = selectedItem.serviceNumber.toUpperCase();

  return (
    <>
      <p>
        Press star icon to save service <strong>{service}</strong> to your favourites
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
};

export default BusInfoAboutSelectedService;
