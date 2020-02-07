import React, { useContext } from 'react';

import { AutoCompleteContext, FetchDisruptionsContext } from 'globalState';
// Import components
import When from './When/When';
import Mode from './Mode/Mode';
import AutoComplete from './AutoComplete/AutoComplete';

import DraggableResults from './DraggableResults/DraggableResults';

const TrayComponents = () => {
  const [autoCompleteState] = useContext(AutoCompleteContext);
  const [fetchDisruptionsState] = useContext(FetchDisruptionsContext);

  return (
    <>
      <When />
      <Mode />
      <AutoComplete />
      {autoCompleteState.id && fetchDisruptionsState.isMapVisible && <DraggableResults />}
    </>
  );
};

export default TrayComponents;
