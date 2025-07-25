/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import dompurify from 'dompurify';
import Icon from 'components/shared/Icon/Icon';

const { sanitize } = dompurify;

function Message({
  type = 'success',
  title = 'Good service',
  message = 'No incidents reported.',
  showRetry = false,
  retryCallback = null,
}) {
  let iconName;
  switch (type) {
    case 'error':
      iconName = 'warning-triangle';
      break;

    default:
      iconName = 'success';
      break;
  }

  // Placeholder styles until btn--as-link goes live on design-system
  const buttonAsLinkStyle = {
    fontSize: '1rem',
    background: 'none',
    border: 0,
    borderRadius: 0,
    padding: 0,
  };

  return (
    <div
      className={`wmnds-msg-summary wmnds-msg-summary--${type} wmnds-col-1 wmnds-m-t-lg wmnds-m-b-sm`}
    >
      <div className="wmnds-msg-summary__header">
        <Icon iconName={`general-${iconName}`} iconClass="wmnds-msg-summary__icon" />
        <h3 className="wmnds-msg-summary__title">{title}</h3>
      </div>

      <div className="wmnds-msg-summary__info">
        <p className="wmnds-m-b-sm">{sanitize(message)}</p>
        {showRetry && (
          <button
            type="button"
            className="wmnds-btn wmnds-link"
            style={buttonAsLinkStyle}
            onClick={retryCallback}
          >
            Retry search
          </button>
        )}
      </div>
    </div>
  );
}

Message.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string,
  showRetry: PropTypes.bool,
  retryCallback: PropTypes.func,
};

export default Message;
