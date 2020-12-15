// Import packages
import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';
import './Button.scss'; // Temp styling for displaying button as link

const Button = ({
  type,
  title,
  isActive,
  text,
  onClick,
  btnClass,
  iconLeft,
  iconRight,
  disabled,
  id,
}) => {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      title={title}
      className={`wmnds-btn ${btnClass} ${isActive ? 'wmnds-is--active' : ''} ${
        disabled ? 'wmnds-btn--disabled' : ''
      }`}
      onClick={onClick}
      disabled={disabled}
      id={id}
    >
      {/* If icon left is set then call icon component and inject correct svg */}
      {iconLeft ? <Icon iconClass="wmnds-btn__icon" iconName={iconLeft} /> : null}

      {/* button text will go here, if any */}
      {text}

      {/* If icon right is set then call icon component and inject correct svg */}
      {iconRight ? (
        <Icon iconClass="wmnds-btn__icon wmnds-btn__icon--right" iconName={iconRight} />
      ) : null}
    </button>
  );
};

// Set props
Button.propTypes = {
  text: PropTypes.string, // text inside button
  type: PropTypes.string, // button type, by default it is type="button"
  title: PropTypes.string, // title on the button
  onClick: PropTypes.func, // Set an onclick event
  isActive: PropTypes.bool, // If button is active, add active class
  btnClass: PropTypes.string, // Set custom button classes, will default to wmnds-btn (primary btn)
  iconLeft: PropTypes.string, // Set icon left on button
  iconRight: PropTypes.string, // Set icon right on button
  disabled: PropTypes.bool, // Sets if the button is disabled or not
  id: PropTypes.string,
};

Button.defaultProps = {
  text: '',
  type: 'button',
  title: null,
  onClick: null,
  isActive: false,
  btnClass: '',
  iconLeft: null,
  iconRight: null,
  disabled: false,
  id: null,
};

export default Button;
