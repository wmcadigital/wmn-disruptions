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
    const fetchData = async () => {
      const randomString = Math.random().toString(36).substring(2, 15); // Generate random string
      try {
        const response = await axios.get(`${REACT_APP_API_HOST}/Disruption/v2`, {
          headers: {
            'Ocp-Apim-Subscription-Key': REACT_APP_API_KEY,
          },
          params: {
            random: randomString,
          },
        });
        setFetchDisruptionsState((prevState) => ({
          ...prevState,
          data: response.data.disruptions,
        }));
        if (response.status === 200) {
          console.log(
            `Request successful - ${new Date().toISOString()} - randomString: ${randomString}`
          );
        } else {
          console.log(
            `Service unavailable - ${new Date().toISOString()} - randomString: ${randomString}`
          );
        }
        setHasError(false);
      } catch (error) {
        console.error({ error });
        console.log(
          `Service unavailable - ${new Date().toISOString()} - randomString: ${randomString}`
        );
        setHasError(true);
      }
      setIsFetching(false);
    };
    fetchData();
    const intervalId = setInterval(fetchData, 30000); // Call fetchData every 30 seconds
    return () => clearInterval(intervalId);
  }, [setFetchDisruptionsState]);

  return { isFetching, hasError };
};
export default useGETDisruptions;
