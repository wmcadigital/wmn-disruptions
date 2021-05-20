import React, { useRef } from 'react';
import { DebounceInput } from 'react-debounce-input';
// CustomHooks
import useResetState from 'customHooks/useResetState';
// Components
import Icon from 'components/shared/Icon/Icon';
import Message from 'components/shared/Message/Message';
import SelectedServiceHeader from '../SelectedServiceHeader/SelectedServiceHeader';
import RoadsAutoCompleteResult from './RoadsAutocompleteResult';
// CustomHooks
import useRoadsAutoCompleteAPI from '../customHooks/useRoadsAutoCompleteAPI';
import useHandleAutoCompleteKeys from '../customHooks/useHandleAutoCompleteKeys';

import s from './RoadsAutocomplete.module.scss';

const minRadius = 3;
const maxRadius = 10;
const clampRadius = (value) => Math.min(Math.max(value, minRadius), maxRadius);

const RoadsAutoComplete = () => {
  const { updateQuery, autoCompleteState, autoCompleteDispatch } = useResetState();
  const radius = autoCompleteState.selectedLocation.radius || minRadius;

  // Create refs
  const resultsList = useRef(null);
  const debounceInput = useRef(null);

  // Import handleKeyDown function from customHook (used by all modes)
  const { handleKeyDown } = useHandleAutoCompleteKeys(
    resultsList,
    DebounceInput,
    autoCompleteState
  );

  const updateRadius = (value) => {
    autoCompleteDispatch({
      type: 'UPDATE_SELECTED_LOCATION_RADIUS',
      payload: clampRadius(value),
    });
  };
  const incrementRadius = () => updateRadius(radius + 1);
  const decrementRadius = () => updateRadius(radius - 1);

  const { loading, errorInfo, results, getAutoCompleteResults } = useRoadsAutoCompleteAPI(
    autoCompleteState.query,
    radius
  );

  return (
    <>
      {autoCompleteState.selectedLocation.address ? (
        <SelectedServiceHeader
          autoCompleteState={autoCompleteState}
          autoCompleteDispatch={() => autoCompleteDispatch({ type: 'RESET_SELECTED_SERVICES' })}
          mode="roads"
        />
      ) : (
        <>
          <div className={`wmnds-autocomplete wmnds-grid ${loading ? 'wmnds-is--loading' : ''}`}>
            <Icon iconName="general-search" iconClass="wmnds-autocomplete__icon" />
            <div className="wmnds-loader" role="alert" aria-live="assertive">
              <p className="wmnds-loader__content">Content is loading...</p>
            </div>
            <DebounceInput
              type="text"
              name="roadsSearch"
              placeholder="Search"
              className="wmnds-fe-input wmnds-autocomplete__input wmnds-col-1"
              value={autoCompleteState.query || ''}
              onChange={(e) => updateQuery(e.target.value)}
              aria-label="Search for a postcode, road name or place of interest"
              debounceTimeout={600}
              onKeyDown={(e) => handleKeyDown(e)}
              inputRef={debounceInput}
            />
          </div>
          {/* If there is no data.length(results) and the user hasn't submitted a query and the state isn't loading then the user should be displayed with no results message, else show results */}
          {!results.length && autoCompleteState.query && !loading && errorInfo ? (
            <Message
              type="error"
              title={errorInfo.title}
              message={errorInfo.message}
              showRetry={errorInfo?.isTimeoutError}
              retryCallback={getAutoCompleteResults}
            />
          ) : (
            // Only show autocomplete results if there is a query
            autoCompleteState.query && (
              <ul className="wmnds-autocomplete-suggestions" ref={resultsList}>
                {results
                  .sort((a, b) => b.score - a.score)
                  .map((result) => (
                    <RoadsAutoCompleteResult
                      key={result.location.x + result.location.y}
                      result={result}
                      radius={radius}
                      handleKeyDown={handleKeyDown}
                    />
                  ))}
              </ul>
            )
          )}
        </>
      )}
      {autoCompleteState.selectedLocation.address && (
        <div className="wmnds-col-1 wmnds-m-b-md">
          <h4>Enter search radius (miles)</h4>
          <div className={` ${s.numberInput}`}>
            <button
              type="button"
              className={`${s.numberInputButton}`}
              onClick={decrementRadius}
              aria-label="Decrease radius by 1"
            >
              <Icon iconName="general-minimise" iconClass="wmnds-autocomplete__icon" />
            </button>
            <input
              type="number"
              name="searchRadius"
              value={radius}
              min={minRadius}
              max={maxRadius}
              onChange={(e) => updateRadius(e.target.value)}
              className={`wmnds-fe-input wmnds-autocomplete__input wmnds-p-l-sm wmnds-text-align-center ${s.numberInputInput}`}
              aria-label="Enter search radius in miles"
            />
            <button
              type="button"
              className={`${s.numberInputButton}`}
              onClick={incrementRadius}
              aria-label="Increase radius by 1"
            >
              <Icon iconName="general-expand" iconClass="wmnds-autocomplete__icon" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default RoadsAutoComplete;
