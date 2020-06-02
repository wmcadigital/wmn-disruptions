import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
// Import Contexts
import { FetchDisruptionsContext } from 'globalState';

const useGETDisruptions = () => {
  const [, setFetchDisruptionsState] = useContext(FetchDisruptionsContext);
  const [isFetching, setIsFetching] = useState(true);
  const [hasError, setHasError] = useState(false); // Placeholder to set error messaging

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
        setHasError(true);
      })
      .then(() => {
        setIsFetching(false);
      });
  }, [setFetchDisruptionsState]);

  return { isFetching, hasError };
};

export default useGETDisruptions;
