import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
// Imported components
import DisruptionIndicatorMedium from 'components/shared/DisruptionIndicator/DisruptionIndicatorMedium';
import CloseButton from './CloseButton/CloseButton';
import s from './SelectedServiceHeader.module.scss';

const SelectedServiceHeader = ({ autoCompleteState, autoCompleteDispatch, mode, to }) => {
  const { selectedItem, selectedItemTo } = autoCompleteState;
  const selectedServiceRef = useRef(null);

  const selectedService = to ? selectedItemTo : selectedItem;

  useEffect(() => {
    // Wrapped in useEffect as it is reliant on functionality from the useEffect in MobileTray.js
    if (
      ((mode === 'train' &&
        autoCompleteState.selectedItem.id &&
        autoCompleteState.selectedItemTo.id) ||
        (mode !== 'train' && selectedService.id)) &&
      selectedServiceRef.current &&
      document.getElementById('js-disruptions-tray')
    ) {
      // Scroll the tray to the clicked disruption
      const { offsetTop } = selectedServiceRef.current;
      const tray = document.getElementById('js-disruptions-tray'); // Get ID of tray from MobileTray.js or Tray.js
      tray.scrollTop = offsetTop - 2; // Scroll to the disruption ref'd below minus 2 pixels
    }
  }, [
    autoCompleteState.selectedItem.id,
    autoCompleteState.selectedItemTo.id,
    mode,
    selectedService.id,
  ]);

  return (
    <>
      {/* Close disruption box */}
      {!selectedService.selectedByMap && (
        <div
          className={`wmnds-grid wmnds-grid--align-center wmnds-m-t-xs wmnds-m-b-md ${s.selectedItemBox}`}
          ref={selectedServiceRef}
        >
          <DisruptionIndicatorMedium
            className="wmnds-p-t-xs wmnds-p-b-xs wmnds-p-l-xsm wmnds-p-r-xsm wmnds-col-auto wmnds-m-r-sm"
            severity={selectedService.severity}
            text={selectedService.serviceNumber || null}
            noMarginOnIcon={mode !== 'bus'}
          />
          <strong className={`wmnds-col-auto ${s.selectedSummary}`}>
            {selectedService.routeName || selectedService.stopName}
          </strong>

          <CloseButton onClick={autoCompleteDispatch} />
        </div>
      )}
    </>
  );
};

// PropTypes
SelectedServiceHeader.propTypes = {
  autoCompleteState: PropTypes.objectOf(PropTypes.any).isRequired,
  autoCompleteDispatch: PropTypes.func.isRequired,
  mode: PropTypes.string,
  to: PropTypes.bool,
};

SelectedServiceHeader.defaultProps = {
  mode: 'bus',
  to: false,
};

export default SelectedServiceHeader;
