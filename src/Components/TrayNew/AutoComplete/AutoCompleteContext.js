import React, { useReducer, createContext } from 'react';

export const AutoCompleteContext = createContext(); // Create when context

export const AutoCompleteProvider = props => {
  const { children } = props || {};

  // Set intial state of when
  const initialState = {
    query: '',
    data: [], // Can be any of the modes (bus, train, tram, roads)
    id: null // Used to store a specific service id gained from autocomplete
  };

  // Set up a reducer so we can change state based on centralised logic here
  const reducer = (state, action) => {
    console.log(action);
    // Update the mode to chosen
    switch (action.type) {
      case 'UPDATE_DATA':
        return {
          ...state,
          data: action.mode
        };
      case 'UPDATE_QUERY':
        return {
          ...state,
          query: action.query
        };
      // Default should return intial state if error
      default:
        return initialState;
    }
  };

  // Set up reducer using reducer logic and initialState by default
  const [autoCompleteState, autoCompleteDispatch] = useReducer(reducer, initialState);

  // Pass state and dispatch in context and make accessible to children it wraps
  return (
    <AutoCompleteContext.Provider value={[autoCompleteState, autoCompleteDispatch]}>
      {children}
    </AutoCompleteContext.Provider>
  );
};
