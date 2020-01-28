// Import packages
import React, { useState } from 'react';
// Import components
import ContextProvider from 'globalState/ContextProvider';
import Header from 'Components/Header/Header';
import WebMapView from 'Components/Map/Map';
import TrayNew from 'Components/TrayNew/TrayNew';
// import Breadcrumbs from 'Components/Breadcrumbs/Breadcrumbs';
import NewListView from 'Components/NewListViews/NewListView';

const AppNew = () => {
  const [isMapVisible, setIsMapVisible] = useState(true);

  return (
    <ContextProvider>
      <Header isMapVisible={isMapVisible} setIsMapVisible={setIsMapVisible} />
      {/* If map is visible, show map */}
      {isMapVisible && <WebMapView />}

      {/* Else, show list view */}
      {!isMapVisible && <NewListView />}

      <TrayNew />
    </ContextProvider>
  );
};

export default AppNew;
