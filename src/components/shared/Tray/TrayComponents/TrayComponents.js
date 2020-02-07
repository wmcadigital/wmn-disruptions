import React, { useContext } from 'react';

import { AutoCompleteContext } from 'globalState';
// Import components
import When from './When/When';
import Mode from './Mode/Mode';
import AutoComplete from './AutoComplete/AutoComplete';

import DraggableResults from './DraggableResults/DraggableResults';

const TrayComponents = () => {
  const [autoCompleteState] = useContext(AutoCompleteContext);
  return (
    <>
      <When />
      <Mode />
      <AutoComplete />
      {autoCompleteState.id && <DraggableResults />}
    </>
  );
};

export default TrayComponents;
