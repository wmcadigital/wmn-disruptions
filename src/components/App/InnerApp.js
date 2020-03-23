/* eslint-disable no-console */
// Import packages
import React, { useEffect, useContext } from 'react';
import axios from 'axios';
// Import components
import { FetchDisruptionsContext } from 'globalState';
import Header from 'components/Header/Header';
import MapView from 'components/MapView/MapView';
import ListView from 'components/ListView/ListView';

const InnerApp = () => {
  const [fetchDisruptionState, setFetchDisruptionsState] = useContext(FetchDisruptionsContext);

  useEffect(() => {
    setFetchDisruptionsState((prevState) => ({ ...prevState, isFetching: true }));
    axios
      .get('https://trasnport-api-jon-dev.azure-api.net/Disruption/v2', {
        headers: {
          'Ocp-Apim-Subscription-Key': '9a2a6bd91c8f49598089ecb5448b45ef',
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
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      })
      .then(() => {
        setFetchDisruptionsState((prevState) => ({ ...prevState, isFetching: false }));
      });
  }, [setFetchDisruptionsState]);

  return (
    <>
      <Header
        isMapVisible={fetchDisruptionState.isMapVisible}
        setIsMapVisible={fetchDisruptionState.setIsMapVisible}
      />

      {/* If map is visible, show map and tray, else show list view */}
      {fetchDisruptionState.isMapVisible ? <MapView /> : <ListView />}
    </>
  );
};

export default InnerApp;
