import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
// Import contexts
import { FavsContext } from 'globalState';

import DisruptionIndicatorMedium from 'components/shared/DisruptionIndicator/DisruptionIndicatorMedium';
import Icon from 'components/shared/Icon/Icon';

import s from './FavBusButton.module.scss';

const FavBusButton = ({ id, severity, text, title }) => {
  const [favState, favDispatch] = useContext(FavsContext);
  const [isFav, setIsFav] = useState(favState.bus.includes(id));

  useEffect(() => {
    setIsFav(favState.bus.includes(id));
  }, [favState.bus, id, isFav]);

  const toggleFav = () => {
    setIsFav(!isFav);

    if (isFav) {
      // Remove favourite
      favDispatch({ type: 'REMOVE_FAV', id });
    } else {
      // Add favourite
      favDispatch({ type: 'ADD_FAV', id });
    }
  };

  return (
    <div className={`${s.favButton} wmnds-m-b-md`} key={id}>
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
  title: PropTypes.string
};

FavBusButton.defaultProps = {
  id: null,
  title: null
};

export default FavBusButton;
