// Import packages
import React, { useContext } from 'react';
// Import contexts
import { FetchDisruptionsContext } from 'globalState';
// Import components
import Header from 'components/ViewToShow/Header/Header';
import LoadingView from 'components/ViewToShow/LoadingView/LoadingView';
import ErrorView from 'components/ViewToShow/ErrorView/ErrorView';
import MapView from 'components/ViewToShow/MapView/MapView';
import ListView from 'components/ViewToShow/ListView/ListView';
// Import custom hooks
import useGETDisruptions from './useGETDisruptions';

function ViewToShow() {
  const [fetchDisruptionState] = useContext(FetchDisruptionsContext);
  const { isFetching, hasError } = useGETDisruptions();

  // Logic to determine what view to render
  let viewToRender;
  // If fetching, show loading view
  if (isFetching) {
    viewToRender = <LoadingView />;
  }
  // If no error then show relevant app view
  else if (!hasError) {
    // If map is visible, show map and tray, else show list view
    viewToRender = fetchDisruptionState.isMapVisible ? <MapView /> : <ListView />;
  }
  // Else something must be wrong, so show error
  else {
    viewToRender = <ErrorView />;
  }

  return (
    <>
      <Header isFetching={isFetching} hasError={hasError} />
      {viewToRender}
    </>
  );
}

export default ViewToShow;
