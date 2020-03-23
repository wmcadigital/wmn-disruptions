import React from 'react';
import PropTypes from 'prop-types';
import svgSprite from 'assets/svgs/svg-sprite.min.svg';

const Icon = ({ iconClass, iconName }) => {
  return (
    <svg className={iconClass}>
      <use xlinkHref={`${svgSprite}#wmnds-${iconName}`} href={`${svgSprite}#wmnds-${iconName}`} />
    </svg>
  );
};

Icon.propTypes = {
  iconName: PropTypes.string.isRequired,
  iconClass: PropTypes.string,
};

Icon.defaultProps = {
  iconClass: null,
};

export default Icon;
