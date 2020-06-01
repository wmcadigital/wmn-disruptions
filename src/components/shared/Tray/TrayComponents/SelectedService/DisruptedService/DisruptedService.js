import React, { useEffect, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
// Import contexts
import { AutoCompleteContext } from 'globalState';
// Imported components
import DisruptionIndicatorSmall from 'components/shared/DisruptionIndicator/DisruptionIndicatorSmall';
// import CloseButton from 'components/shared/CloseButton/CloseButton';
import DisruptionInfo from 'components/shared/DisruptionInfo/DisruptionInfo';

import s from './DisruptedService.module.scss';

const DisruptedService = ({ disruption }) => {
  const [autoCompleteState] = useContext(AutoCompleteContext); // Get the state of modeButtons from modeContext

  const disruptionRef = useRef(null);
  useEffect(() => {
    // Wrapped in useEffect as it is reliant on functionality from the useEffect in MobileTray.js
    if (
      autoCompleteState.selectedMapDisruption &&
      disruptionRef.current &&
      document.getElementById('js-disruptions-tray')
    ) {
      // Scroll the tray to the clicked disruption
      const { offsetTop } = disruptionRef.current;
      const tray = document.getElementById('js-disruptions-tray'); // Get ID of tray from MobileTray.js or Tray.js
      tray.scrollTop = offsetTop + 1; // Scroll to the disruption ref'd below plus 1 pixel (hides the 1px border above disruption)
    }
  }, [autoCompleteState.selectedMapDisruption]);

  return (
    <div className={`wmnds-grid wmnds-p-t-lg wmnds-m-t-lg ${s.disruption}`} ref={disruptionRef}>
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
  disruption: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DisruptedService;
