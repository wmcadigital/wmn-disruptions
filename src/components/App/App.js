// Import packages
import React from 'react';
// Import components
import ContextProvider from 'globalState/ContextProvider';
import InnerApp from './InnerApp';

const App = () => {
  return (
    <React.StrictMode>
      <ContextProvider>
        <InnerApp />
      </ContextProvider>
    </React.StrictMode>
  );
};

export default App;
