// Import packages
import React, { useState } from 'react';

// Import components
import ContextProvider from 'globalState/ContextProvider';
import MainHeader from 'Components/MainHeader/MainHeader';
import WebMapView from 'Components/Map/Map';
import TrayNew from 'Components/TrayNew/TrayNew';
import Breadcrumbs from 'Components/Breadcrumbs/Breadcrumbs';
import NewListView from 'Components/NewListViews/NewListView';
import Button from 'Components/Button/Button';

// Import styles
import s from './App.scss';

const AppNew = () => {
  const [isMapVisible, setIsMapVisible] = useState(true);

  return (
    <ContextProvider>
      <div className={`{s.app} header`}>
        <MainHeader />
        <Breadcrumbs />
        <div className={`wmnds-grid wmnds-grid--justify-between ${s.container}`}>
          <h1 className={`${s.title} wmnds-col-1 wmnds-col-sm-auto`}>Disruptions</h1>

          <div className={`${s.btnContainer} wmnds-col-1 wmnds-col-sm-auto`}>
            <Button
              btnClass="wmnds-btn--secondary wmnds-float--right"
              onClick={() => setIsMapVisible(!isMapVisible)}
              iconRight="general-chevron-right"
              text={isMapVisible ? 'List View' : 'Map View'}
            />
          </div>
        </div>
        {/* If map is visible, show map */}
        {isMapVisible && <WebMapView />}

        {/* Else, show list view */}
        {!isMapVisible && <NewListView />}

        <TrayNew />
      </div>
    </ContextProvider>
  );
};

export default AppNew;
