import React from 'react';

// Import components
import When from './When/When';
import Mode from './Mode/Mode';
import AutoComplete from './AutoComplete/AutoComplete';

const TrayComponents = () => {
  return (
    <>
      <When />
      <Mode />
      <AutoComplete />
    </>
  );
};

export default TrayComponents;
