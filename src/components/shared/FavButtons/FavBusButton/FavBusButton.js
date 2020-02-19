import React, { useState } from 'react';
import PropTypes from 'prop-types';

import DisruptionIndicatorMedium from 'components/shared/DisruptionIndicator/DisruptionIndicatorMedium';
import Icon from 'components/shared/Icon/Icon';

import s from './FavBusButton.module.scss';

const FavBusButton = ({ key, severity, text, title }) => {
  const [isFav, setIsFav] = useState(false);
  return (
    <div className={`${s.favButton} wmnds-m-b-md`} key={key}>
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
        onClick={() => setIsFav(!isFav)}
      >
        <Icon iconName={isFav ? 'general-star' : 'general-star-empty'} iconClass={s.starIcon} />
      </button>
    </div>
  );
};

// Set props
FavBusButton.propTypes = {
  key: PropTypes.string, // button type, by default it is type="button"
  severity: PropTypes.string.isRequired, // severity of disruption
  text: PropTypes.string.isRequired, // text inside button
  title: PropTypes.string
};

FavBusButton.defaultProps = {
  key: null,
  title: null
};

export default FavBusButton;
