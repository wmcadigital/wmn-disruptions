// Import packages
import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
// Import Contexts
import { FetchDisruptionsContext } from 'globalState';
// Import components
import Header from 'components/Header/Header';
import MapView from 'components/MapView/MapView';
import ListView from 'components/ListView/ListView';
import LoadingView from 'components/LoadingView/LoadingView';

const InnerApp = () => {
  const [fetchDisruptionState, setFetchDisruptionsState] = useContext(FetchDisruptionsContext);

  const [errorInfo, setErrorInfo] = useState(); // Placeholder to set error messaging

  useEffect(() => {
    const { REACT_APP_API_HOST, REACT_APP_API_KEY } = process.env; // Destructure env vars
    setFetchDisruptionsState((prevState) => ({ ...prevState, isFetching: true }));

    axios
      .get(`${REACT_APP_API_HOST}/Disruption/v2`, {
        headers: {
          'Ocp-Apim-Subscription-Key': REACT_APP_API_KEY,
        },
      })
      .then((response) => {
        setFetchDisruptionsState((prevState) => ({
          ...prevState,
          data: response.data.disruptions,
        }));
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          /* eslint-disable no-console */
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          /* eslint-enable no-console */
        }
        setErrorInfo({
          title: 'Please try again',
          message: 'Apologies, we are having technical difficulties.',
        });
      })
      .then(() => {
        setFetchDisruptionsState((prevState) => ({ ...prevState, isFetching: false }));
      });
  }, [setFetchDisruptionsState]);

  return (
    <>
      <Header />
      {fetchDisruptionState.isFetching && <LoadingView />}
      {/* If map is visible, show map and tray, else show list view */}
      {!fetchDisruptionState.isFetching && fetchDisruptionState.isMapVisible && !errorInfo && (
        <MapView />
      )}
      {!fetchDisruptionState.isFetching && !fetchDisruptionState.isMapVisible && !errorInfo && (
        <ListView />
      )}
    </>
  );
};

export default InnerApp;
