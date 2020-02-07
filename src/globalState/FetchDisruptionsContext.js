import React, { useState, createContext } from 'react';

export const FetchDisruptionsContext = createContext(); // Create when context

export const FetchDisruptionsProvider = props => {
  const { children } = props || {};

  const [fetchDisruptionsState, setFetchDisruptionsState] = useState({
    isMapVisible: true, // store map visible
    data: [], // used to store data
    isFetching: false // used to control loading spinners
  });

  // Pass state and dispatch in context and make accessible to children it wraps
  return (
    <FetchDisruptionsContext.Provider value={[fetchDisruptionsState, setFetchDisruptionsState]}>
      {children}
    </FetchDisruptionsContext.Provider>
  );
};
