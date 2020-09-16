import { useEffect, useContext, useState } from 'react';
import axios from 'axios';
// Import contexts
import { AutoCompleteContext } from 'globalState';

const useAutoCompleteAPI = (apiPath, mode) => {
  const [autoCompleteState, autoCompleteDispatch] = useContext(AutoCompleteContext); // Get the dispatch of autocomplete
  const [loading, setLoading] = useState(false); // Set loading state for spinner
  const [errorInfo, setErrorInfo] = useState(); // Placeholder to set error messaging

  useEffect(() => {
    let mounted = true; // Set mounted to true (used later to make sure we don't do events as component is unmounting)
    const source = axios.CancelToken.source(); // Set source of cancelToken
    // If autocomplete has query
    if (autoCompleteState.query) {
      const { REACT_APP_API_HOST, REACT_APP_API_KEY } = process.env; // Destructure env vars
      setLoading(true); // Update loading state to true as we are hitting API
      axios
        .get(REACT_APP_API_HOST + apiPath, {
          headers: {
            'Ocp-Apim-Subscription-Key': REACT_APP_API_KEY,
          },
          cancelToken: source.token, // Set token with API call, so we can cancel this call on unmount
        })
        .then((response) => {
          setLoading(false); // Set loading state to false after data is received

          // BUS
          if (mode === 'bus') {
            // If response.data.services isn't there, then we can't map the results to it, so return null
            autoCompleteDispatch({
              type: 'UPDATE_DATA',
              data: response.data.services || [],
            }); // Update data state with services returned

            if (autoCompleteState.selectedItem.id && response.data?.services.length) {
              const result = response.data.services.filter(
                (service) => service.id === autoCompleteState.selectedItem.id
              )[0];
              autoCompleteDispatch({
                type: 'UDPATE_SELECTED_ITEM',
                payload: {
                  id: result.id,
                  operator: result.routes[0].operatorCode,
                  severity: result.disruptionSeverity,
                  serviceNumber: result.serviceNumber,
                  routeName: result.routes[0].routeName,
                },
              });
            }
          }
          // TRAM
          else if (mode === 'tram') {
            // If tram.data isn't there, then we can't map the results to it, so return null
            autoCompleteDispatch({
              type: 'UPDATE_DATA',
              data: response.data.data || [],
            }); // Update data state with services returned

            if (autoCompleteState.selectedItem.id && response.data?.data.length) {
              const result = response.data.data.filter(
                (service) => service.id === autoCompleteState.selectedItem.id
              )[0];
              autoCompleteDispatch({
                type: 'UDPATE_SELECTED_ITEM',
                payload: {
                  id: result.id,
                  severity: result?.disruptionDetail?.disruptionSeverity || 'none',
                  stopName: result.name,
                  operator: 'MML1',
                },
              });
            }
          }
          // If there is no bus data and the component is mounted (must be mounted or we will be creating an event on unmounted error)...
          if (!response.data && mounted) {
            // if no bus data, set error
            setErrorInfo({
              title: 'No results found',
              message: 'Make sure you are looking for the right service, and try again.',
            });
          }
        })
        .catch((error) => {
          if (!axios.isCancel(error)) {
            setLoading(false); // Set loading state to false after data is received
            // Update error message
            setErrorInfo({
              title: 'Please try again',
              message: 'Apologies, we are having technical difficulties.',
            });
            // eslint-disable-next-line no-console
            console.log({ error });
          }
        });
    } else {
      setLoading(false);
    }
    // Unmount / cleanup
    return () => {
      mounted = false; // Set mounted back to false on unmount
      source.cancel(); // cancel the request
    };
  }, [
    apiPath,
    autoCompleteDispatch,
    autoCompleteState.query,
    autoCompleteState.selectedItem.id,
    mode,
  ]);

  return { loading, errorInfo };
};

export default useAutoCompleteAPI;
