import React from 'react';
// Custom hooks
import useResetState from 'customHooks/useResetState';
// Import components
import Button from 'components/shared/Button/Button';
import When from './When/When';
import Mode from './Mode/Mode';
import AutoComplete from './AutoComplete/AutoComplete';
import SelectedService from './SelectedService/SelectedService';
import Stats from './Stats/Stats';
// Styles
import s from './TrayComponents.module.scss';

function TrayComponents() {
  const { resetTray } = useResetState(); // Get reset methods and state from custom hook

  return (
    <>
      {/* Reset button for tray */}
      <div className="wmnds-grid">
        <div className="wmnds-col-1">
          <Button
            btnClass={`${s.resetBtn} wmnds-link wmnds-float-right`}
            text="Clear search"
            onClick={resetTray}
          />
        </div>
      </div>

      <When />

      <Mode />

      <AutoComplete />

      <SelectedService />

      <Stats />
    </>
  );
}

export default TrayComponents;
