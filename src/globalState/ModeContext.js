import React, { useReducer, createContext } from 'react';
// Import custom hooks
import useUrlMap from 'customHooks/useUrlMap';

export const ModeContext = createContext(); // Create when context

export const ModeProvider = (props) => {
  const { children } = props || {};
  const { set, get } = useUrlMap(); // Use set/get from useURLMap (used to map state to URL)

  // Set intial state of when
  const initialState = {
    mode: get('mode') || null, // Can be any of the modes (bus, train, tram, roads)
  };

  // Set up a reducer so we can change state based on centralised logic here
  const reducer = (state, action) => {
    // Update the mode to chosen
    switch (action.type) {
      case 'UPDATE_MODE': {
        set('mode', action.mode);
        return {
          ...state,
          mode: action.mode,
        };
      }
      // Default should return intial state if error
      default:
        return initialState;
    }
  };

  // Set up reducer using reducer logic and initialState by default
  const [modeState, modeDispatch] = useReducer(reducer, initialState);

  // Pass state and dispatch in context and make accessible to children it wraps
  return <ModeContext.Provider value={[modeState, modeDispatch]}>{children}</ModeContext.Provider>;
};
