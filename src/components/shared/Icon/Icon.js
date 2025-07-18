/* eslint-disable react/prop-types */
import React from 'react';

// Use default parameter for iconClass
function Icon({ iconClass = null, iconName }) {
  return (
    <svg className={iconClass}>
      <use xlinkHref={`#wmnds-${iconName}`} href={`#wmnds-${iconName}`} />
    </svg>
  );
}

export default Icon;
