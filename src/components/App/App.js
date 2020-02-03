// Import packages
import React, { useState } from 'react';
// Import components
import ContextProvider from 'globalState/ContextProvider';
import Header from 'components/Header/Header';
import MapView from 'components/MapView/MapView';
import ListView from 'components/ListView/ListView';

const AppNew = () => {
  const [isMapVisible, setIsMapVisible] = useState(true);

  return (
    <ContextProvider>
      <Header isMapVisible={isMapVisible} setIsMapVisible={setIsMapVisible} />

      {/* If map is visible, show map and tray, else show list view */}
      {isMapVisible ? <MapView /> : <ListView />}
    </ContextProvider>
  );
};

export default AppNew;
