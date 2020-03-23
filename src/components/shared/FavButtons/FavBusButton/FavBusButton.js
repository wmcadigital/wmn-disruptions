import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
// Import contexts
import { FavsContext } from 'globalState';
// Import Components
import DisruptionIndicatorMedium from 'components/shared/DisruptionIndicator/DisruptionIndicatorMedium';
import Icon from 'components/shared/Icon/Icon';

import s from './FavBusButton.module.scss';

const FavBusButton = ({ id, severity, text, title }) => {
  const [favState, favDispatch] = useContext(FavsContext); // Get fav state from globalState
  const [isFav, setIsFav] = useState(favState.bus.includes(id)); // Check favs on load to see if ours is included

  // UseEffect to watch for changes of favState, then we can reload component with new favourites
  useEffect(() => {
    setIsFav(favState.bus.includes(id)); // Check reloaded favs to see if our id is included in there
  }, [favState.bus, id, isFav]);

  const toggleFav = () => {
    setIsFav(!isFav); // Toggle the fav state

    if (isFav) {
      favDispatch({ type: 'REMOVE_FAV', id }); // Remove favourite from globalState/localStorage
    } else {
      favDispatch({ type: 'ADD_FAV', id }); // Add favourite to globalState/localStorage
    }
  };

  return (
    <div className={`${s.favButton} wmnds-m-b-md`}>
      {/* Services Affected */}
      <DisruptionIndicatorMedium
        text={text}
        severity={severity}
        className="wmnds-p-t-xs wmnds-p-b-xs wmnds-p-l-xsm wmnds-p-r-xsm"
        title={title}
      />

      {/* Faved Routed to be saved to local storage */}
      <button
        type="button"
        className={s.starIconBtn}
        title={isFav ? `Remove ${title} from favourites` : `Favourite the ${title}`}
        onClick={toggleFav}
      >
        <Icon iconName={isFav ? 'general-star' : 'general-star-empty'} iconClass={s.starIcon} />
      </button>
    </div>
  );
};

// Set props
FavBusButton.propTypes = {
  id: PropTypes.string, // button type, by default it is type="button"
  severity: PropTypes.string.isRequired, // severity of disruption
  text: PropTypes.string.isRequired, // text inside button
  title: PropTypes.string,
};

FavBusButton.defaultProps = {
  id: null,
  title: null,
};

export default FavBusButton;
