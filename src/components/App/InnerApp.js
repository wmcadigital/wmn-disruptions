// Import packages
import React, { useContext } from 'react';
// Import contexts
import { FetchDisruptionsContext } from 'globalState';
// Import components
import Header from 'components/Header/Header';
import LoadingView from 'components/LoadingView/LoadingView';
import ErrorView from 'components/ErrorView/ErrorView';
import MapView from 'components/MapView/MapView';
import ListView from 'components/ListView/ListView';
// Import custom hooks
import useGETDisruptions from 'customHooks/useGETDisruptions';

const InnerApp = () => {
  const [fetchDisruptionState] = useContext(FetchDisruptionsContext);
  const { isFetching, errorInfo } = useGETDisruptions();

  let viewToRender;

  if (isFetching) {
    viewToRender = <LoadingView />;
  } else if (!errorInfo) {
    // If map is visible, show map and tray, else show list view
    viewToRender = fetchDisruptionState.isMapVisible ? <MapView /> : <ListView />;
  } else {
    viewToRender = <ErrorView message={errorInfo.message} title={errorInfo.title} type="error" />;
  }

  return (
    <>
      <Header />
      {viewToRender}
    </>
  );
};

export default InnerApp;
