import React, { useContext } from 'react';
import { format } from 'fecha';

// Import contexts
import { FetchDisruptionsContext, ModeContext, WhenContext } from 'globalState';
import DisruptionItem from './DisruptionItem/DisruptionItem';

const DisruptionList = () => {
  const [fetchDisruptionsState] = useContext(FetchDisruptionsContext); // Get the state of disruptionsApi from fetchDisruptionsState
  const [whenState] = useContext(WhenContext); // Get the state of whenButtons from WhenContext
  const [modeState] = useContext(ModeContext); // Get the state of whenButtons from WhenContext

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
        const disrStartDate = disrItem.disruptionTimeWindow.start;
        const disrEndDate = disrItem.disruptionTimeWindow.end;

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
  }

  return (
    <>
      {filteredData.map(disruption => (
        <DisruptionItem disruption={disruption} key={disruption.id} />
      ))}
    </>
  );
};

export default DisruptionList;
