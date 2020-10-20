import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input'; // https://www.npmjs.com/package/react-debounce-input
// CustomHooks
import useResetState from 'customHooks/useResetState';
// Import components
import Message from 'components/shared/Message/Message';
import Icon from 'components/shared/Icon/Icon';
import TrainAutoCompleteResult from './TrainAutoCompleteResult/TrainAutoCompleteResult';
// CustomHooks
import useHandleAutoCompleteKeys from '../customHooks/useHandleAutoCompleteKeys';
import useAutoCompleteAPI from '../customHooks/useAutoCompleteAPI';

const TrainAutoComplete = ({ to }) => {
  const { updateQuery, autoCompleteState } = useResetState();

  const resultsList = useRef(null);
  const debounceInput = useRef(null);

  const trainQuery = to ? autoCompleteState.queryTo : autoCompleteState.query;

  const { loading, errorInfo, results } = useAutoCompleteAPI(
    `/rail/v2/station?q=${encodeURI(trainQuery)}`,
    'tram'
  );

  // Import handleKeyDown function from customHook (used by all modes)
  const { handleKeyDown } = useHandleAutoCompleteKeys(
    resultsList,
    DebounceInput,
    autoCompleteState
  );

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
          value={trainQuery || ''}
          onChange={(e) => updateQuery(e.target.value, to)}
          aria-label="Search for a stop"
          debounceTimeout={600}
          onKeyDown={(e) => handleKeyDown(e)}
          inputRef={debounceInput}
        />
      </div>
      {/* If there is no data.length(results) and the user hasn't submitted a query and the state isn't loading then the user should be displayed with no results message, else show results */}
      {!results.length && trainQuery && !loading && errorInfo ? (
        <Message type="error" title={errorInfo.title} message={errorInfo.message} />
      ) : (
        // Only show autocomplete results if there is a query
        trainQuery && (
          <ul className="wmnds-autocomplete-suggestions" ref={resultsList}>
            {results.map((result) => (
              <TrainAutoCompleteResult
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

// PropTypes
TrainAutoComplete.propTypes = {
  to: PropTypes.bool,
};

// Default props
TrainAutoComplete.defaultProps = {
  to: false,
};

export default TrainAutoComplete;
