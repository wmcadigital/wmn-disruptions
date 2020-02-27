import React from 'react';
import PropTypes from 'prop-types';
// Imported components
import DisruptionIndicatorSmall from 'components/shared/DisruptionIndicator/DisruptionIndicatorSmall';
// import CloseButton from 'components/shared/CloseButton/CloseButton';
import DisruptionInfo from 'components/shared/DisruptionInfo/DisruptionInfo';

import s from './DisruptedService.module.scss';

const DisruptedService = ({ disruption }) => {
  return (
    <div className={`wmnds-grid wmnds-p-t-lg ${s.disruption}`}>
      {/* {disruptionID && (
        <div className="wmnds-col-1">
          <CloseButton isFloated onClick={() => autoCompleteDispatch()} />
        </div>
      )} */}

      {/* Title of disruptions */}
      <div className="wmnds-col-1 wmnds-m-b-lg">
        <div className="wmnds-grid wmnds-grid--align-center">
          <DisruptionIndicatorSmall
            severity={disruption.disruptionSeverity}
            iconLeft={`modes-isolated-${disruption.mode}`}
            className="wmnds-col-auto wmnds-m-r-md"
          />

          <div className="wmnds-col-3-4">
            {disruption.title} at <strong>{disruption.subtitle}</strong>
          </div>
        </div>
      </div>

      <DisruptionInfo disruption={disruption} />
    </div>
  );
};

// PropTypes
DisruptedService.propTypes = {
  disruption: PropTypes.objectOf(PropTypes.any).isRequired
  // disruptionID: PropTypes.string.isRequired,
  // autoCompleteDispatch: PropTypes.func.isRequired
};

export default DisruptedService;
