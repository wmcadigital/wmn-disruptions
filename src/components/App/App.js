// Import packages
import React, { useState } from 'react';
// Import components
import ContextProvider from 'globalState/ContextProvider';
import Header from 'components/Header/Header';
import WebMapView from 'components/Map/Map';
import Tray from 'components/Tray/Tray';
// import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import ListView from 'components/ListView/ListView';
import s from './App.module.scss';

const AppNew = () => {
  const [isMapVisible, setIsMapVisible] = useState(true);

  return (
    <ContextProvider>
      <Header isMapVisible={isMapVisible} setIsMapVisible={setIsMapVisible} />

      {/* Be careful with changeing this id (#disruptions-container) as it is being used by the tray to determine its container */}
      <div className={isMapVisible ? s.appWrapper : null} id="disruptions-container">
        {/* Else, show list view */}
        {!isMapVisible && <ListView />}
        {/* If map is visible, show map and tray */}
        {isMapVisible && <WebMapView />}
        {isMapVisible && <Tray />}
      </div>
    </ContextProvider>
  );
};

export default AppNew;
