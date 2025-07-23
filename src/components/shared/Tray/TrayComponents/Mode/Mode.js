import React from 'react';
import PropTypes from 'prop-types';
// CustomHooks
import useResetState from 'customHooks/useResetState';
// Import components
import Button from 'components/shared/Button/Button';

function Mode({ trainDisruptionsCount }) {
  const { modeState, updateMode } = useResetState();

  return (
    <div className="wmnds-grid">
      <div className="wmnds-col-1">
        <h2 className="wmnds-h4">Select a mode of travel</h2>
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
        isActive={modeState.mode === 'train'}
        onClick={() => updateMode('train')}
        iconLeft="modes-isolated-rail"
        text="Train"
        disabled={trainDisruptionsCount === 0} // Disable if no train disruptions
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
        isActive={modeState.mode === 'roads'}
        onClick={() => updateMode('roads')}
        iconLeft="modes-isolated-roads"
        text="Roads"
      />
    </div>
  );
}
Mode.propTypes = {
  trainDisruptionsCount: PropTypes.number.isRequired,
};

export default Mode;
