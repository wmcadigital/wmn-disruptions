import React, { useState } from 'react';
import PropTypes from 'prop-types';

import DisruptionIndicatorMedium from 'components/shared/DisruptionIndicator/DisruptionIndicatorMedium';
import Icon from 'components/shared/Icon/Icon';

import s from './FavBusButton.module.scss';

const FavBusButton = ({ key, text, severity }) => {
  const [isFav, setIsFav] = useState(false);
  return (
    <div className={`${s.favButton} wmnds-m-b-md`} key={key}>
      {/* Services Affected */}
      <DisruptionIndicatorMedium
        text={text}
        severity={severity}
        className="wmnds-p-t-xs wmnds-p-b-xs wmnds-p-l-xsm wmnds-p-r-xsm"
      />

      {/* Faved Routed to be saved to local storage */}
      <button type="button" className={s.starIconBtn} onClick={() => setIsFav(!isFav)}>
        <Icon iconName={isFav ? 'general-star' : 'general-star-empty'} iconClass={s.starIcon} />
      </button>
    </div>
  );
};

// Set props
FavBusButton.propTypes = {
  text: PropTypes.string.isRequired, // text inside button
  key: PropTypes.string, // button type, by default it is type="button"
  severity: PropTypes.string.isRequired // severity of disruption
};

FavBusButton.defaultProps = {
  key: null
};

export default FavBusButton;
