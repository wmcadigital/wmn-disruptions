import React, { useContext, useEffect } from 'react';
import axios from 'axios';

// Import contexts
import { AutoCompleteContext } from '../AutoCompleteContext';

// Import components
import Icon from '../../../Icon/Icon';
import BusAutoCompleteResult from './BusAutoCompleteResult';

const BusAutoComplete = () => {
  const [autoCompleteState, autoCompleteDispatch] = useContext(AutoCompleteContext); // Get the state of modeButtons from modeContext

  useEffect(() => {
    if (autoCompleteState.query) {
      axios
        .get(`https://trasnport-api-isruptions-v2.azure-api.net/bus/v1/service?q=${autoCompleteState.query}`, {
          headers: {
            'Ocp-Apim-Subscription-Key': '55060e2bfbf743c5829b9eef583506f7'
          }
        })
        .then(bus => {
          autoCompleteDispatch({ type: 'UPDATE_DATA', data: bus.data.services });
        });
    }
  }, [autoCompleteDispatch, autoCompleteState.query]);

  return (
    <>
      <div className="wmnds-autocomplete wmnds-grid">
        <Icon iconName="general-search" iconClass="wmnds-autocomplete__icon" />
        <div className="wmnds-loader" role="alert" aria-live="assertive">
          <p className="wmnds-loader__content">Content is loading...</p>
        </div>
        <input
          type="text"
          name="busSearch"
          placeholder="Search for a service"
          className="wmnds-autocomplete__input wmnds-col-1"
          value={autoCompleteState.query}
          onChange={e => autoCompleteDispatch({ type: 'UPDATE_QUERY', query: e.target.value })}
          aria-label="Search for a service"
        />
      </div>
      <ul className="wmnds-autocomplete-suggestions">
        {autoCompleteState.data.map(result => (
          <BusAutoCompleteResult key={result.id} result={result} />
        ))}
      </ul>
    </>
  );
};

export default BusAutoComplete;
