// Import packages
import React, { useState } from 'react';
// Import components
import ContextProvider from 'globalState/ContextProvider';
import Header from 'Components/Header/Header';
import WebMapView from 'Components/Map/Map';
import TrayNew from 'Components/TrayNew/TrayNew';
// import Breadcrumbs from 'Components/Breadcrumbs/Breadcrumbs';
import NewListView from 'Components/NewListViews/NewListView';
import s from './App.module.scss';

const AppNew = () => {
  const [isMapVisible, setIsMapVisible] = useState(true);

  return (
    <ContextProvider>
      <Header isMapVisible={isMapVisible} setIsMapVisible={setIsMapVisible} />

      <div className={s.appWrapper} id="app-wrap">
        {/* Else, show list view */}
        {!isMapVisible && <NewListView />}
        {/* If map is visible, show map */}
        {isMapVisible && <WebMapView />}
        <TrayNew />
      </div>
    </ContextProvider>
  );
};

export default AppNew;
