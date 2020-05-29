// Import packages
import React, { useContext } from 'react';
// Import Contexts
import { FetchDisruptionsContext } from 'globalState';
// Import components
import Header from 'components/Header/Header';
import MapView from 'components/MapView/MapView';
import ListView from 'components/ListView/ListView';
import LoadingView from 'components/LoadingView/LoadingView';
import useGETDisruptions from 'customHooks/useGETDisruptions';

const InnerApp = () => {
  const [fetchDisruptionState] = useContext(FetchDisruptionsContext);
  const { isFetching, errorInfo } = useGETDisruptions();

  return (
    <>
      <Header />
      {isFetching && <LoadingView />}
      {/* If map is visible, show map and tray, else show list view */}
      {!isFetching && fetchDisruptionState.isMapVisible && !errorInfo && <MapView />}
      {!isFetching && !fetchDisruptionState.isMapVisible && !errorInfo && <ListView />}
    </>
  );
};

export default InnerApp;
