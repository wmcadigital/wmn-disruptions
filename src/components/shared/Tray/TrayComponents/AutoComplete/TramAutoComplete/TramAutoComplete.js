import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { DebounceInput } from 'react-debounce-input'; // https://www.npmjs.com/package/react-debounce-input
// CustomHooks
import useResetState from 'customHooks/useResetState';
// Import components
import Message from 'components/shared/Message/Message';
import Icon from 'components/shared/Icon/Icon';
import TramAutoCompleteResult from './TramAutoCompleteResult/TramAutoCompleteResult';
// CustomHooks
import useHandleAutoCompleteKeys from '../customHooks/useHandleAutoCompleteKeys';

const TramAutoComplete = () => {
  const { updateQuery, autoCompleteState, autoCompleteDispatch } = useResetState();
  const [loading, setLoading] = useState(false); // Set loading state for spinner
  const [errorInfo, setErrorInfo] = useState(); // Placeholder to set error messaging
  const resultsList = useRef(null);
  const debounceInput = useRef(null);

  // Import handleKeyDown function from customHook (used by all modes)
  const { handleKeyDown } = useHandleAutoCompleteKeys(
    resultsList,
    DebounceInput,
    autoCompleteState
  );

  useEffect(() => {
    let mounted = true; // Set mounted to true (used later to make sure we don't do events as component is unmounting)
    const source = axios.CancelToken.source(); // Set source of cancelToken
    // If autocomplete has query
    if (autoCompleteState.query) {
      const { REACT_APP_API_HOST, REACT_APP_API_KEY } = process.env; // Destructure env vars
      setLoading(true); // Update loading state to true as we are hitting API
      axios
        .get(`${REACT_APP_API_HOST}/metro/v1/stop?q=${encodeURI(autoCompleteState.query)}`, {
          headers: {
            'Ocp-Apim-Subscription-Key': REACT_APP_API_KEY,
          },
          cancelToken: source.token, // Set token with API call, so we can cancel this call on unmount
        })
        .then((tram) => {
          setLoading(false); // Set loading state to false after data is received
          // If tram.data isn't there, then we can't map the results to it, so return null
          autoCompleteDispatch({
            type: 'UPDATE_DATA',
            data: tram.data.data || [],
          }); // Update data state with services returned

          if (autoCompleteState.selectedItem.id && tram.data?.data.length) {
            const result = tram.data.data.filter(
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
          // If there is no tram data and the component is mounted (must be mounted or we will be creating an event on unmounted error)...
          if (!tram.data.data.length && mounted) {
            // if no tram data, set error
            setErrorInfo({
              title: 'No results found',
              message: 'Make sure you are looking for the right tram stop, and try again.',
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
  }, [autoCompleteDispatch, autoCompleteState.query, autoCompleteState.selectedItem.id]);

  return (
    <>
      <div className={`wmnds-autocomplete wmnds-grid ${loading ? 'wmnds-is--loading' : ''}`}>
        <Icon iconName="general-search" iconClass="wmnds-autocomplete__icon" />
        <div className="wmnds-loader" role="alert" aria-live="assertive">
          <p className="wmnds-loader__content">Content is loading...</p>
        </div>
        <DebounceInput
          type="text"
          name="tramSearch"
          placeholder="Search for a stop"
          className="wmnds-fe-input wmnds-autocomplete__input wmnds-col-1"
          value={autoCompleteState.query || ''}
          onChange={(e) => updateQuery(e.target.value)}
          aria-label="Search for a stop"
          debounceTimeout={600}
          onKeyDown={(e) => handleKeyDown(e)}
          inputRef={debounceInput}
        />
      </div>
      {/* If there is no data.length(results) and the user hasn't submitted a query and the state isn't loading then the user should be displayed with no results message, else show results */}
      {!autoCompleteState.data.length && autoCompleteState.query && !loading && errorInfo ? (
        <Message type="error" title={errorInfo.title} message={errorInfo.message} />
      ) : (
        // Only show autocomplete results if there is a query
        autoCompleteState.query && (
          <ul className="wmnds-autocomplete-suggestions" ref={resultsList}>
            {autoCompleteState.data.map((result) => (
              <TramAutoCompleteResult
                key={result.id}
                result={result}
                handleKeyDown={handleKeyDown}
              />
            ))}
          </ul>
        )
      )}
    </>
  );
};

export default TramAutoComplete;
