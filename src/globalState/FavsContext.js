import React, { useReducer, createContext } from 'react';

export const FavsContext = createContext(); // Create when context

export const FavsProvider = (props) => {
  const { children } = props || {};

  // Set intial state of favs (get from localStorage OR set default)
  const initialState = JSON.parse(localStorage.getItem('disruptionsApp')) || {
    favs: {
      bus: [],
      train: [],
      tram: [],
      roads: [],
    },
  };

  // Set up a reducer so we can change state based on centralised logic here
  const reducer = (state, action) => {
    // Update the favState depening on action type
    switch (action.type) {
      // Add favourite
      case 'ADD_FAV':
        return {
          ...state,
          favs: {
            bus: [...state.favs.bus, action.id],
          },
        };
      // Remove favourite
      case 'REMOVE_FAV':
        return {
          ...state,
          favs: {
            bus: state.favs.bus.filter((item) => item !== action.id),
          },
        };
      // Default should return intial state if error
      default:
        return initialState;
    }
  };
  // Set up reducer using reducer logic and initialState by default
  const [favState, favDispatch] = useReducer(reducer, initialState);

  localStorage.setItem('disruptionsApp', JSON.stringify(favState));

  // Pass state and dispatch in context and make accessible to children it wraps
  return <FavsContext.Provider value={[favState, favDispatch]}>{children}</FavsContext.Provider>;
};
