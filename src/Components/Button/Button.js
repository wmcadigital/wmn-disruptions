// Import packages
import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';

const Button = ({ type, isActive, children, onClick, btnClass, iconLeft, iconRight }) => {
  return (
    // eslint-disable-next-line react/button-has-type
    <button
      type={type}
      className={`wmnds-btn ${btnClass} ${isActive ? 'wmnds-is--active' : null}`}
      tabIndex="0"
      onClick={e => onClick(e)}
    >
      {iconLeft ? <Icon iconClass="wmnds-btn__icon" iconName={iconLeft} /> : null}

      {children}

      {iconRight ? <Icon iconClass="wmnds-btn__icon wmnds-btn__icon--right" iconName={iconRight} /> : null}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  type: PropTypes.string,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
  btnClass: PropTypes.string,
  iconLeft: PropTypes.string,
  iconRight: PropTypes.string
};

Button.defaultProps = {
  children: '',
  type: 'button',
  onClick: () => {},
  isActive: false,
  btnClass: '',
  iconLeft: null,
  iconRight: null
};

export default Button;
