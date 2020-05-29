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
import Message from 'components/shared/Message/Message';

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
    viewToRender = <Message message={errorInfo.message} title={errorInfo.title} type="error" />;
  }

  return (
    <>
      <Header />
      {viewToRender}
    </>
  );
};

export default InnerApp;
