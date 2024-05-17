import React, { useEffect, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
// Import contexts
import { AutoCompleteContext, ModeContext } from 'globalState';
// Imported components
import DisruptionIndicatorSmall from 'components/shared/DisruptionIndicator/DisruptionIndicatorSmall';
// import CloseButton from 'components/shared/CloseButton/CloseButton';
import DisruptionInfo from 'components/shared/DisruptionInfo/DisruptionInfo';
import useDisruptionAffectedItems from 'customHooks/useDisruptionAffectedItems';

function DisruptedService({ disruption }) {
  const [autoCompleteState] = useContext(AutoCompleteContext); // Get the state of modeButtons from modeContext
  const [modeState] = useContext(ModeContext); // Get the state of modeButtons from modeContext
  const { selectedItem, selectedItemTo } = autoCompleteState;
  const disruptionRef = useRef(null);

  const { iconLeft, title } = useDisruptionAffectedItems(disruption); // Get the correct modal icon and affectedItems

  useEffect(() => {
    // Wrapped in useEffect as it is reliant on functionality from the useEffect in MobileTray.js
    // !selectedService as there is a useEffect in SelectedServiceHeader.js that controls that takes over scroll if selected service
    if (
      ((modeState.mode === 'train' && !selectedItem.id && !selectedItemTo) ||
        (modeState.mode !== 'train' && !selectedItemTo)) &&
      disruptionRef.current &&
      document.getElementById('js-disruptions-tray')
    ) {
      // Scroll the tray to the clicked disruption
      const { offsetTop } = disruptionRef.current;
      const tray = document.getElementById('js-disruptions-tray'); // Get ID of tray from MobileTray.js or Tray.js
      tray.scrollTop = offsetTop + 1; // Scroll to the disruption ref'd below plus 1 pixel (hides the 1px border above disruption)
    }
  }, [modeState.mode, selectedItem.id, selectedItemTo]);

  return (
    <div className={`wmnds-grid wmnds-m-t-sm `} ref={disruptionRef}>
      <hr className="wmnds-col-1" />
      {/* Title of disruptions */}
      <div className="wmnds-col-1 wmnds-m-b-lg">
        <div className="wmnds-grid wmnds-grid--align-center">
          <DisruptionIndicatorSmall
            severity={disruption.disruptionSeverity}
            iconLeft={`modes-isolated-${iconLeft}`}
            className="wmnds-col-auto wmnds-m-r-md"
          />

          <div className="wmnds-col-3-4">{title()}</div>
        </div>
      </div>

      <DisruptionInfo disruption={disruption} />
    </div>
  );
}

// PropTypes
DisruptedService.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  disruption: PropTypes.any.isRequired,
};

export default DisruptedService;
