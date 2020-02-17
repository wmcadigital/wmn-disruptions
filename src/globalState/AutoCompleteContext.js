import React, { useReducer, createContext } from 'react';

export const AutoCompleteContext = createContext(); // Create when context

export const AutoCompleteProvider = props => {
  const { children } = props || {};

  // Set intial state of when
  const initialState = {
    query: '',
    data: [],
    selectedService: {
      id: null,
      severity: null,
      serviceNumber: null,
      routeName: null
    }
  };

  // Set up a reducer so we can change state based on centralised logic here
  const reducer = (state, action) => {
    // Update the mode to chosen
    switch (action.type) {
      case 'UPDATE_QUERY':
        return {
          ...state,
          query: action.query
        };
      case 'UPDATE_DATA':
        return {
          ...state,
          data: action.data
        };
      case 'UPDATE_SELECTED_SERVICE':
        return {
          ...state,
          selectedService: action.selectedService
        };
      case 'RESET_SELECTED_SERVICE':
        return initialState;
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
