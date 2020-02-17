import React, { useContext } from 'react';

import { AutoCompleteContext, FetchDisruptionsContext } from 'globalState';
// Import components
import When from './When/When';
import Mode from './Mode/Mode';
import AutoComplete from './AutoComplete/AutoComplete';

import SelectedResults from './AutoComplete/SelectedResults/SelectedResults';

const TrayComponents = () => {
  const [autoCompleteState] = useContext(AutoCompleteContext);
  const [fetchDisruptionsState] = useContext(FetchDisruptionsContext);

  return (
    <>
      <When />
      <Mode />
      <AutoComplete />
      {autoCompleteState.id && fetchDisruptionsState.isMapVisible && <SelectedResults />}
    </>
  );
};

export default TrayComponents;
