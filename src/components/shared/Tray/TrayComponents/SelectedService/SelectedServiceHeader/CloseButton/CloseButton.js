import React from 'react';
import Icon from 'components/shared/Icon/Icon';
import PropTypes from 'prop-types';

import s from './CloseButton.module.scss';

const CloseButton = ({ onClick, isFloated }) => {
  return (
    <button
      type="button"
      className={`${s.closeButton} ${isFloated ? s.closeButtonFloated : ''}`}
      onClick={onClick}
    >
      <Icon iconName="general-cross" iconClass={`general-cross ${s.closeIcon}`} />
    </button>
  );
};

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isFloated: PropTypes.bool,
};

CloseButton.defaultProps = {
  isFloated: false,
};

export default CloseButton;
