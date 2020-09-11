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
  const { selectedItem } = autoCompleteState;
  const disruptionRef = useRef(null);

  const iconLeft = disruption.mode === 'tram' ? 'metro' : disruption.mode; // set icon to correct name for tram/metro

  useEffect(() => {
    // Wrapped in useEffect as it is reliant on functionality from the useEffect in MobileTray.js
    // !selectedService as there is a useEffect in SelectedServiceHeader.js that controls that takes over scroll if selected service
    if (
      !selectedItem.id &&
      disruptionRef.current &&
      document.getElementById('js-disruptions-tray')
    ) {
      // Scroll the tray to the clicked disruption
      const { offsetTop } = disruptionRef.current;
      const tray = document.getElementById('js-disruptions-tray'); // Get ID of tray from MobileTray.js or Tray.js
      tray.scrollTop = offsetTop + 1; // Scroll to the disruption ref'd below plus 1 pixel (hides the 1px border above disruption)
    }
  }, [selectedItem.id]);

  return (
    <div className={`wmnds-grid wmnds-p-t-lg wmnds-m-t-lg ${s.disruption}`} ref={disruptionRef}>
      {/* Title of disruptions */}
      <div className="wmnds-col-1 wmnds-m-b-lg">
        <div className="wmnds-grid wmnds-grid--align-center">
          <DisruptionIndicatorSmall
            severity={disruption.disruptionSeverity}
            iconLeft={`modes-isolated-${iconLeft}`}
            className="wmnds-col-auto wmnds-m-r-md"
          />

          <div className="wmnds-col-3-4">
            {disruption.title.charAt(0).toUpperCase() + disruption.title.slice(1)}
            {disruption.mode !== 'tram' && (
              <>
                at <strong>{disruption.subtitle}</strong>
              </>
            )}
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
