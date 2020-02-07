import React from 'react';

// Import components
import When from './When/When';
import Mode from './Mode/Mode';
import AutoComplete from './AutoComplete/AutoComplete';

import DraggableResults from './DraggableResults/DraggableResults';

const TrayComponents = () => {
  return (
    <>
      <When />
      <Mode />
      <AutoComplete />

      <DraggableResults />
    </>
  );
};

export default TrayComponents;
