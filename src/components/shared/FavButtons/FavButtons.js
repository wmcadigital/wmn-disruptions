import React from 'react';
import PropTypes from 'prop-types';

import DisruptionIndicatorMedium from 'components/shared/DisruptionIndicator/DisruptionIndicatorMedium';
import Icon from 'components/shared/Icon/Icon';

const FavButtons = ({ key, text, severity }) => {
  return (
    <div key={key}>
      {/* Services Affected */}
      <DisruptionIndicatorMedium narrow text={text} severity={severity} />

      {/* Faved Routed to be saved to local storage */}
      <div className="wmnds-m-t-md wmnds-p-l-lg wmnds-m-b-lg ">
        <svg className="favStar ">
          <Icon iconName="general-star" iconClass="disruption-indicator-small__icon" />
        </svg>
      </div>
    </div>
  );
};

// Set props
FavButtons.propTypes = {
  text: PropTypes.string.isRequired, // text inside button
  key: PropTypes.string, // button type, by default it is type="button"
  severity: PropTypes.string.isRequired // severity of disruption
};

FavButtons.defaultProps = {
  key: null
};

export default FavButtons;
