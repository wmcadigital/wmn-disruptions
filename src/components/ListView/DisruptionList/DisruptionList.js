import React, { useContext } from 'react';
import { format } from 'fecha';
import Icon from 'components/shared/Icon/Icon';

// Import contexts
import {
  AutoCompleteContext,
  FetchDisruptionsContext,
  ModeContext,
  WhenContext
} from 'globalState';
import DisruptionItem from './DisruptionItem/DisruptionItem';

const DisruptionList = () => {
  const [fetchDisruptionsState] = useContext(FetchDisruptionsContext); // Get the state of disruptionsApi from fetchDisruptionsState
  const [autoCompleteState] = useContext(AutoCompleteContext);
  const [modeState] = useContext(ModeContext); // Get the state of whenButtons from WhenContext
  const [whenState] = useContext(WhenContext); // Get the state of whenButtons from WhenContext

  let filteredData = fetchDisruptionsState.data;

  // When filtering
  if (whenState.when) {
    const today = format(new Date(), 'YYYY-MM-DD'); // Set today
    let tomorrow = new Date(today);
    tomorrow = format(tomorrow.setDate(tomorrow.getDate() + 1), 'YYYY-MM-DD'); // set tomorrow

    let fromDate;
    let toDate;
    // Switch on when
    switch (whenState.when) {
      case 'now':
        fromDate = today;
        toDate = today;
        break;

      case 'tomorrow':
        fromDate = tomorrow;
        toDate = tomorrow;
        break;

      case 'customDate':
        fromDate = format(new Date(whenState.whenCustomDate), 'YYYY-MM-DD');
        toDate = format(new Date(whenState.whenCustomDate), 'YYYY-MM-DD');
        break;

      default:
        fromDate = today;
        toDate = today;
    }

    // Filter results on date range
    filteredData = filteredData.filter(disrItem => {
      let returnitem;
      if (disrItem.mode === 'bus') {
        // 2020-02-05T15:30:00Z
        const disrStartDate = format(new Date(disrItem.disruptionTimeWindow.start), 'YY-MM-DD');
        const disrEndDate = format(new Date(disrItem.disruptionTimeWindow.end), 'YY-MM-DD');

        console.log(disrStartDate);

        if (
          (disrStartDate >= fromDate && disrStartDate <= toDate) ||
          (disrEndDate >= fromDate && disrStartDate <= toDate)
        ) {
          returnitem = disrItem;
        }
      }
      return returnitem;
    });
    // End when filtering

    // Mode filtering
    if (modeState.mode) {
      filteredData = filteredData.filter(disrItem => disrItem.mode === modeState.mode);
    }

    // ID filtering
    if (autoCompleteState.selectedService.id) {
      // The below will check all disruptions and will return any disruption where the mode is bus and the id the user clicked in the autocomplete is within the servicesAffected array
      filteredData = filteredData.filter(
        disrItem =>
          disrItem.mode === 'bus' &&
          disrItem.servicesAffected.some(el => el.id === autoCompleteState.selectedService.id)
      );
    }
  }

  // const goodServiceMsg = () => {
  //   switch (modeState.mode) {
  //     case 'bus':
  //       break;
  //     case 'train':
  //       break;

  //     case 'tram':
  //       break;

  //     case 'roads':
  //       break;

  //     default:
  //       break;
  //   }
  // };

  return (
    <>
      {filteredData.length ? (
        filteredData.map(disruption => (
          <DisruptionItem disruption={disruption} key={disruption.id} />
        ))
      ) : (
        <div className="wmnds-msg-summary wmnds-msg-summary--success wmnds-col-1">
          <div className="wmnds-msg-summary__header">
            <Icon iconName="general-success" iconClass="wmnds-msg-summary__icon" />
            <h3 className="wmnds-msg-summary__title">Good service</h3>
          </div>

          <div className="wmnds-msg-summary__info">
            {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
            No incidents reported on {modeState.mode ? modeState.mode : 'bus, train, tram or roads'}
            .
          </div>
        </div>
      )}
    </>
  );
};

export default DisruptionList;
