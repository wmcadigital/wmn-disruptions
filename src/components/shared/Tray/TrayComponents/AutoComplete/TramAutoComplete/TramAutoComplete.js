import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input'; // https://www.npmjs.com/package/react-debounce-input
// CustomHooks
import useResetState from 'customHooks/useResetState';
// Import components
import Message from 'components/shared/Message/Message';
import Icon from 'components/shared/Icon/Icon';
import TramAutoCompleteResult from './TramAutoCompleteResult/TramAutoCompleteResult';
import SelectedServiceHeader from '../SelectedServiceHeader/SelectedServiceHeader';
// CustomHooks
import useHandleAutoCompleteKeys from '../customHooks/useHandleAutoCompleteKeys';
import useAutoCompleteAPI from '../customHooks/useAutoCompleteAPI';

const TramAutoComplete = ({ to }) => {
  const { updateQuery, autoCompleteState, autoCompleteDispatch } = useResetState();

  const resultsList = useRef(null);
  const debounceInput = useRef(null);

  const tramQuery = to ? autoCompleteState.queryTo : autoCompleteState.query;
  const selectedService = to ? autoCompleteState.selectedItemTo : autoCompleteState.selectedItem;

  const { loading, errorInfo, results } = useAutoCompleteAPI(
    `/metro/v1/stop?q=${encodeURI(tramQuery)}`,
    'tram',
    tramQuery,
    to
  );

  // Import handleKeyDown function from customHook (used by all modes)
  const { handleKeyDown } = useHandleAutoCompleteKeys(resultsList, DebounceInput, results);

  return (
    <>
      {selectedService.id && !autoCompleteState.selectedItem.selectedByMap ? (
        <SelectedServiceHeader
          autoCompleteState={autoCompleteState}
          autoCompleteDispatch={() =>
            autoCompleteDispatch({ type: 'RESET_SELECTED_ITEM', payload: { to, mode: 'tram' } })
          }
          mode="tram"
          to={to}
        />
      ) : (
        <>
          <div
            className={`wmnds-autocomplete wmnds-grid ${loading ? 'wmnds-is--loading' : ''} ${
              !to && !tramQuery && !loading && 'wmnds-m-b-sm'
            }`}
          >
            <Icon iconName="general-search" iconClass="wmnds-autocomplete__icon" />
            <div className="wmnds-loader" role="alert" aria-live="assertive">
              <p className="wmnds-loader__content">Content is loading...</p>
            </div>
            <DebounceInput
              type="text"
              name="tramSearch"
              placeholder="Search for a stop"
              className="wmnds-fe-input wmnds-autocomplete__input wmnds-col-1"
              value={tramQuery || ''}
              onChange={(e) => updateQuery(e.target.value, to)}
              aria-label="Search for a stop"
              debounceTimeout={600}
              onKeyDown={(e) => handleKeyDown(e)}
              inputRef={debounceInput}
            />
          </div>
          {/* If there is no data.length(results) and the user hasn't submitted a query and the state isn't loading then the user should be displayed with no results message, else show results */}
          {!results.length && tramQuery && !loading && errorInfo ? (
            <Message type="error" title={errorInfo.title} message={errorInfo.message} />
          ) : (
            // Only show autocomplete results if there is a query
            tramQuery && (
              <ul className="wmnds-autocomplete-suggestions" ref={resultsList}>
                {results.map((result) => (
                  <TramAutoCompleteResult
                    key={result.id}
                    result={result}
                    handleKeyDown={handleKeyDown}
                    to={to}
                  />
                ))}
              </ul>
            )
          )}
        </>
      )}
    </>
  );
};

// PropTypes
TramAutoComplete.propTypes = {
  to: PropTypes.bool,
};

// Default props
TramAutoComplete.defaultProps = {
  to: false,
};

export default TramAutoComplete;
