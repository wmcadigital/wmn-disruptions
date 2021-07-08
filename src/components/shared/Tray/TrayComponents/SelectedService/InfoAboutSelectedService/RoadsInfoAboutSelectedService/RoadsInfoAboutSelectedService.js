import React, { useContext } from 'react';
import { AutoCompleteContext } from 'globalState';
import FavBtn from 'components/shared/FavBtn/FavBtn';

const RoadsInfoAboutSelectedService = () => {
  const [autoCompleteState] = useContext(AutoCompleteContext);
  const { selectedLocation, selectedItem } = autoCompleteState;
  const { address, radius, lat, lon } = selectedLocation;
  // address/lat/lon/radius (may be saved as a cookie so can't be separated using ; or =)
  const encodedId = `${encodeURI(address)}/${lat}/${lon}/${radius}`;
  const milesText = `mile${radius > 1 ? 's' : ''}`;
  const title = `${address} + ${radius} ${milesText}`;

  return (
    <>
      <div>
        <span>
          Select the star icon to add your chosen road area to the homepage <strong>{title}</strong>
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
