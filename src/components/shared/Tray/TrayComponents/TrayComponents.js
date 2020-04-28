import React, { useContext } from 'react';

import { AutoCompleteContext } from 'globalState';
// Import components
import When from './When/When';
import Mode from './Mode/Mode';
import AutoComplete from './AutoComplete/AutoComplete';

import SelectedService from './SelectedService/SelectedService';

const TrayComponents = () => {
  const [autoCompleteState] = useContext(AutoCompleteContext);

  return (
    <>
      <When />
      <Mode />
      {!autoCompleteState.selectedService.routeName && <AutoComplete />}
      {(autoCompleteState.selectedService.routeName || autoCompleteState.selectedMapDisruption) && (
        <SelectedService />
      )}
    </>
  );
};

export default TrayComponents;
