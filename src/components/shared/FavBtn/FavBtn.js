import React, { useState, useContext, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
// Import contexts
import { FavsContext } from 'globalState';
// Import Components
import DisruptionIndicatorMedium from 'components/shared/DisruptionIndicator/DisruptionIndicatorMedium';
import Icon from 'components/shared/Icon/Icon';
// Styles
import s from './FavBtn.module.scss';

const FavBtn = ({ id, severity, text, title, mode, narrow, inline }) => {
  const [favState, favDispatch] = useContext(FavsContext); // Get fav state from globalState

  const isIdFavourited = useCallback(
    (favId) => {
      if (!favState.favs[mode].length) return false;
      if (mode === 'bus' || mode === 'tram') return favState.favs[mode].indexOf(favId) > -1;

      if (mode === 'roads') {
        return favState.favs[mode].some((roadsFave) => {
          const addressMatch = roadsFave.address === id.address;
          const latMatch = roadsFave.lat === id.lat;
          const lonMatch = roadsFave.lon === id.lon;
          const radiusMatch = roadsFave.radius === id.radius;
          return addressMatch && latMatch && lonMatch && radiusMatch;
        });
      }

      return favState.favs[mode].some(
        (trainFav) =>
          trainFav.to === favId.to && trainFav.from === favId.from && trainFav.line === favId.line
      );
    },
    [favState.favs, id.address, id.lat, id.lon, id.radius, mode]
  );

  const [isFav, setIsFav] = useState(isIdFavourited(id)); // Check favs on load to see if ours is included

  // UseEffect to watch for changes of favState, then we can reload component with new favourites
  useEffect(() => {
    setIsFav(isIdFavourited(id)); // Check reloaded favs to see if our id is included in there
  }, [id, isIdFavourited]);

  const toggleFav = () => {
    setIsFav((prevState) => !prevState); // Toggle the fav state

    if (isFav) {
      favDispatch({ type: 'REMOVE_FAV', id, mode }); // Remove favourite from globalState/localStorage
    } else {
      favDispatch({ type: 'ADD_FAV', id, mode }); // Add favourite to globalState/localStorage
    }
  };

  return (
    <div
      className={`${s.favButton} ${narrow ? s.favButtonNarrow : ''} ${
        inline ? s.favButtonInline : ''
      } wmnds-m-b-md`}
    >
      {/* Services Affected */}
      {mode !== 'roads' && (
        <DisruptionIndicatorMedium
          text={text}
          severity={severity}
          className={`wmnds-p-t-xs wmnds-p-b-xs wmnds-p-l-xsm wmnds-p-r-xsm wmnds-disruption-indicator-medium--${mode}`}
          title={title}
        />
      )}

      {/* Faved Routed to be saved to local storage */}
      <button
        type="button"
        className={`${s.starIconBtn}`}
        title={isFav ? `Remove ${title} from favourites` : `Favourite the ${title}`}
        onClick={toggleFav}
      >
        <Icon iconName={isFav ? 'general-star' : 'general-star-empty'} iconClass={s.starIcon} />
      </button>
    </div>
  );
};

// Set props
FavBtn.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      to: PropTypes.string,
      from: PropTypes.string,
      line: PropTypes.string.isRequired,
    }),
  ]), // button type, by default it is type="button"
  mode: PropTypes.string, // Mode type
  narrow: PropTypes.bool,
  inline: PropTypes.bool,
  severity: PropTypes.string, // severity of disruption
  text: PropTypes.string.isRequired, // text inside button
  title: PropTypes.string,
};

FavBtn.defaultProps = {
  id: null,
  mode: 'bus',
  narrow: false,
  inline: false,
  severity: 'purple',
  title: null,
};

export default FavBtn;
