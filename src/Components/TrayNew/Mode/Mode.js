import React, { useContext } from 'react';

// Import contexts
import { ModeContext } from 'globalState/ModeContext';
// Import components
import Button from '../../Button/Button';

const Mode = () => {
  const [modeState, modeDispatch] = useContext(ModeContext); // Get the state of modeButtons from modeContext

  return (
    <>
      <div className="wmnds-col-1">
        <h4>Select a mode of travel</h4>
      </div>
      {/* Bus mode button */}
      <Button
        btnClass="wmnds-btn--small wmnds-btn--mode wmnds-col-auto wmnds-m-r-sm wmnds-m-b-sm"
        isActive={modeState.mode === 'bus'}
        onClick={() => modeDispatch({ type: 'UPDATE_MODE', mode: 'bus' })}
        iconLeft="modes-isolated-bus"
        text="Bus"
      />
      {/* Train mode button */}
      <Button
        btnClass="wmnds-btn--small wmnds-btn--mode wmnds-col-auto wmnds-m-r-sm wmnds-m-b-sm"
        isActive={modeState.mode === 'train'}
        onClick={() => modeDispatch({ type: 'UPDATE_MODE', mode: 'train' })}
        iconLeft="modes-isolated-rail"
        text="Train"
      />
      {/* Tram mode button */}
      <Button
        btnClass="wmnds-btn--small wmnds-btn--mode wmnds-col-auto wmnds-m-r-sm wmnds-m-b-sm"
        isActive={modeState.mode === 'tram'}
        onClick={() => modeDispatch({ type: 'UPDATE_MODE', mode: 'tram' })}
        iconLeft="modes-isolated-metro"
        text="Tram"
      />
      {/* Roads mode button */}
      <Button
        btnClass="wmnds-btn--small wmnds-btn--mode wmnds-col-auto wmnds-m-b-sm"
        isActive={modeState.mode === 'roads'}
        onClick={() => modeDispatch({ type: 'UPDATE_MODE', mode: 'roads' })}
        iconLeft="modes-isolated-roads"
        text="Roads"
      />
    </>
  );
};

export default Mode;
