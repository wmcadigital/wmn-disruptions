import React, { useContext } from 'react';
// Import contexts
import { ModeContext } from 'globalState';
// CustomHooks
import useResetState from 'customHooks/useResetState';
// Import components
import Button from 'components/shared/Button/Button';

const Mode = () => {
  const [modeState, modeDispatch] = useContext(ModeContext); // Get the state of modeButtons from modeContext
  const { reset } = useResetState('mode');

  const updateMode = (mode) => {
    // Update the mode context to selected mode
    modeDispatch({
      type: 'UPDATE_MODE',
      mode,
    });
    reset();
  };

  return (
    <div className="wmnds-grid">
      <div className="wmnds-col-1">
        <h4>Select a mode of travel</h4>
      </div>
      {/* Bus mode button */}
      <Button
        btnClass="wmnds-btn--mode wmnds-col-auto wmnds-m-r-sm wmnds-m-b-sm wmnds-p-xsm"
        isActive={modeState.mode === 'bus'}
        onClick={() => updateMode('bus')}
        iconLeft="modes-isolated-bus"
        text="Bus"
      />
      {/* Train mode button */}
      <Button
        btnClass="wmnds-btn--mode wmnds-col-auto wmnds-m-r-sm wmnds-m-b-sm wmnds-p-xsm"
        title="Train mode coming soon"
        isActive={modeState.mode === 'train'}
        onClick={() => updateMode('train')}
        iconLeft="modes-isolated-rail"
        text="Train"
        disabled
      />
      {/* Tram mode button */}
      <Button
        btnClass="wmnds-btn--mode wmnds-col-auto wmnds-m-r-sm wmnds-m-b-sm wmnds-p-xsm"
        title="Tram mode coming soon"
        isActive={modeState.mode === 'tram'}
        onClick={() => updateMode('tram')}
        iconLeft="modes-isolated-metro"
        text="Tram"
        disabled
      />
      {/* Roads mode button */}
      <Button
        btnClass="wmnds-btn--mode wmnds-col-auto wmnds-m-b-sm wmnds-p-xsm"
        title="Roads mode coming soon"
        isActive={modeState.mode === 'roads'}
        onClick={() => updateMode('roads')}
        iconLeft="modes-isolated-roads"
        text="Roads"
        disabled
      />
    </div>
  );
};

export default Mode;
