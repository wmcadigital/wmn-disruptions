// Import packages
import React, { useState } from 'react';
// Import components
import ContextProvider from 'globalState/ContextProvider';
import Header from 'components/Header/Header';
import MapView from 'components/MapView/MapView';
import ListView from 'components/ListView/ListView';
import s from './App.module.scss';

const AppNew = () => {
  const [isMapVisible, setIsMapVisible] = useState(true);

  return (
    <ContextProvider>
      <Header isMapVisible={isMapVisible} setIsMapVisible={setIsMapVisible} />

      {/* Be careful with changeing this id (#disruptions-container) as it is being used by the tray to determine its container */}
      <div className={isMapVisible ? s.appWrapper : null} id="disruptions-container">
        {/* If map is visible, show map and tray, else show list view */}
        {isMapVisible ? <MapView /> : <ListView />}
      </div>
    </ContextProvider>
  );
};

export default AppNew;
