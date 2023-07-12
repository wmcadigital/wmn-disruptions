import React, { useReducer, createContext } from 'react';
// Import Helper functions
import {
  setSearchParam,
  getSearchParam,
  delSearchParam,
} from 'globalState/helpers/URLSearchParams'; // (used to sync state with URL)

export const ModeContext = createContext(); // Create when context

// Set initial state of when
const initialState = {
  mode: getSearchParam('mode') || 'bus', // Can be any of the modes (bus, train, tram, roads)
};
export function ModeProvider(props) {
  const { children } = props || {};

  // Set up a reducer so we can change state based on centralised logic here
  const reducer = (state, action) => {
    // Update the mode to chosen
    switch (action.type) {
      case 'UPDATE_MODE': {
        setSearchParam('mode', action.mode);
        return {
          ...state,
          mode: action.mode,
        };
      }
      case 'RESET': {
        delSearchParam('mode');
        return {};
      }

      // Default should return initial state if error
      default:
        return initialState;
    }
  };

  // Set up reducer using reducer logic and initialState by default
  const [modeState, modeDispatch] = useReducer(reducer, initialState);

  // Pass state and dispatch in context and make accessible to children it wraps
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  return <ModeContext.Provider value={[modeState, modeDispatch]}>{children}</ModeContext.Provider>;
}
