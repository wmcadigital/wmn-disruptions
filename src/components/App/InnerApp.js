// Import packages
import React, { useEffect, useContext } from 'react';
import axios from 'axios';
// Import Contexts
import { FetchDisruptionsContext } from 'globalState';
// Import components
import Header from 'components/Header/Header';
import MapView from 'components/MapView/MapView';
import ListView from 'components/ListView/ListView';

const InnerApp = () => {
  const [fetchDisruptionState, setFetchDisruptionsState] = useContext(FetchDisruptionsContext);

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
      })
      .then(() => {
        setFetchDisruptionsState((prevState) => ({ ...prevState, isFetching: false }));
      });
  }, [setFetchDisruptionsState]);

  return (
    <>
      <Header />

      {/* If map is visible, show map and tray, else show list view */}
      {fetchDisruptionState.isMapVisible ? <MapView /> : <ListView />}
    </>
  );
};

export default InnerApp;
