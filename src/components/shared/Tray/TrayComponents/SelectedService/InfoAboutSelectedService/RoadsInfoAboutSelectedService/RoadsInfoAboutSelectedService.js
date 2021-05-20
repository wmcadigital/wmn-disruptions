import React, { useContext } from 'react';
import { AutoCompleteContext } from 'globalState';
import FavBtn from 'components/shared/FavBtn/FavBtn';

const RoadsInfoAboutSelectedService = () => {
  const [autoCompleteState] = useContext(AutoCompleteContext);
  const { selectedLocation, selectedItem } = autoCompleteState;
  const { address, radius, lat, lon } = selectedLocation;
  const encodedId = encodeURI(`${address};${lat};${lon};${radius}`); // use semi-colons to sepearate as 'address' field may contain commas

  return (
    <>
      <div className="wmnds-m-t-md">
        <span>
          Press star icon to save selected road area to your favourites{' '}
          <strong>{`${address} + ${radius} miles`}</strong>
        </span>
        <FavBtn id={encodedId} text="" title={`${address} + ${radius} miles`} mode="roads" inline />
      </div>
      {!selectedItem.selectedByMap && (
        <div className="wmnds-m-t-sm">
          <hr className="wmnds-col-1" />
        </div>
      )}
    </>
  );
};

export default RoadsInfoAboutSelectedService;
