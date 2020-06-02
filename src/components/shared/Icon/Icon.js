import React from 'react';
import PropTypes from 'prop-types';

// Due to weird Protocol errors with external SVGs the svg use doesn't work well with production builds
// So we Ajax the SVG in with a snippet at the bottom of public/index.html

const Icon = ({ iconClass, iconName }) => {
  return (
    <svg className={iconClass}>
      <use xlinkHref={`#wmnds-${iconName}`} href={`#wmnds-${iconName}`} />
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
