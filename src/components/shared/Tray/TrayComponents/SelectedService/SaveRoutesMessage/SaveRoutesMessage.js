import React, { useState, useEffect } from 'react';
// Components
import Icon from 'components/shared/Icon/Icon';

const SaveRoutesMessage = () => {
  const [disruptionsStorage, setDisruptionsStorage] = useState(
    JSON.parse(localStorage.getItem('disruptionsApp'))
  ); // Get localstorage and map to state. Used to show hide message button.

  // When a user closes help message, update state
  const handleCloseMsg = () => {
    setDisruptionsStorage((prevState) => {
      return { ...prevState, hideFavsHelpMsg: true };
    });
  };

  // UseEffect to watch the above function(if disruptionStorage state updates)
  useEffect(() => {
    // If it does change, set new vals to localstorage
    localStorage.setItem('disruptionsApp', JSON.stringify(disruptionsStorage));
  }, [disruptionsStorage]);

  return (
    <>
      {/* Save routes message, only show this message if the service is not "good" and if the user hasn't crossed it off already */}
      {typeof disruptionsStorage.hideFavsHelpMsg === 'undefined' && (
        <div className="wmnds-msg-help wmnds-col-1 wmnds-m-b-md">
          <button
            type="button"
            className="wmnds-msg-help__close-btn"
            aria-label="Close help message"
            onClick={handleCloseMsg}
          >
            <Icon iconName="general-cross" iconClass="wmnds-msg-help__close-icon" />
          </button>
          Save routes to your homepage by pressing the star icon
        </div>
      )}
    </>
  );
};

export default SaveRoutesMessage;
