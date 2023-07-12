import { useEffect, useContext, useState, useRef, useCallback } from 'react';
import axios from 'axios';
// Import contexts
import { AutoCompleteContext } from 'globalState';

const useRoadsAutoCompleteAPI = (query, radius) => {
  // State variables
  const [autoCompleteState, autoCompleteDispatch] = useContext(AutoCompleteContext); // Get the dispatch of autocomplete
  const { selectedLocation } = autoCompleteState;
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false); // Set loading state for spinner
  const [errorInfo, setErrorInfo] = useState(); // Placeholder to set error messaging
  // Reference variables
  const mounted = useRef();
  const source = useRef();
  const apiTimeout = useRef();
  // Helper functions
  const cancelRequest = () => {
    if (source.current) source.current.cancel('Api request timeout');
  };

  const startApiTimeout = useCallback(() => {
    apiTimeout.current = setTimeout(() => {
      cancelRequest();
    }, 15000); // 15 seconds
  }, []);

  const clearApiTimeout = () => clearTimeout(apiTimeout.current);

  const removeDuplicateCandidates = useCallback((apiCandidates) => {
    const uniqueAddresses = [...new Set(apiCandidates.map((candidate) => candidate.address))];
    const uniqueCandidates = uniqueAddresses.map((address) =>
      apiCandidates.find((candidate) => candidate.address === address),
    );
    return uniqueCandidates;
  }, []);

  const handleAutoCompleteApiResponse = useCallback(
    (response) => {
      setLoading(false);
      const { candidates } = response.data || [];
      const apiResults = removeDuplicateCandidates(candidates);
      let payload;

      setResults(apiResults);

      if (selectedLocation.address && apiResults.length) {
        const { address, location } = apiResults.filter(
          (result) => result.address === selectedLocation.address,
        )[0];

        payload = {
          address,
          radius,
          lat: location.y,
          lon: location.x,
        };
      }

      // Update selectedItem based on payload set above if item already selected
      if (selectedLocation.address) {
        autoCompleteDispatch({
          type: 'UPDATE_SELECTED_LOCATION',
          payload,
        });
      }

      if (!apiResults && mounted.current) {
        // If there is no bus data and the component is mounted (must be mounted or we will be creating an event on unmounted error)...
        // if no bus data, set error
        setErrorInfo({
          title: 'No results found',
          message: 'Make sure you are looking for the right service, and try again.',
        });
      }
    },
    [autoCompleteDispatch, radius, removeDuplicateCandidates, selectedLocation.address],
  );

  const handleAutoCompleteApiError = (error) => {
    setLoading(false); // Set loading state to false after data is received
    setErrorInfo({
      // Update error message
      title: 'Please try again',
      message: 'Apologies, we are having technical difficulties.',
      isTimeoutError: axios.isCancel(error),
    });
    setResults([]); // Reset the results so that the dropdown disappears
    if (!axios.isCancel(error)) {
      // eslint-disable-next-line no-console
      console.log({ error });
    }
  };

  // Take main function out of useEffect, so it can be called elsewhere to retry the search
  const getAutoCompleteResults = useCallback(() => {
    source.current = axios.CancelToken.source();
    mounted.current = true; // Set mounted to true (used later to make sure we don't do events as component is unmounting)
    setLoading(true);
    startApiTimeout();
    // Set up correct api path and key
    const { REACT_APP_API_HOST, REACT_APP_ROADS_AUTOCOMPLETE_KEY } = process.env;
    axios
      .get(
        `${REACT_APP_API_HOST}/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?f=pjson&SingleLine=${query}`,
        {
          headers: {
            'Ocp-Apim-Subscription-Key': REACT_APP_ROADS_AUTOCOMPLETE_KEY,
          },
          cancelToken: source.current.token, // Set token with API call, so we can cancel this call on unmount
        },
      )
      .then(handleAutoCompleteApiResponse)
      .catch(handleAutoCompleteApiError);
  }, [handleAutoCompleteApiResponse, query, startApiTimeout]);

  useEffect(() => {
    if (query) {
      getAutoCompleteResults();
    } else {
      setErrorInfo(null);
    }

    // Unmount / cleanup
    return () => {
      mounted.current = false; // Set mounted back to false on unmount
      cancelRequest(); // cancel the request
      clearApiTimeout(); // clear timeout
    };
  }, [getAutoCompleteResults, query]);

  return { loading, errorInfo, results, getAutoCompleteResults };
};

export default useRoadsAutoCompleteAPI;
