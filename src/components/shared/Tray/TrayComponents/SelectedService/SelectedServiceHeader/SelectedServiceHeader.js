import React from 'react';
import PropTypes from 'prop-types';
// Imported components
import DisruptionIndicatorMedium from 'components/shared/DisruptionIndicator/DisruptionIndicatorMedium';
import CloseButton from 'components/shared/CloseButton/CloseButton';
import s from './SelectedServiceHeader.module.scss';

const SelectedServiceHeader = ({ autoCompleteState, autoCompleteDispatch }) => {
  const { selectedService } = autoCompleteState;

  return (
    <>
      {/* Close disruption box */}
      {!autoCompleteState.disruptionID && (
        <div
          className={`wmnds-grid wmnds-grid--align-center wmnds-m-t-xs wmnds-m-b-md ${s.selectedItemBox}`}
        >
          <div className="wmnds-col-auto wmnds-m-r-md">
            <DisruptionIndicatorMedium
              severity={selectedService.severity}
              text={selectedService.serviceNumber}
            />
          </div>
          <div className={`wmnds-col-auto ${s.selectedSummary}`}>
            <strong>{selectedService.routeName}</strong>
          </div>

          <CloseButton onClick={() => autoCompleteDispatch()} />
        </div>
      )}

      {/* Save routes message */}
      <div className="wmnds-msg-help wmnds-col-1 wmnds-m-b-lg wmnds-m-t-md">
        Save routes to your homepage by pressing the star icon
      </div>
    </>
  );
};

// PropTypes
SelectedServiceHeader.propTypes = {
  autoCompleteState: PropTypes.objectOf(PropTypes.any).isRequired,
  autoCompleteDispatch: PropTypes.func.isRequired
};

export default SelectedServiceHeader;
