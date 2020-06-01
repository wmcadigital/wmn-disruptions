import React, { useState, createContext } from 'react';
// Import Helper functions
import { getSearchParam } from 'globalState/helpers/URLSearchParams'; // (used to sync state with URL)

export const FetchDisruptionsContext = createContext(); // Create when context

export const FetchDisruptionsProvider = (props) => {
  const { children } = props || {};

  const [fetchDisruptionsState, setFetchDisruptionsState] = useState({
    isMapVisible: getSearchParam('isMapVisible') !== 'false', // store map visible. If the URL doesn't contain param 'isMapVisible' then it must be true (bool) else it's false (bool). Written like this as the url is a string and we need a bool here. This is set in Header component.
    data: [], // used to store data
  });

  // Pass state and dispatch in context and make accessible to children it wraps
  return (
    <FetchDisruptionsContext.Provider value={[fetchDisruptionsState, setFetchDisruptionsState]}>
      {children}
    </FetchDisruptionsContext.Provider>
  );
};
