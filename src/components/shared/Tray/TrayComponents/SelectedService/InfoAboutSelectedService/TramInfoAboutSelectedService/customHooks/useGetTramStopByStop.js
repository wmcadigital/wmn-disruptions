import { useState, useEffect, useContext, useCallback, useRef } from 'react';
import axios from 'axios';
import { AutoCompleteContext } from 'globalState';

const useGetTramStopByStop = () => {
  // State variables
  const [autoCompleteState, autoCompleteDispatch] = useContext(AutoCompleteContext);
  const { selectedItem, selectedItemTo } = autoCompleteState;
  const [loading, setLoading] = useState(false);
  const [errorInfo, setErrorInfo] = useState(null);
  // Reference variables
  const mounted = useRef();
  const source = useRef();
  const apiTimeout = useRef();
  // Helper booleans
  const bothStopsSelected = selectedItem.id && selectedItemTo.id;
  const bothStopsEqual = selectedItem.id === selectedItemTo.id;
  const stopsAlreadyFetched = (() => {
    if (!bothStopsSelected || !selectedItem.lines.length) return false;
    const comparisonIds = selectedItem.lines.map((line) => line.atcoCode);
    return (
      comparisonIds.indexOf(selectedItem.id) > -1 && comparisonIds.indexOf(selectedItemTo.id) > -1
    );
  })();
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

  const handleAutoCompleteApiResponse = useCallback(
    (response) => {
      setLoading(false);
      // Update selectedItem.lines with inbetween lines to match the user's input
      const lines = response.data || [];

      if (lines.length) {
        autoCompleteDispatch({
          type: 'UDPATE_SELECTED_ITEM_LINES',
          // API returns the stops in a certain direction so we check the first element to see if it must be reversed
          payload: lines[0].atcoCode === selectedItem.id ? lines : lines.reverse(),
        });
      } else {
        setErrorInfo({
          title: 'Please try again',
          message: "Apologies, we couldn't load the in-between tram stops.",
        });
      }
    },
    [autoCompleteDispatch, selectedItem.id]
  );

  const handleAutoCompleteApiError = (error) => {
    setLoading(false);
    // Update error message
    setErrorInfo({
      title: 'Please try again',
      message: 'Apologies, we are having technical difficulties.',
    });
    if (!axios.isCancel(error)) {
      // eslint-disable-next-line no-console
      console.log({ error });
    }
  };

  const getInBetweenTramStops = useCallback(() => {
    source.current = axios.CancelToken.source();
    mounted.current = true; // Set mounted to true (used later to make sure we don't do events as component is unmounting)
    const { REACT_APP_API_HOST, REACT_APP_API_KEY } = process.env; // Destructure env vars
    setLoading(true); // Update loading state to true as we are hitting API
    startApiTimeout();
    axios
      .get(
        `${REACT_APP_API_HOST}/Metro/v2/stopsbetween/${selectedItem.naPTAN}/${selectedItemTo.naPTAN}`,
        {
          headers: {
            'Ocp-Apim-Subscription-Key': REACT_APP_API_KEY,
          },
          cancelToken: source.current.token, // Set token with API call, so we can cancel this call on unmount
        }
      )
      .then(handleAutoCompleteApiResponse)
      .catch(handleAutoCompleteApiError);
  }, [handleAutoCompleteApiResponse, selectedItem.naPTAN, selectedItemTo.naPTAN, startApiTimeout]);

  useEffect(() => {
    setErrorInfo(null);
    if (bothStopsSelected && !bothStopsEqual && !stopsAlreadyFetched) {
      getInBetweenTramStops();
    }

    return () => {
      mounted.current = false; // Set mounted back to false on unmount
      cancelRequest(); // cancel the request
      clearApiTimeout(); // clear timeout
    };
  }, [bothStopsEqual, bothStopsSelected, getInBetweenTramStops, stopsAlreadyFetched]);

  return { loading, errorInfo, autoCompleteState, getInBetweenTramStops };
};

export default useGetTramStopByStop;
