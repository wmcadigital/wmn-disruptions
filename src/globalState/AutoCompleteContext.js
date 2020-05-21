import React, { useReducer, createContext } from 'react';
// Import Helper functions
import {
  setSearchParam,
  getSearchParam,
  delSearchParam,
} from 'globalState/helpers/URLSearchParams'; // (used to sync state with URL)

export const AutoCompleteContext = createContext(); // Create when context

export const AutoCompleteProvider = (props) => {
  const { children } = props || {};

  // Set intial state of when
  const initialState = {
    query: getSearchParam('query') || '',
    data: [],
    selectedMapDisruption: getSearchParam('selectedMapDisruption') || null, // This is used to stash disruption id if a user clicks disruption on map
    // The selected service is used to store details when a user has clicked an autocomplete
    selectedService: {
      id: getSearchParam('selectedService') || null,
      severity: null,
      serviceNumber: null,
      routeName: null,
    },
  };

  // Set up a reducer so we can change state based on centralised logic here
  const reducer = (state, action) => {
    // Update the mode to chosen
    switch (action.type) {
      case 'UPDATE_QUERY':
        setSearchParam('query', action.query);
        return {
          ...state,
          query: action.query,
        };
      case 'UDPATE_SELECTED_MAP_DISRUPTION':
        setSearchParam('selectedMapDisruption', action.selectedMapDisruption);
        return {
          ...state,
          selectedMapDisruption: action.selectedMapDisruption,
        };
      case 'UPDATE_DATA':
        return {
          ...state,
          data: action.data,
        };
      case 'UPDATE_SELECTED_SERVICE':
        setSearchParam('selectedService', action.selectedService.id);
        delSearchParam('selectedMapDisruption');
        return {
          ...state,
          selectedService: action.selectedService,
          selectedMapDisruption: null,
        };
      case 'RESET_SELECTED_SERVICE':
        delSearchParam('selectedService');
        delSearchParam('selectedMapDisruption');
        delSearchParam('query');
        return {
          query: '',
          data: [],
          selectedMapDisruption: null,
          selectedService: {
            id: null,
            severity: null,
            serviceNumber: null,
            routeName: null,
          },
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
