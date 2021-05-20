import React, { useContext } from 'react';
import { AutoCompleteContext } from 'globalState';
import FavBtn from 'components/shared/FavBtn/FavBtn';

const RoadsInfoAboutSelectedService = () => {
  const [autoCompleteState] = useContext(AutoCompleteContext);
  const { selectedLocation, selectedItem } = autoCompleteState;
  const { address, radius, lat, lon } = selectedLocation;
  const encodedId = encodeURI(`${address};${lat};${lon};${radius}`); // use semi-colons to sepearate as 'address' field may contain commas
  const milesText = `mile${radius > 1 ? 's' : ''}`;
  const title = `${address} + ${radius} ${milesText}`;

  return (
    <>
      <div>
        <span>
          Press star icon to save selected road area to your favourites <strong>{title}</strong>
        </span>
        <FavBtn id={encodedId} text="" title={title} mode="roads" inline />
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
