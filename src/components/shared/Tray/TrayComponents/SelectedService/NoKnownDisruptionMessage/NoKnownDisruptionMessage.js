/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
// State
import { ModeContext, WhenContext, AutoCompleteContext } from 'globalState';
import { getSearchParam } from 'globalState/helpers/URLSearchParams';
// Components
import Icon from 'components/shared/Icon/Icon';

function NoKnownDisruptionMessage({ isListView = false }) {
  const [modeState] = useContext(ModeContext);
  const [whenState] = useContext(WhenContext);
  const [autoCompleteState, autoCompleteDispatch] = useContext(AutoCompleteContext);

  const { selectedItem, selectedItemTo, selectedLocation } = autoCompleteState;

  const timeText = () => {
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    switch (whenState.when) {
      case 'tomorrow':
        return 'expected tomorrow';

      case 'customDate':
        return `expected on ${new Date(whenState.whenCustomDate).toLocaleDateString(
          'en-GB',
          dateOptions,
        )}`;

      default:
        return 'today';
    }
  };

  const modeText = () => {
    switch (modeState.mode) {
      case 'bus':
        return selectedItem.serviceNumber
          ? `on the ${selectedItem.serviceNumber.toUpperCase()} service`
          : 'on all bus routes';

      case 'train':
        return selectedItem.id && selectedItemTo.id
          ? `between ${selectedItem.stopName} and ${selectedItemTo.stopName}`
          : 'on all train lines';

      case 'tram':
        return 'across all tram stops';

      case 'roads':
        return selectedLocation.address
          ? `within ${selectedLocation.radius} mile${selectedLocation.radius > 1 ? 's' : ''} of ${
              selectedLocation.address
            }`
          : 'on all roads';

      default:
        return 'across all modes of travel';
    }
  };

  const hasCachedDisruption = () => {
    const autoCompletesAreEmpty = !selectedItem.id && !selectedItemTo.id;
    if (selectedItem.selectedByMap || autoCompletesAreEmpty) {
      return false;
    }

    switch (modeState.mode) {
      case 'bus':
        return selectedItem.severity !== undefined && selectedItem.severity !== 'none';

      default:
        return selectedItem.severity !== 'none' || selectedItemTo.severity !== 'none';
    }
  };

  const message = (() => {
    if (getSearchParam('selectedByMap') && getSearchParam('selectedItem')) {
      // Update the message for a user coming from an email link
      // if the code reaches here it means there is good service and that disruption no longer exists i.e. has been cleared
      return 'This disruption has cleared.';
    }

    if (hasCachedDisruption()) {
      // If a disuruption is cached then a selectedItem will have disruption info from the AutoCompleteAPI
      // however the disruption won't exist on the DisruptionsAPI so it will have been cleared recently.
      return `A disruption has recently cleared ${modeText()}.`;
    }

    return `No known disruptions ${timeText()} ${modeText()}.`;
  })();

  const clearSelectedServices = () => {
    if (modeState.mode === 'roads') {
      autoCompleteDispatch({ type: 'RESET_SELECTED_ITEM', payload: { to: false } });
      return;
    }
    autoCompleteDispatch({ type: 'RESET_SELECTED_SERVICES' });
  };

  const showOtherDisruptions =
    isListView && autoCompleteState.selectedItem.selectedByMap ? (
      <button className="wmnds-btn wmnds-btn--link" type="button" onClick={clearSelectedServices}>
        Show remaining disruptions.
      </button>
    ) : (
      ''
    );

  return (
    <div className={`wmnds-msg-summary wmnds-col-1 ${isListView ? '' : 'wmnds-m-t-lg'}`}>
      <div className="wmnds-msg-summary__header">
        <Icon iconName="general-success" iconClass="wmnds-msg-summary__icon" />
        <h3 className="wmnds-msg-summary__title">No known disruptions</h3>
        <div className="wmnds-msg-summary__info">
          <p className="wmnds-m-b-none">
            {message}
            {showOtherDisruptions}
          </p>
          {whenState.when !== 'now' && (
            <p className="wmnds-m-t-sm wmnds-m-b-none">
              Service is subject to change, so please check before you travel.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default NoKnownDisruptionMessage;

// E.g good service today on all train lines or good service between [selected dates] as of today, but it is subject to change, check before you travel.
