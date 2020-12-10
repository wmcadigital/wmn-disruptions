import { useEffect, useContext, useState, useRef } from 'react';
import axios from 'axios';
// Import contexts
import { AutoCompleteContext } from 'globalState';

const useAutoCompleteAPI = (apiPath, mode, query, to) => {
  const [autoCompleteState, autoCompleteDispatch] = useContext(AutoCompleteContext); // Get the dispatch of autocomplete
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false); // Set loading state for spinner
  const [errorInfo, setErrorInfo] = useState(); // Placeholder to set error messaging
  const selectedService = to ? autoCompleteState.selectedItemTo : autoCompleteState.selectedItem;
  // Vars used to timeout the axios request
  const apiTimeout = useRef();
  const cancelRequest = (token) => token.cancel();

  useEffect(() => {
    let mounted = true; // Set mounted to true (used later to make sure we don't do events as component is unmounting)
    const source = axios.CancelToken.source(); // Set source of cancelToken
    // If autocomplete has query
    if (query) {
      const { REACT_APP_API_HOST, REACT_APP_API_KEY } = process.env; // Destructure env vars
      setLoading(true); // Update loading state to true as we are hitting API
      apiTimeout.current = setTimeout(() => cancelRequest(source), 1500);
      axios
        .get(REACT_APP_API_HOST + apiPath, {
          headers: {
            'Ocp-Apim-Subscription-Key': REACT_APP_API_KEY,
          },
          cancelToken: source.token, // Set token with API call, so we can cancel this call on unmount
        })
        .then((response) => {
          setLoading(false); // Set loading state to false after data is received
          clearTimeout(apiTimeout.current);
          let payload;
          // BUS
          if (mode === 'bus') {
            setResults(response.data.services || []); // If response.data.services isn't there, then we can't map the results to it, so return null

            if (selectedService.id && response.data?.services.length) {
              const result = response.data.services.filter(
                (service) => service.id === selectedService.id
              )[0];

              payload = {
                id: result.id,
                operator: result.routes[0].operatorCode,
                severity: result.disruptionSeverity,
                serviceNumber: result.serviceNumber,
                routeName: result.routes[0].routeName,
                to,
              };
            }
          }
          // TRAM
          else if (mode === 'tram') {
            setResults(response.data.data || []);

            if (selectedService.id && response.data?.data.length) {
              const result = response.data.data.filter(
                (service) => service.id === selectedService.id
              )[0];

              payload = {
                id: result.id,
                severity: result?.disruptionDetail?.disruptionSeverity || 'none',
                stopName: result.name,
                operator: mode === 'tram' ? 'MML1' : null,
                to,
              };
            }
          } else if (mode === 'train') {
            setResults(response.data.data || []);

            if (selectedService.id && response.data?.data.length) {
              const result = response.data.data.filter(
                (service) => service.id === selectedService.id
              )[0];

              payload = {
                id: result.id,
                severity: result?.disruptionSeverity || 'success',
                stopName: result.name,
                lines: result.lines,
                to,
              };
            }
          }

          // Update selectedItem based on payload set above if item already selected
          if (selectedService.id) {
            autoCompleteDispatch({
              type: 'UDPATE_SELECTED_ITEM',
              payload,
            });
          }

          if ((!response.data.data || !response.data.services) && mounted) {
            // If there is no bus data and the component is mounted (must be mounted or we will be creating an event on unmounted error)...
            // if no bus data, set error
            setErrorInfo({
              title: 'No results found',
              message: 'Make sure you are looking for the right service, and try again.',
            });
          }
        })
        .catch((error) => {
          setLoading(false); // Set loading state to false after data is received
          setErrorInfo({
            // Update error message
            title: 'Please try again',
            message: 'Apologies, we are having technical difficulties.',
            timeoutError: axios.isCancel(error),
          });
          setResults([]); // Reset the results so that the dropdown disappears
          if (!axios.isCancel(error)) {
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
      clearTimeout(apiTimeout.current); // clear timeout
    };
  }, [apiPath, autoCompleteDispatch, selectedService.id, mode, query, to]);

  return { loading, errorInfo, results };
};

export default useAutoCompleteAPI;
