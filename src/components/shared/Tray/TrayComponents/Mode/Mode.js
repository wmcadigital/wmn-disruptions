import React from 'react';
// CustomHooks
import useResetState from 'customHooks/useResetState';
// Import components
import Button from 'components/shared/Button/Button';

const Mode = () => {
  const { modeState, updateMode } = useResetState();

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
        isActive={modeState.mode === 'tram'}
        onClick={() => updateMode('tram')}
        iconLeft="modes-isolated-metro"
        text="Tram"
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
