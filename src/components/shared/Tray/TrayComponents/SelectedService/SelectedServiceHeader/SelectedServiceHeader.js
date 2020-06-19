import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
// Imported components
import DisruptionIndicatorMedium from 'components/shared/DisruptionIndicator/DisruptionIndicatorMedium';
import CloseButton from './CloseButton/CloseButton';
import s from './SelectedServiceHeader.module.scss';

const SelectedServiceHeader = ({ autoCompleteState, autoCompleteDispatch }) => {
  const { selectedService, selectedMapDisruption } = autoCompleteState;
  const selectedServiceRef = useRef(null);

  useEffect(() => {
    // Wrapped in useEffect as it is reliant on functionality from the useEffect in MobileTray.js
    if (
      selectedServiceRef.current &&
      selectedService &&
      document.getElementById('js-disruptions-tray')
    ) {
      // Scroll the tray to the clicked disruption
      const { offsetTop } = selectedServiceRef.current;
      const tray = document.getElementById('js-disruptions-tray'); // Get ID of tray from MobileTray.js or Tray.js
      tray.scrollTop = offsetTop - 2; // Scroll to the disruption ref'd below minus 2 pixels
    }
  }, [autoCompleteState.selectedMapDisruption, selectedMapDisruption, selectedService]);

  return (
    <>
      {/* Close disruption box */}
      {!autoCompleteState.selectedMapDisruption && (
        <div
          className={`wmnds-grid wmnds-grid--align-center wmnds-m-t-xs wmnds-m-b-md ${s.selectedItemBox}`}
          ref={selectedServiceRef}
        >
          <DisruptionIndicatorMedium
            className="wmnds-col-auto wmnds-m-r-md"
            severity={selectedService.severity}
            text={selectedService.serviceNumber}
          />
          <strong className={`wmnds-col-auto ${s.selectedSummary}`}>
            {selectedService.routeName}
          </strong>

          <CloseButton onClick={autoCompleteDispatch} />
        </div>
      )}

      {/* Save routes message */}
      <div className="wmnds-msg-help wmnds-col-1 wmnds-m-t-md">
        Save routes to your homepage by pressing the star icon
      </div>
    </>
  );
};

// PropTypes
SelectedServiceHeader.propTypes = {
  autoCompleteState: PropTypes.objectOf(PropTypes.any).isRequired,
  autoCompleteDispatch: PropTypes.func.isRequired,
};

export default SelectedServiceHeader;
