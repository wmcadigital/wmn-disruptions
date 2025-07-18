/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/shared/Button/Button';

function ToggleMoreAffectedItems({
  amountHidden = 0,
  handleClick = null,
  id,
  isExpanded,
  serviceText,
}) {
  // Create button text
  let buttonText = `${isExpanded ? 'Hide' : 'Show'} `;
  buttonText += `${amountHidden} `;
  buttonText += isExpanded ? '' : 'more ';
  buttonText += serviceText;

  return (
    <div className="wmnds-m-b-lg">
      <Button
        btnClass="wmnds-btn--link"
        id={id}
        iconLeft={isExpanded ? 'general-minimise' : 'general-expand'}
        isExpanded={isExpanded}
        onClick={handleClick}
        text={buttonText}
        title={buttonText}
      />
    </div>
  );
}

// Set props
ToggleMoreAffectedItems.propTypes = {
  amountHidden: PropTypes.number,
  handleClick: PropTypes.func,
  id: PropTypes.string,
  isExpanded: PropTypes.bool,
  serviceText: PropTypes.string,
};

export default ToggleMoreAffectedItems;
