import React, { useState, createContext } from 'react';

export const WhenContext = createContext();

export const WhenProvider = props => {
  const { children } = props || {};

  const [whenState, setWhenState] = useState({
    when: null,
    whenCustom: null,
    isMapOpen: false,
    datePickerText: 'Choose date'
  });

  return <WhenContext.Provider value={[whenState, setWhenState]}>{children}</WhenContext.Provider>;
};
