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
  const { autoCompleteState, modeState, resetTray } = useResetState(); // Get reset methods and state from custom hook

  let showSelectedService = false;
  // If there is a selectedItem from a map click or the user has selected train / tram (we need both the from/to Ids) or if any other mode we only need one id...
  if (autoCompleteState.selectedItem.selectedByMap) {
    showSelectedService = true;
  } else if (modeState.mode === 'train' || modeState.mode === 'tram') {
    if (autoCompleteState.selectedItem.id && autoCompleteState.selectedItemTo.id) {
      showSelectedService = true;
    }
  } else if (autoCompleteState.selectedItem.id) {
    showSelectedService = true;
  }

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

      {showSelectedService && <SelectedService />}
    </>
  );
};

export default TrayComponents;
