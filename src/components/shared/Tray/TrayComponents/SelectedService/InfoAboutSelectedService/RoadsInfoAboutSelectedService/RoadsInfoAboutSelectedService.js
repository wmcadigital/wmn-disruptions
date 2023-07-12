import React, { useContext } from 'react';
import { AutoCompleteContext } from 'globalState';
import FavBtn from 'components/shared/FavBtn/FavBtn';

function RoadsInfoAboutSelectedService() {
  const [autoCompleteState] = useContext(AutoCompleteContext);
  const { selectedLocation, selectedItem } = autoCompleteState;
  const { address, radius } = selectedLocation;
  const milesText = `mile${radius > 1 ? 's' : ''}`;
  const title = `${address} + ${radius} ${milesText}`;

  return (
    <>
      <div>
        <span>
          Select the star icon to add your chosen road area to the homepage <strong>{title}</strong>
        </span>
        <FavBtn id={selectedLocation} text="" title={title} mode="roads" inline />
      </div>
      {!selectedItem.selectedByMap && (
        <div className="wmnds-m-t-sm">
          <hr className="wmnds-col-1" />
        </div>
      )}
    </>
  );
}

export default RoadsInfoAboutSelectedService;
