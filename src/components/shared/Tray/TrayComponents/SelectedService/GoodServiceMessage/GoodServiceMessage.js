import React, { useContext } from 'react';
// State
import { ModeContext, WhenContext, AutoCompleteContext } from 'globalState';
// Components
import Icon from 'components/shared/Icon/Icon';

const GoodServiceMessage = () => {
  const [modeState] = useContext(ModeContext);
  const [whenState] = useContext(WhenContext);
  const [autoCompleteState] = useContext(AutoCompleteContext);

  const { selectedItem, selectedItemTo } = autoCompleteState;

  const timeText = () => {
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    switch (whenState.when) {
      case 'tomorrow':
        return 'expected tomorrow';

      case 'customDate':
        return `expected on ${new Date(whenState.whenCustomDate).toLocaleDateString(
          'en-GB',
          dateOptions
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

      default:
        return '';
    }
  };

  const message = `Good service ${timeText()} ${modeText()}.`;

  return (
    <div className="wmnds-msg-summary wmnds-msg-summary--success wmnds-col-1 wmnds-m-t-lg">
      <div className="wmnds-msg-summary__header">
        <Icon iconName="general-success" iconClass="wmnds-msg-summary__icon" />
        <h3 className="wmnds-msg-summary__title">Good service</h3>
        <div className="wmnds-msg-summary__info">
          <p className="wmnds-m-b-none">{message}</p>
          {whenState.when !== 'now' && (
            <p className="wmnds-m-t-sm wmnds-m-b-none">
              Service is subject to change, so please check before you travel.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoodServiceMessage;

// E.g good service today on all train lines or good service between [selected dates] as of today, but it is subject to change, check before you travel.
