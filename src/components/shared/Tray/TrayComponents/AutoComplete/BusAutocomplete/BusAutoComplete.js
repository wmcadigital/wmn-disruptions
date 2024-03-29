import React, { useRef } from 'react';
import { DebounceInput } from 'react-debounce-input'; // https://www.npmjs.com/package/react-debounce-input
// CustomHooks
import useResetState from 'customHooks/useResetState';
// Import components
import Message from 'components/shared/Message/Message';
import Icon from 'components/shared/Icon/Icon';
import BusAutoCompleteResult from './BusAutoCompleteResult/BusAutoCompleteResult';
import SelectedServiceHeader from '../SelectedServiceHeader/SelectedServiceHeader';
// CustomHooks
import useHandleAutoCompleteKeys from '../customHooks/useHandleAutoCompleteKeys';
import useAutoCompleteAPI from '../customHooks/useAutoCompleteAPI';

function BusAutoComplete() {
  const { updateQuery, autoCompleteState, autoCompleteDispatch } = useResetState();

  const resultsList = useRef(null);
  const debounceInput = useRef(null);

  const { loading, errorInfo, results, getAutoCompleteResults } = useAutoCompleteAPI(
    `/api/lineinfo?q=${encodeURI(autoCompleteState.query)}`,
    'bus',
    autoCompleteState.query,
  );

  // Import handleKeyDown function from customHook (used by all modes)
  const { handleKeyDown } = useHandleAutoCompleteKeys(
    resultsList,
    DebounceInput,
    autoCompleteState,
  );

  function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const serviceNumberA = a.serviceNumber.toUpperCase();
    const serviceNumberB = b.serviceNumber.toUpperCase();
    const routeNameA = a.routes[0].routeName.toUpperCase();
    const routeNameB = b.routes[0].routeName.toUpperCase();
    let comparison = 0;
    if (serviceNumberA > serviceNumberB) {
      comparison = 1;
    } else if (serviceNumberA < serviceNumberB) {
      comparison = -1;
    } else if (routeNameA > routeNameB) {
      // if service number is equal compare route name
      comparison = 1;
    } else if (routeNameA < routeNameB) {
      // if service number is equal compare route name
      comparison = -1;
    }
    return comparison;
  }

  return (
    <div>
      {autoCompleteState.selectedItem.id && !autoCompleteState.selectedItem.selectedByMap ? (
        <SelectedServiceHeader
          autoCompleteState={autoCompleteState}
          autoCompleteDispatch={() => autoCompleteDispatch({ type: 'RESET_SELECTED_SERVICES' })}
          mode="bus"
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
              name="busSearch"
              placeholder="Search for a bus service"
              className="wmnds-fe-input wmnds-autocomplete__input wmnds-col-1"
              value={autoCompleteState.query || ''}
              onChange={(e) => updateQuery(e.target.value)}
              aria-label="Search for a bus service"
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
                {results.sort(compare).map((result) => (
                  <BusAutoCompleteResult
                    key={result.id}
                    result={result}
                    handleKeyDown={handleKeyDown}
                  />
                ))}
              </ul>
            )
          )}
        </>
      )}
    </div>
  );
}

export default BusAutoComplete;
