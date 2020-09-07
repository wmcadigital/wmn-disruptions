import { useContext } from 'react';
import { format, parse } from 'fecha';
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
  const { fromDate, toDate } = useDateFilter(); // Logic to determine what the correct from/to dates should be depending on selected when

  let filteredData = fetchDisruptionsState.data; // All disruptions

  // When filtering
  if (whenState.when) {
    // Filter results on date range
    filteredData = filteredData.filter((disrItem) => {
      let returnitem;

      const getValidDate = (date) => (date ? parse(date, 'isoDateTime') : new Date()); // Parse the date to make sure a correct date is available, if not return todays date

      // 2020-02-05T15:30:00Z
      const disrStartDate = format(getValidDate(disrItem.disruptionTimeWindow.start), 'YYYY-MM-DD');
      const disrEndDate = format(getValidDate(disrItem.disruptionTimeWindow.end), 'YYYY-MM-DD');

      // If disruption dates are within selected time range then return that disruption
      if (
        (disrStartDate >= fromDate && disrStartDate <= toDate) ||
        (disrEndDate >= fromDate && disrStartDate <= toDate)
      ) {
        returnitem = disrItem;
      }
      return returnitem;
    });
    // End when filtering

    // Mode filtering
    if (modeState.mode) {
      filteredData = filteredData.filter((disrItem) => disrItem.mode === modeState.mode);
    }

    // SelectedMapDisruption filtering
    if (autoCompleteState.selectedItem.id) {
      filteredData = filteredData.filter(
        (disrItem) => disrItem.id === autoCompleteState.selectedItem.id
      );
    }

    // // ID filtering
    // if (autoCompleteState.selectedItem.id) {
    //   // The below will check all disruptions and will return any disruption where the mode is bus and the id the user clicked in the autocomplete is within the servicesAffected array
    //   filteredData = filteredData.filter((disrItem) =>
    //     disrItem.servicesAffected.some((el) => el.id === autoCompleteState.selectedItem.id)
    //   );
    // }
  }

  return filteredData;
};

export default useFilterLogic;
