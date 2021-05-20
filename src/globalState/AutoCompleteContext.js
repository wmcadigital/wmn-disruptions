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
    // The selected service is used to store details when a user has clicked an autocomplete
    selectedItem: {
      id: getSearchParam('selectedItem') || null,
      selectedByMap: getSearchParam('selectedByMap') || null,
      operator: null,
      severity: null,
      serviceNumber: null,
      routeName: null,
      stopName: null,
      lines: [],
      to: null,
    },
    selectedItemTo: {
      id: getSearchParam('selectedItemTo') || null,
      operator: null,
      severity: null,
      serviceNumber: null,
      stopName: null,
      routeName: null,
      lines: [],
      to: null,
    },
    // The selected location is used to store selected roads address
    selectedLocation: {
      address: getSearchParam('address') || '',
      radius: parseInt(getSearchParam('radius'), 10) || null,
      lat: getSearchParam('lat') || null,
      lon: getSearchParam('lon') || null,
    },
  };

  // Set up a reducer so we can change state based on centralised logic here
  const reducer = (state, action) => {
    // Update the query to what the user has typed
    switch (action.type) {
      case 'UPDATE_QUERY': {
        const query = action.to ? 'queryTo' : 'query'; // If 'to' exists then make sure we set the correct field
        setSearchParam(query, action.query);

        return {
          ...state,
          [query]: action.query,
        };
      }
      // Update the state to show item user has selected
      case 'UDPATE_SELECTED_ITEM': {
        // If object contains selectedByMap
        if (action.payload.selectedByMap) {
          setSearchParam('selectedByMap', action.payload.selectedByMap); // Update URL
        } else {
          delSearchParam('selectedByMap'); // Delete URL
        }

        const item = action.payload.to ? 'selectedItemTo' : 'selectedItem'; // If 'to' exists in payload then make sure we set the correct field
        setSearchParam(item, action.payload.id); // Set URL

        return {
          ...state,
          [item]: {
            ...state[item],
            ...action.payload,
          },
        };
      }
      // Update the state to show item user has selected
      case 'UDPATE_SELECTED_ITEM_LINES': {
        // If object contains selectedByMap
        if (action.payload.selectedByMap) {
          setSearchParam('selectedByMap', action.payload.selectedByMap); // Update URL
        } else {
          delSearchParam('selectedByMap'); // Delete URL
        }

        return {
          ...state,
          selectedItem: {
            ...state.selectedItem,
            lines: action.payload,
          },
        };
      }

      // Used to cancel selected service/station etc. This is mainly used when using from/to stations
      case 'RESET_SELECTED_ITEM': {
        // If action.payload ('to') exists in payload then make sure we set the correct field
        const item = action.payload.to ? 'selectedItemTo' : 'selectedItem';
        const query = action.payload.to ? 'queryTo' : 'query';
        // Delete correct things from URL
        delSearchParam(item);
        delSearchParam(query);

        // Reset the selectedItem.lines if selectedItemTo is reset for trams
        if (action.payload.mode === 'tram' && action.payload.to) {
          return {
            ...state,
            [query]: '',
            [item]: {},
            selectedItem: {
              ...state.selectedItem,
              lines: [],
            },
          };
        }

        // Update state with deleted/cancelled service/item
        return {
          ...state,
          [query]: '',
          [item]: {},
        };
      }

      case 'UPDATE_SELECTED_LOCATION': {
        setSearchParam('address', action.payload.address);
        setSearchParam('lat', action.payload.lat);
        setSearchParam('lon', action.payload.lon);
        setSearchParam('radius', action.payload.radius);

        return {
          ...state,
          selectedLocation: action.payload,
        };
      }

      case 'UPDATE_SELECTED_LOCATION_RADIUS': {
        setSearchParam('radius', action.payload);

        return {
          ...state,
          selectedLocation: {
            ...state.selectedLocation,
            radius: action.payload,
          },
        };
      }

      case 'RESET_SELECTED_LOCATION': {
        delSearchParam('radius');
        delSearchParam('address');
        delSearchParam('lat');
        delSearchParam('lon');

        return {
          ...state,
          selectedLocation: {},
        };
      }

      // Used to reset everything
      case 'RESET_SELECTED_SERVICES':
        delSearchParam('selectedItem');
        delSearchParam('selectedItemTo');
        delSearchParam('selectedByMap');
        delSearchParam('query');
        delSearchParam('queryTo');
        // Location
        delSearchParam('radius');
        delSearchParam('address');
        delSearchParam('lat');
        delSearchParam('lon');
        return {
          query: '',
          queryTo: '',
          selectedItem: {},
          selectedItemTo: {},
          selectedLocation: {},
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
