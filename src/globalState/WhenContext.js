import React, { useReducer, createContext } from 'react';
import { format } from 'fecha';
// Import Helper functions
import {
  setSearchParam,
  getSearchParam,
  delSearchParam,
} from 'globalState/helpers/URLSearchParams'; // (used to sync state with URL)

export const WhenContext = createContext(); // Create when context

export function WhenProvider(props) {
  const { children } = props || {};

  // Set intial state of when
  const initialState = {
    when: getSearchParam('when') || 'now', // Can be 'now','tomorrow' or 'customDate'
    // The below state is to help with datepicker(users custom date)
    whenCustomDate: getSearchParam('whenCustomDate')
      ? new Date(getSearchParam('whenCustomDate'))
      : null, // Used to map the datetime of chosen date in datepicker
    isDatePickerOpen: false, // For toggling datepicker open/closed
    datePickerText: getSearchParam('datePickerText') || 'Choose date', // Text for datepicker button, will change to dd/mm/yyyy if custom date chosen
  };

  // Set up a reducer so we can change state based on centralised logic here
  const reducer = (state, action) => {
    // Update the when to chosen
    switch (action.type) {
      case 'UPDATE_WHEN':
        delSearchParam('whenCustomDate');
        delSearchParam('datePickerText');
        setSearchParam('when', action.when);
        return {
          ...state,
          when: action.when,
          isDatePickerOpen: false,
        };
      // Toggle datepicker open/closed
      case 'TOGGLE_DATEPICKER':
        return {
          ...state,
          isDatePickerOpen: !state.isDatePickerOpen,
        };
      // Update state to use custom date from datepicker, close datepicker and update button text to shorthand date
      case 'UPDATE_CUSTOMDATE': {
        // Get the chosen date from datepicker and make shorthand dd/mm/yyyy
        const chosenDate = format(action.date, 'DD/MM/YYYY');

        setSearchParam('when', 'customDate');
        setSearchParam('whenCustomDate', action.date);
        setSearchParam('datePickerText', chosenDate);
        return {
          ...state,
          datePickerText: chosenDate,
          when: 'customDate',
          whenCustomDate: action.date,
          isDatePickerOpen: false,
        };
      }
      // Default should return intial state if error
      default:
        return initialState;
    }
  };
  // Set up reducer using reducer logic and initialState by default
  const [whenState, whenDispatch] = useReducer(reducer, initialState);

  // Pass state and dispatch in context and make accessible to children it wraps
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  return <WhenContext.Provider value={[whenState, whenDispatch]}>{children}</WhenContext.Provider>;
}
