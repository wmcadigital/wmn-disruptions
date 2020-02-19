import React, { useReducer, createContext } from 'react';

export const FavsContext = createContext(); // Create when context

export const FavsProvider = props => {
  const { children } = props || {};

  // Set intial state of when
  const initialState = JSON.parse(localStorage.getItem('disruptionFavs')) || {
    bus: [],
    train: [],
    tram: [],
    roads: []
  };

  // Set up a reducer so we can change state based on centralised logic here
  const reducer = (state, action) => {
    // Update the when to chosen
    switch (action.type) {
      // Add favourite
      case 'ADD_FAV':
        return {
          ...state,
          bus: [...state.bus, action.id]
        };
      // Remove favourite
      case 'REMOVE_FAV':
        return {
          ...state,
          bus: state.bus.filter(item => item !== action.id)
        };
      // Default should return intial state if error
      default:
        return initialState;
    }
  };
  // Set up reducer using reducer logic and initialState by default
  const [favState, favDispatch] = useReducer(reducer, initialState);

  localStorage.setItem('disruptionFavs', JSON.stringify(favState));

  // Pass state and dispatch in context and make accessible to children it wraps
  return <FavsContext.Provider value={[favState, favDispatch]}>{children}</FavsContext.Provider>;
};
