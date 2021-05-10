import React, { useState, useEffect, useRef } from 'react';
import { DebounceInput } from 'react-debounce-input';
// CustomHooks
import useResetState from 'customHooks/useResetState';
// Components
import Icon from 'components/shared/Icon/Icon';
import Message from 'components/shared/Message/Message';
import SelectedServiceHeader from '../SelectedServiceHeader/SelectedServiceHeader';
import RoadsAutoCompleteResult from './RoadsAutocompleteResult';
// CustomHooks
// import useAutoCompleteAPI from '../customHooks/useAutoCompleteAPI';
import useHandleAutoCompleteKeys from '../customHooks/useHandleAutoCompleteKeys';

import s from './RoadsAutocomplete.module.scss';

const minRadius = 3;
const maxRadius = 20;

const RoadsAutoComplete = () => {
  const { updateQuery, autoCompleteState, autoCompleteDispatch } = useResetState();
  const [radius, setRadius] = useState(minRadius);

  // Update the radius when it's changed
  useEffect(() => {
    if (!autoCompleteState.selectedItem.address) return;

    autoCompleteDispatch({
      type: 'UPDATE_SELECTED_ITEM_RADIUS',
      payload: radius,
    });
  }, [radius, autoCompleteDispatch, autoCompleteState.selectedItem.address]);

  // Create refs
  const resultsList = useRef(null);
  const debounceInput = useRef(null);

  // Import handleKeyDown function from customHook (used by all modes)
  const { handleKeyDown } = useHandleAutoCompleteKeys(
    resultsList,
    DebounceInput,
    autoCompleteState
  );

  const increment = () => setRadius((prevRadius) => Math.min(maxRadius, prevRadius + 1));
  const decrement = () => setRadius((prevRadius) => Math.max(minRadius, prevRadius - 1));

  // PLACEHOLER VARIABLES UNTIL API CAN BE CALLED
  const loading = false;
  const errorInfo = null;
  const getAutoCompleteResults = () => console.log('fetching');
  const results = [
    {
      address: 'B1 2AA',
      location: {
        x: -1.9143199836436224,
        y: 52.480439987257341,
      },
      score: 100,
      attributes: {},
      extent: {
        xmin: -1.9153199836436223,
        ymin: 52.479439987257344,
        xmax: -1.9133199836436225,
        ymax: 52.481439987257339,
      },
    },
    {
      address: 'B12 0AA',
      location: {
        x: -1.885639960824335,
        y: 52.473219983500059,
      },
      score: 95,
      attributes: {},
      extent: {
        xmin: -1.8866399608243349,
        ymin: 52.472219983500061,
        xmax: -1.8846399608243352,
        ymax: 52.474219983500056,
      },
    },
    {
      address: 'B12 9AA',
      location: {
        x: -1.8865100023739672,
        y: 52.454860011327469,
      },
      score: 95,
      attributes: {},
      extent: {
        xmin: -1.887510002373967,
        ymin: 52.453860011327471,
        xmax: -1.8855100023739673,
        ymax: 52.455860011327466,
      },
    },
  ];

  return (
    <>
      {autoCompleteState.selectedItem.id && !autoCompleteState.selectedItem.selectedByMap ? (
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
                      key={result.address}
                      result={result}
                      handleKeyDown={handleKeyDown}
                    />
                  ))}
              </ul>
            )
          )}
        </>
      )}
      {autoCompleteState.selectedItem.id && (
        <div className="wmnds-col-1 wmnds-m-t-sm">
          <h4>Enter search radius (miles)</h4>
          <div className={` ${s.numberInput}`}>
            <button type="button" className={`${s.numberInputButton}`} onClick={decrement}>
              <Icon iconName="general-minimise" iconClass="wmnds-autocomplete__icon" />
            </button>
            <input
              type="number"
              name="searchRadius"
              value={radius}
              min={minRadius}
              max={maxRadius}
              onChange={(e) => setRadius(e.target.value)}
              className={`wmnds-fe-input wmnds-autocomplete__input wmnds-p-l-sm wmnds-text-align-center ${s.numberInputInput}`}
              aria-label="Enter search radius in miles"
            />
            <button type="button" className={`${s.numberInputButton}`} onClick={increment}>
              <Icon iconName="general-expand" iconClass="wmnds-autocomplete__icon" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default RoadsAutoComplete;
