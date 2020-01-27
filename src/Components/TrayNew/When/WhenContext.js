import React, { useReducer, createContext } from 'react';

export const WhenContext = createContext();

export const WhenProvider = props => {
  const { children } = props || {};

  const initialState = {
    when: null,
    whenCustom: null,
    isMapOpen: false,
    datePickerText: 'Choose date'
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE_WHEN':
        return {
          ...state,
          when: action.when
        };
      case 'TOGGLE_DATEPICKER':
        return {
          ...state,
          when: 'customDate',
          isMapOpen: !state.isMapOpen
        };

      case 'UPDATE_CUSTOMDATE': {
        const chosenDate = `${action.date.getDate()}/${action.date.getMonth() + 1}/${action.date.getFullYear()}`;

        return {
          ...state,
          datePickerText: chosenDate,
          whenCustom: action.date,
          isMapOpen: false
        };
      }

      default:
        return initialState;
    }
  };

  const [whenState, whenDispatch] = useReducer(reducer, initialState);

  return <WhenContext.Provider value={[whenState, whenDispatch]}>{children}</WhenContext.Provider>;
};
