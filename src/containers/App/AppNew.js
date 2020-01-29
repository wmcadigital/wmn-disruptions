// Import packages
import React, { useState, useEffect } from 'react';
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
  const [maxTrayHeight, setMaxTrayHeight] = useState(0);

  useEffect(() => {
    const getHeaderHeight = document.getElementsByClassName('wmnds-header')[0].clientHeight;
    const getBreadcrumbHeight = document.getElementsByClassName('wmnds-breadcrumb')[0].clientHeight;
    const getAppHeaderHeight = document.querySelector('#disruptionsApp > .wmnds-container').clientHeight;

    const containerHeight = window.innerHeight - (getHeaderHeight + getBreadcrumbHeight + getAppHeaderHeight);

    setMaxTrayHeight(containerHeight);
  }, []);

  return (
    <ContextProvider>
      <Header isMapVisible={isMapVisible} setIsMapVisible={setIsMapVisible} />

      {/* Else, show list view */}
      {!isMapVisible && <NewListView />}
      <div className={s.mapTrayWrapper} style={{ height: `${maxTrayHeight}px` }}>
        {/* If map is visible, show map */}
        {isMapVisible && <WebMapView mapHeight={maxTrayHeight} />}
        <TrayNew />
      </div>
    </ContextProvider>
  );
};

export default AppNew;
