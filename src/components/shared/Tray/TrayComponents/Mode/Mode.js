import React, { useContext } from 'react';

// Import contexts
import { ModeContext } from 'globalState';
// Import components
import Button from 'components/shared/Button/Button';

const Mode = () => {
  const [modeState, modeDispatch] = useContext(ModeContext); // Get the state of modeButtons from modeContext

  return (
    <div className="wmnds-grid">
      <div className="wmnds-col-1">
        <h4>Select a mode of travel</h4>
      </div>
      {/* Bus mode button */}
      <Button
        btnClass="wmnds-btn--mode wmnds-col-auto wmnds-m-r-sm wmnds-m-b-sm wmnds-p-xsm"
        isActive={modeState.mode === 'bus'}
        onClick={() =>
          modeDispatch({
            type: 'UPDATE_MODE',
            mode: 'bus'
          })
        }
        iconLeft="modes-isolated-bus"
        text="Bus"
      />
      {/* Train mode button */}
      <Button
        btnClass="wmnds-btn--mode wmnds-col-auto wmnds-m-r-sm wmnds-m-b-sm wmnds-p-xsm"
        title="Train mode coming soon"
        isActive={modeState.mode === 'train'}
        onClick={() => modeDispatch({ type: 'UPDATE_MODE', mode: 'train' })}
        iconLeft="modes-isolated-rail"
        text="Train"
        disabled
      />
      {/* Tram mode button */}
      <Button
        btnClass="wmnds-btn--mode wmnds-col-auto wmnds-m-r-sm wmnds-m-b-sm wmnds-p-xsm"
        title="Tram mode coming soon"
        isActive={modeState.mode === 'tram'}
        onClick={() => modeDispatch({ type: 'UPDATE_MODE', mode: 'tram' })}
        iconLeft="modes-isolated-metro"
        text="Tram"
        disabled
      />
      {/* Roads mode button */}
      <Button
        btnClass="wmnds-btn--mode wmnds-col-auto wmnds-m-b-sm wmnds-p-xsm"
        title="Roads mode coming soon"
        isActive={modeState.mode === 'roads'}
        onClick={() => modeDispatch({ type: 'UPDATE_MODE', mode: 'roads' })}
        iconLeft="modes-isolated-roads"
        text="Roads"
        disabled
      />
    </div>
  );
};

export default Mode;
