import React from 'react';
import Icon from 'components/shared/Icon/Icon';
import PropTypes from 'prop-types';

import s from './CloseButton.module.scss';

const CloseButton = ({ onClick }) => {
  return (
    <button
      type="button"
      className={`${s.cancelButton} ${s.cancelButtonFloated}`}
      onClick={onClick}
    >
      <Icon iconName="general-cross" iconClass={`general-cross ${s.cancelIcon}`} />
    </button>
  );
};

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default CloseButton;
