import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// Imported components
import Icon from 'components/shared/Icon/Icon';
import DisruptionIndicatorMedium from 'components/shared/DisruptionIndicator/DisruptionIndicatorMedium';
import CloseButton from './CloseButton/CloseButton';
import s from './SelectedServiceHeader.module.scss';

const SelectedServiceHeader = ({ autoCompleteState, autoCompleteDispatch }) => {
  const { selectedItem } = autoCompleteState;
  const selectedServiceRef = useRef(null);
  const [disruptionsStorage, setDisruptionsStorage] = useState(
    JSON.parse(localStorage.getItem('disruptionsApp'))
  ); // Get localstorage and map to state. Used to show hide message button.

  useEffect(() => {
    // Wrapped in useEffect as it is reliant on functionality from the useEffect in MobileTray.js
    if (
      selectedServiceRef.current &&
      selectedItem.id &&
      document.getElementById('js-disruptions-tray')
    ) {
      // Scroll the tray to the clicked disruption
      const { offsetTop } = selectedServiceRef.current;
      const tray = document.getElementById('js-disruptions-tray'); // Get ID of tray from MobileTray.js or Tray.js
      tray.scrollTop = offsetTop - 2; // Scroll to the disruption ref'd below minus 2 pixels
    }
  }, [selectedItem.id]);

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
      {/* Close disruption box */}
      {!selectedItem.selectedByMap && (
        <div
          className={`wmnds-grid wmnds-grid--align-center wmnds-m-t-xs wmnds-m-b-md ${s.selectedItemBox}`}
          ref={selectedServiceRef}
        >
          <DisruptionIndicatorMedium
            className="wmnds-col-auto wmnds-m-r-md"
            severity={selectedItem.severity}
            text={selectedItem.serviceNumber || selectedItem.operator}
          />
          <strong className={`wmnds-col-auto ${s.selectedSummary}`}>
            {selectedItem.routeName || selectedItem.stopName}
          </strong>

          <CloseButton onClick={autoCompleteDispatch} />
        </div>
      )}

      {/* Save routes message, only show this message if the service is not "good" and if the user hasn't crossed it off already */}
      {typeof disruptionsStorage.hideFavsHelpMsg === 'undefined' &&
        selectedItem.severity !== 'none' && (
          <div className="wmnds-msg-help wmnds-col-1 wmnds-m-t-md">
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

// PropTypes
SelectedServiceHeader.propTypes = {
  autoCompleteState: PropTypes.objectOf(PropTypes.any).isRequired,
  autoCompleteDispatch: PropTypes.func.isRequired,
};

export default SelectedServiceHeader;
