// Import packages
import React from 'react';
// Import components
import ContextProvider from 'globalState/ContextProvider';
import ViewToShow from '../ViewToShow/ViewToShow';

function App() {
  return (
    <React.StrictMode>
      <ContextProvider>
        <ViewToShow />
      </ContextProvider>
    </React.StrictMode>
  );
}

export default App;
