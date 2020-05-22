import { useContext } from 'react';
import { format } from 'fecha';
// Import contexts
import {
  AutoCompleteContext,
  FetchDisruptionsContext,
  ModeContext,
  WhenContext,
} from 'globalState';

import useDateFilter from './useDateFilter';

const useFilterLogic = () => {
  const [fetchDisruptionsState] = useContext(FetchDisruptionsContext); // Get the state of disruptionsApi from fetchDisruptionsState
  const [autoCompleteState] = useContext(AutoCompleteContext);
  const [modeState] = useContext(ModeContext); // Get the state of whenButtons from WhenContext
  const [whenState] = useContext(WhenContext); // Get the state of whenButtons from WhenContext
  const { fromDate, toDate } = useDateFilter();

  let filteredData = fetchDisruptionsState.data;

  // When filtering
  if (whenState.when) {
    // Filter results on date range
    filteredData = filteredData.filter((disrItem) => {
      let returnitem;
      if (disrItem.mode === 'bus') {
        // 2020-02-05T15:30:00Z
        const disrStartDate = format(new Date(disrItem.disruptionTimeWindow.start), 'YYYY-MM-DD');
        const disrEndDate = format(new Date(disrItem.disruptionTimeWindow.end), 'YYYY-MM-DD');

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
      filteredData = filteredData.filter((disrItem) => disrItem.mode === modeState.mode);
    }

    // SelectedMapDisruption filtering
    if (autoCompleteState.selectedMapDisruption) {
      filteredData = filteredData.filter(
        (disrItem) => disrItem.id === autoCompleteState.selectedMapDisruption
      );
    }

    // ID filtering
    if (autoCompleteState.selectedService.id) {
      // The below will check all disruptions and will return any disruption where the mode is bus and the id the user clicked in the autocomplete is within the servicesAffected array
      filteredData = filteredData.filter(
        (disrItem) =>
          disrItem.mode === 'bus' &&
          disrItem.servicesAffected.some((el) => el.id === autoCompleteState.selectedService.id)
      );
    }
  }

  return filteredData;
};

export default useFilterLogic;
