import React, { useReducer, createContext } from 'react';

export const TrayLayoutContext = createContext(); // Create when context

export const TrayLayoutProvider = props => {
  const { children } = props || {};

  // Set intial state of when
  const initialState = {
    mapHeight: 0,
    trayHeight: 0,
    maxTrayHeight: 0
  };

  // Set up a reducer so we can change state based on centralised logic here
  const reducer = (state, action) => {
    // Update the mode to chosen
    switch (action.type) {
      case 'UPDATE_MAP_HEIGHT':
        return {
          ...state,
          mapHeight: action.height
        };
      case 'UPDATE_TRAY_HEIGHT':
        return {
          ...state,
          trayHeight: action.height
        };

      case 'UPDATE_MAX_TRAY_HEIGHT':
        return {
          ...state,
          // If trayHeight is less than the map height then set maxheight to tray height otherwise set to map height (this stops the tray going to far up)
          maxTrayHeight: state.trayHeight < state.mapHeight ? state.trayHeight : state.mapHeight
        };
      // Default should return intial state if error
      default:
        return initialState;
    }
  };

  // Set up reducer using reducer logic and initialState by default
  const [trayLayoutState, trayLayoutDispatch] = useReducer(reducer, initialState);

  // Pass state and dispatch in context and make accessible to children it wraps
  return (
    <TrayLayoutContext.Provider value={[trayLayoutState, trayLayoutDispatch]}>{children}</TrayLayoutContext.Provider>
  );
};
