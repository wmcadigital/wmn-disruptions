import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const WhenContext = createContext();

export const WhenProvider = ({ children }) => {
  const [when, setWhen] = useState(null);
  const [whenCustom, setWhenCustom] = useState(null);
  const [isMapOpen, setisMapOpen] = useState(false);
  const [datePickerText, setDatePickerText] = useState('Choose date');

  return (
    <WhenContext.Provider
      value={[when, setWhen, whenCustom, setWhenCustom, isMapOpen, setisMapOpen, datePickerText, setDatePickerText]}
    >
      {children}
    </WhenContext.Provider>
  );
};

WhenProvider.propTypes = {
  children: PropTypes.isRequired
};
