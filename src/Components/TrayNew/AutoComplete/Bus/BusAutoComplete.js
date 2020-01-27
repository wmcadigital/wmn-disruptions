import React, { useContext } from 'react';

// Import contexts
import { AutoCompleteContext } from '../AutoCompleteContext';
// Import components
import Icon from '../../../Icon/Icon';
import BusAutoCompleteResults from './BusAutoCompleteResults';

const BusAutoComplete = () => {
  const [autoCompleteState, autoCompleteDispatch] = useContext(AutoCompleteContext); // Get the state of modeButtons from modeContext

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
      <BusAutoCompleteResults query={autoCompleteState.query} />
    </>
  );
};

export default BusAutoComplete;
