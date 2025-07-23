import React, { createContext, useContext, useState } from 'react';

const ShowDisruptedServicesContext = createContext();

export const useShowDisruptedServices = () => useContext(ShowDisruptedServicesContext);

export function ShowDisruptedServicesProvider(props) {
  const { children } = props || {};
  const [showDisruptedServices, setShowDisruptedServices] = useState(false);

  const value = React.useMemo(
    () => ({ showDisruptedServices, setShowDisruptedServices }),
    [showDisruptedServices, setShowDisruptedServices],
  );

  return (
    <ShowDisruptedServicesContext.Provider value={value}>
      {children}
    </ShowDisruptedServicesContext.Provider>
  );
}
