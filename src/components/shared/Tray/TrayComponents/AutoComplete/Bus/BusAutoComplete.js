import React, { useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import { DebounceInput } from 'react-debounce-input'; // https://www.npmjs.com/package/react-debounce-input

// Import contexts
import { AutoCompleteContext } from 'globalState';

// Import components
import Icon from 'components/shared/Icon/Icon';
import BusAutoCompleteResult from './BusAutoCompleteResult';

const BusAutoComplete = () => {
  const [autoCompleteState, autoCompleteDispatch] = useContext(AutoCompleteContext); // Get the state of modeButtons from modeContext
  const loading = useRef(false); // Set loading ref for spinner (set as ref and not state to stop below useEffect re-rendering)

  useEffect(() => {
    const source = axios.CancelToken.source(); // Set source of cancelToken
    // If autocomplete has query
    if (autoCompleteState.query) {
      loading.current = true; // Update loading state to true as we are hitting API
      axios
        .get(
          `https://trasnport-api-isruptions-v2.azure-api.net/bus/v1/service?q=${autoCompleteState.query}`,
          {
            headers: {
              'Ocp-Apim-Subscription-Key': '55060e2bfbf743c5829b9eef583506f7'
            },
            cancelToken: source.token // Set token with API call, so we can cancel this call on unmount
          }
        )
        .then(bus => {
          // If bus.data.services isn't there, then we can't map the results to it, so return null
          return bus.data.services
            ? autoCompleteDispatch({
                type: 'UPDATE_DATA',
                data: bus.data.services
              })
            : null; // Update data state with services returned
        })
        .catch(error => {
          // handle error
          console.log(error);
        })
        .then(() => {
          loading.current = false; // Set loading state to false after data is received
        });
    }
    // Unmount / cleanup
    return () => {
      source.cancel(); // cancel the request
    };
  }, [autoCompleteDispatch, autoCompleteState.query]);

  return (
    <>
      <div
        className={`wmnds-autocomplete wmnds-grid ${loading.current ? 'wmnds-is--loading' : ''}`}
      >
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
          onChange={e => autoCompleteDispatch({ type: 'UPDATE_QUERY', query: e.target.value })}
          aria-label="Search for a service"
          // debounceTimeout={600}
        />
      </div>
      {/* If there is no data.length(results) and the user hasn't submitted a query and the state isn't loading then the user should be displayed with no results message, else show results */}
      {!autoCompleteState.data.length && autoCompleteState.query && !loading.current ? (
        <p className="wmnds-col-1 wmnds-m-t-sm">
          {'Oops! Sorry, no results have been found for '}
          <strong>{autoCompleteState.query}</strong>
          {'. '}
          <br />
          <br />
          Please try searching for another service.
        </p>
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
