import React, { createContext, useContext, useState } from 'react';

const DisruptionCoordinatesContext = createContext();

export const useDisruptionCoordinates = () => useContext(DisruptionCoordinatesContext);

export function DisruptionCoordinatesProvider(props) {
  const { children } = props || {};
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
