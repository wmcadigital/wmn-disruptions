import React, { useContext } from 'react';
import { FavsContext } from 'globalState/FavsContext';
// Components
import Icon from 'components/shared/Icon/Icon';

const SaveRoutesMessage = () => {
  const [favsState, favsDispatch] = useContext(FavsContext);
  const { hideFavsHelpMsg, favCookieAllowed } = favsState;

  // When a user closes help message, update state
  const handleCloseMsg = () => {
    favsDispatch({ type: 'HIDE_FAVS_HELP_MSG' });
  };

  return (
    <>
      {/* Save routes message, only show this message if the service is not "good" and if the user hasn't crossed it off already */}
      {!hideFavsHelpMsg && (
        <div className="wmnds-msg-help wmnds-col-1 wmnds-m-b-md">
          <button
            type="button"
            className="wmnds-msg-help__close-btn"
            aria-label="Close help message"
            onClick={handleCloseMsg}
          >
            <Icon iconName="general-cross" iconClass="wmnds-msg-help__close-icon" />
          </button>
          {favCookieAllowed ? (
            'Save routes to your homepage by pressing the star icon'
          ) : (
            <>
              <a href="//tfwm.org.uk/manage-cookies/">Allow functional cookies</a> to save routes
              your homepage
            </>
          )}
        </div>
      )}
    </>
  );
};

export default SaveRoutesMessage;
