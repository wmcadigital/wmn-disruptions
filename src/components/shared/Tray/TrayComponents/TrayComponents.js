import React from 'react';
// Custom hooks
import useResetState from 'customHooks/useResetState';
// Import components
import Button from 'components/shared/Button/Button';
import When from './When/When';
import Mode from './Mode/Mode';
import AutoComplete from './AutoComplete/AutoComplete';
import SelectedService from './SelectedService/SelectedService';
// Styles
import s from './TrayComponents.module.scss';

const TrayComponents = () => {
  const { autoCompleteState, resetTray } = useResetState(); // Get reset methods and state from custom hook

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

      {!autoCompleteState.selectedItem.routeName && <AutoComplete />}

      {autoCompleteState.selectedItem.id && <SelectedService />}
    </>
  );
};

export default TrayComponents;
