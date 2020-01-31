import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { DebounceInput } from 'react-debounce-input'; // https://www.npmjs.com/package/react-debounce-input

// Import contexts
import { AutoCompleteContext } from 'globalState';

// Import components
import Icon from 'components/shared/Icon/Icon';
import BusAutoCompleteResult from './BusAutoCompleteResult';

const BusAutoComplete = () => {
  const [autoCompleteState, autoCompleteDispatch] = useContext(AutoCompleteContext); // Get the state of modeButtons from modeContext
  const [loading, setLoading] = useState(); // set state for loading spinner
  const [data, setData] = useState([]); // Placeholder for mapping data to

  useEffect(() => {
    if (autoCompleteState.query) {
      setLoading(true); // Update loading state to true as we are hitting API
      axios
        .get(`https://trasnport-api-isruptions-v2.azure-api.net/bus/v1/service?q=${autoCompleteState.query}`, {
          headers: {
            'Ocp-Apim-Subscription-Key': '55060e2bfbf743c5829b9eef583506f7'
          }
        })
        .then(bus => {
          setData(bus.data.services); // Update data state with services returned
          setLoading(false); // Set loading state to false after data is received
        });
    }
  }, [autoCompleteDispatch, data.length, autoCompleteState.query]);

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
          className="wmnds-autocomplete__input wmnds-col-1"
          value={autoCompleteState.query}
          onChange={e => autoCompleteDispatch({ type: 'UPDATE_QUERY', query: e.target.value })}
          aria-label="Search for a service"
          debounceTimeout={600}
        />
      </div>
      {/* If there is no data.length(results) and the user hasn't submitted a query and the state isn't loading then the user should be displayed with no results message, else show results */}
      {!data.length && autoCompleteState.query && !loading ? (
        <p className="wmnds-col-1 wmnds-m-t-sm">
          {'Oops! Sorry, no results have been found for '}
          <strong>{autoCompleteState.query}</strong>
          {'. '}
          <br />
          <br />
          Please try searching for another service.
        </p>
      ) : (
        <ul className="wmnds-autocomplete-suggestions">
          {data.map(result => (
            <BusAutoCompleteResult key={result.id} result={result} />
          ))}
        </ul>
      )}
    </>
  );
};

export default BusAutoComplete;
