import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const DisruptionCoordinatesContext = createContext();

export const useDisruptionCoordinates = () => useContext(DisruptionCoordinatesContext);

export function DisruptionCoordinatesProvider({ children }) {
  const [disruptionCoordinates, setDisruptionCoordinates] = useState([]);
  const value = React.useMemo(
    () => ({ disruptionCoordinates, setDisruptionCoordinates }),
    [disruptionCoordinates, setDisruptionCoordinates],
  );

  return (
    <DisruptionCoordinatesContext.Provider value={value}>
      {children}
    </DisruptionCoordinatesContext.Provider>
  );
}

DisruptionCoordinatesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
