import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/shared/Icon/Icon';
import dompurify from 'dompurify';

const { sanitize } = dompurify;

const Message = ({ type, title, message }) => {
  let iconName;
  switch (type) {
    case 'error':
      iconName = 'warning-triangle';
      break;

    default:
      iconName = 'success';
      break;
  }

  return (
    <div className={`wmnds-msg-summary wmnds-msg-summary--${type} wmnds-col-1 wmnds-m-t-lg`}>
      <div className="wmnds-msg-summary__header">
        <Icon iconName={`general-${iconName}`} iconClass="wmnds-msg-summary__icon" />
        <h3 className="wmnds-msg-summary__title">{title}</h3>
      </div>

      <div
        className="wmnds-msg-summary__info"
        dangerouslySetInnerHTML={{ __html: sanitize(message) }}
      />
    </div>
  );
};

Message.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string,
};

Message.defaultProps = {
  type: 'success',
  title: 'Good service',
  message: 'No incidents reported.',
};

export default Message;
