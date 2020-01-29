// Import packages
import React, { useState } from 'react';
// Import components
import ContextProvider from 'globalState/ContextProvider';
import Header from 'Components/Header/Header';
import WebMapView from 'Components/Map/Map';
import TrayNew from 'Components/TrayNew/TrayNew';
// import Breadcrumbs from 'Components/Breadcrumbs/Breadcrumbs';
import NewListView from 'Components/NewListViews/NewListView';

import s from 'Components/TrayNew/TrayNew.module.scss';

const AppNew = () => {
  const [isMapVisible, setIsMapVisible] = useState(true);

  return (
    <ContextProvider>
      <Header isMapVisible={isMapVisible} setIsMapVisible={setIsMapVisible} />

      {/* Else, show list view */}
      {!isMapVisible && <NewListView />}
      <div className={s.mapTrayWrapper} style={{ height: `80vh` }} id="js-map-tray-wrapper">
        {/* If map is visible, show map */}
        {isMapVisible && <WebMapView />}
        <TrayNew />
      </div>
    </ContextProvider>
  );
};

export default AppNew;
