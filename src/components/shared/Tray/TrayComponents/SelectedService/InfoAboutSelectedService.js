import React, { useContext } from 'react';
import { AutoCompleteContext, ModeContext } from 'globalState';
import FavBusButton from 'components/shared/FavButtons/FavBusButton/FavBusButton';

const InfoAboutSelectedService = () => {
  const [autoCompleteState] = useContext(AutoCompleteContext);
  const [modeState] = useContext(ModeContext);

  const { selectedItem, selectedItemTo } = autoCompleteState;

  return (
    <div className="wmnds-col-1 wmnds-p-t-md">
      <hr />
      <p>
        Press star icon to save service <strong>{selectedItem.serviceNumber.toUpperCase()}</strong>{' '}
        to your favourites
      </p>

      <FavBusButton
        id={selectedItem.id}
        severity={selectedItem.severity}
        text={selectedItem.serviceNumber}
        title={`${selectedItem.routeName} (${selectedItem.operator})`}
        mode={modeState.mode}
        narrow
      />
    </div>
  );
};

export default InfoAboutSelectedService;
