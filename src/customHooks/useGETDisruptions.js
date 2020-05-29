import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
// Import Contexts
import { FetchDisruptionsContext } from 'globalState';

const useGETDisruptions = () => {
  const [, setFetchDisruptionsState] = useContext(FetchDisruptionsContext);
  const [isFetching, setIsFetching] = useState(true);
  const [errorInfo, setErrorInfo] = useState(); // Placeholder to set error messaging

  useEffect(() => {
    const { REACT_APP_API_HOST, REACT_APP_API_KEY } = process.env; // Destructure env vars

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
        // eslint-disable-next-line no-console
        console.error({ error });
        // Set error messaging
        setErrorInfo({
          title: 'Please try again',
          message: 'Apologies, we are having technical difficulties.',
        });
      })
      .then(() => {
        setIsFetching(false);
      });
  }, [setFetchDisruptionsState]);

  return { isFetching, errorInfo };
};

export default useGETDisruptions;
