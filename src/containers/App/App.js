// Import packages
import React, { useState } from 'react';
// Import components
import ContextProvider from 'globalState/ContextProvider';
import Header from 'Components/Header/Header';
import WebMapView from 'Components/Map/Map';
import Tray from 'Components/Tray/Tray';
// import Breadcrumbs from 'Components/Breadcrumbs/Breadcrumbs';
import NewListView from 'Components/NewListViews/NewListView';
import s from './App.module.scss';

const AppNew = () => {
  const [isMapVisible, setIsMapVisible] = useState(true);

  return (
    <ContextProvider>
      <Header isMapVisible={isMapVisible} setIsMapVisible={setIsMapVisible} />

      {/* Be careful with changeing this id (#disruptions-container) as it is being used by the tray to determine its container */}
      <div className={s.appWrapper} id="disruptions-container">
        {/* Else, show list view */}
        {!isMapVisible && <NewListView />}
        {/* If map is visible, show map */}
        {isMapVisible && <WebMapView />}
        <Tray />
      </div>
    </ContextProvider>
  );
};

export default AppNew;
