import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { DebounceInput } from 'react-debounce-input'; // https://www.npmjs.com/package/react-debounce-input

// Import contexts
import { AutoCompleteContext } from 'globalState';

// Import components
import Message from 'components/shared/Message/Message';
import Icon from 'components/shared/Icon/Icon';
import BusAutoCompleteResult from './BusAutoCompleteResult';

const BusAutoComplete = () => {
  const [autoCompleteState, autoCompleteDispatch] = useContext(AutoCompleteContext); // Get the state of modeButtons from modeContext
  const [loading, setLoading] = useState(false); // Set loading state for spinner
  const [errorInfo, setErrorInfo] = useState(); // Placeholder to set error messaging

  const updateQuery = query => {
    // Reset selected disruption ID from map (if any)
    if (autoCompleteState.selectedMapDisruption) {
      autoCompleteDispatch({ type: 'RESET_SELECTED_SERVICE' });
    }
    autoCompleteDispatch({ type: 'UPDATE_QUERY', query });
  };

  useEffect(() => {
    const source = axios.CancelToken.source(); // Set source of cancelToken
    // If autocomplete has query
    if (autoCompleteState.query) {
      setLoading(true); // Update loading state to true as we are hitting API
      axios
        .get(
          `https://firstpasstransapi.azure-api.net/bus/v1/service?q=${encodeURI(
            autoCompleteState.query
          )}`,
          {
            headers: {
              'Ocp-Apim-Subscription-Key': '9d48f1d29bdd402ebd440057717b9743'
            },
            cancelToken: source.token // Set token with API call, so we can cancel this call on unmount
          }
        )
        .then(bus => {
          setLoading(false); // Set loading state to false after data is received
          // If bus.data.services isn't there, then we can't map the results to it, so return null
          autoCompleteDispatch({
            type: 'UPDATE_DATA',
            data: bus.data.services
          }); // Update data state with services returned

          // if no bus data, set error
          if (!bus.data.length) {
            setErrorInfo({
              title: 'No results found',
              message: 'Make sure you are looking for the right service, and try again.'
            });
          }
        })
        .catch(error => {
          if (!axios.isCancel(error)) {
            setLoading(false); // Set loading state to false after data is received
            // Update error message
            setErrorInfo({
              title: 'Please try again',
              message: 'Apologies, we are having technical difficulties.'
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
      source.cancel(); // cancel the request
    };
  }, [autoCompleteDispatch, autoCompleteState.query]);

  return (
    <>
      <div className={`wmnds-autocomplete wmnds-grid ${loading ? 'wmnds-is--loading' : ''}`}>
        <Icon iconName="general-search" iconClass="wmnds-autocomplete__icon" />
        <div className="wmnds-loader" role="alert" aria-live="assertive">
          <p className="wmnds-loader__content">Content is loading...</p>
        </div>
        <DebounceInput
          type="text"
          name="busSearch"
          placeholder="Search for a service"
          className="wmnds-autocomplete__input wmnds-col-1 wmnds"
          value={autoCompleteState.query}
          onChange={e => updateQuery(e.target.value)}
          aria-label="Search for a service"
          // debounceTimeout={600}
        />
      </div>
      {/* If there is no data.length(results) and the user hasn't submitted a query and the state isn't loading then the user should be displayed with no results message, else show results */}
      {!autoCompleteState.data.length && autoCompleteState.query && !loading && errorInfo ? (
        <Message type="error" title={errorInfo.title} message={errorInfo.message} />
      ) : (
        // Only show autocomplete results if there is a query
        autoCompleteState.query && (
          <ul className="wmnds-autocomplete-suggestions">
            {autoCompleteState.data.map(result => (
              <BusAutoCompleteResult key={result.id} result={result} />
            ))}
          </ul>
        )
      )}
    </>
  );
};

export default BusAutoComplete;
