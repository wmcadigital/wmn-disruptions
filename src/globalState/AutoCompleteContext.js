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
    queryTo: getSearchParam('queryTo') || '',
    data: [],
    // selectedMapDisruption: getSearchParam('selectedMapDisruption') || null, // This is used to stash disruption id if a user clicks disruption on map
    // // The selected service is used to store details when a user has clicked an autocomplete
    // selectedService: {
    //   id: getSearchParam('selectedService') || null,
    //   operator: null,
    //   severity: null,
    //   serviceNumber: null,
    //   routeName: null,
    // },
    selectedItem: {
      id: getSearchParam('selectedItem') || null,
      selectedByMap: getSearchParam('selectedByMap') || null,
      operator: null,
      severity: null,
      serviceNumber: null,
      routeName: null,
      railLines: null,
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
      case 'UPDATE_QUERY_TO':
        setSearchParam('queryTo', action.query);
        return {
          ...state,
          queryTo: action.query,
        };
      case 'UDPATE_SELECTED_ITEM': {
        // If object contains selectedByMap
        if (action.payload.selectedByMap) {
          // Update URL
          setSearchParam('selectedByMap', action.payload.selectedByMap);
        } else {
          delSearchParam('selectedMapDisruption');
        }
        setSearchParam('selectedItem', action.payload.id);
        return {
          ...state,
          selectedItem: action.payload,
        };
      }
      case 'UPDATE_DATA':
        return {
          ...state,
          data: action.data,
        };
      case 'RESET_SELECTED_SERVICE':
        delSearchParam('selectedItem');
        delSearchParam('selectedByMap');
        delSearchParam('query');
        return {
          query: '',
          data: [],
          selectedItem: {},
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
