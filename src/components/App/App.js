// Import packages
import React from 'react';
import { QueryParamProvider } from 'use-query-params';
// Import components
import ContextProvider from 'globalState/ContextProvider';
import InnerApp from './InnerApp';

const App = () => {
  return (
    <React.StrictMode>
      <QueryParamProvider>
        <ContextProvider>
          <InnerApp />
        </ContextProvider>
      </QueryParamProvider>
    </React.StrictMode>
  );
};

export default App;
