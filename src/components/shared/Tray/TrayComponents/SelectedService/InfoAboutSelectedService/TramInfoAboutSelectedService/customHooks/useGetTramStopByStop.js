import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AutoCompleteContext } from 'globalState';

const useGetTramStopByStop = () => {
  const [autoCompleteState, autoCompleteDispatch] = useContext(AutoCompleteContext);
  const { selectedItem, selectedItemTo } = autoCompleteState;
  // Intitialise state
  const [loading, setLoading] = useState(false);
  const [errorInfo, setErrorInfo] = useState();

  const bothStopsSelected = selectedItem.id && selectedItemTo.id;
  const bothStopsEqual = selectedItem.id === selectedItemTo.id;

  useEffect(() => {
    if (!bothStopsSelected || bothStopsEqual) {
      return;
    }

    setLoading(true);
    setErrorInfo();

    const source = axios.CancelToken.source(); // Set source of cancelToken
    const { REACT_APP_API_HOST, REACT_APP_API_KEY } = process.env; // Destructure env vars

    axios
      .get(`${REACT_APP_API_HOST}/Metro/v2/stopsbetween/${selectedItem.id}/${selectedItemTo.id}`, {
        headers: {
          'Ocp-Apim-Subscription-Key': REACT_APP_API_KEY,
        },
        cancelToken: source.token, // Set token with API call, so we can cancel this call on unmount
      })
      .then((response) => {
        setLoading(false);
        // Update selectedItem.lines with inbetween lines to match the user's input
        const lines = response.data?.data;

        if (!lines) {
          return setErrorInfo({
            title: 'No results found',
            message: 'Make sure you are looking for the right service, and try again.',
          });
        }

        return autoCompleteDispatch({
          type: 'UDPATE_SELECTED_ITEM_LINES',
          // API returns the stops in a certain direction so we check the first element to see if it must be reversed
          payload: lines[0].atcoCode === selectedItem.id ? lines : lines.reverse(),
        });
      })
      .catch((error) => {
        setLoading(false);
        if (!axios.isCancel(error)) {
          // Update error message
          setErrorInfo({
            title: 'Please try again',
            message: 'Apologies, we are having technical difficulties.',
          });
          // eslint-disable-next-line no-console
          console.log({ error });
        }
      });
  }, [autoCompleteDispatch, bothStopsEqual, bothStopsSelected, selectedItem.id, selectedItemTo.id]);

  return { loading, errorInfo };
};

export default useGetTramStopByStop;
