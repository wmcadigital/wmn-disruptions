import { useContext } from 'react';
import { format, parse } from 'fecha';
import haversineDistance from 'haversine-distance';
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

  // console.log(filteredData);

  // When filtering
  if (whenState.when) {
    // Filter results on date range
    filteredData = filteredData.filter((disrItem) => {
      let returnitem;

      const getValidDate = (date) => (date ? parse(date, 'isoDateTime') : new Date()); // Parse the date to make sure a correct date is available, if not return todays date

      // 2020-02-05T15:30:00Z
      const disrStartDate = format(getValidDate(disrItem.disruptionTimeWindow.start), 'YYYY-MM-DD');
      const disrEndDate = format(getValidDate(disrItem.disruptionTimeWindow.end), 'YYYY-MM-DD');

      // console.log('disrStartDate', disrStartDate);
      // console.log('disrEndDate', disrEndDate);

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
      filteredData = filteredData.filter((disrItem) => {
        if (modeState.mode !== 'roads') {
          return disrItem.mode === modeState.mode;
        }

        return disrItem.mode === 'road';
      });
    }

    // SelectedMapDisruption filtering
    if (autoCompleteState.selectedItem.selectedByMap && autoCompleteState.selectedItem.id) {
      filteredData = filteredData.filter(
        (disrItem) => disrItem.id === autoCompleteState.selectedItem.id,
      );
    }

    // // ID filtering
    else if (autoCompleteState.selectedItem.id || autoCompleteState.selectedLocation.address) {
      // The below will check all disruptions and will return any disruption where:
      switch (modeState.mode) {
        // The mode is tram and the id the user clicked in the autocomplete is within the stopsAffected array
        case 'tram':
          // If the user has selected both tram stops then check if any are affected
          if (autoCompleteState.selectedItemTo.id) {
            // Map the array of stop objects to an array of just the atcoCodes
            filteredData = filteredData.filter((disrItem) => {
              const { stopsAffected, servicesAffected } = disrItem;
              // Check if servicesAffected or stopsAffected are present and have items in the array
              if (
                (!stopsAffected || !stopsAffected.length) &&
                (!servicesAffected || !servicesAffected.length)
              ) {
                return false;
              }
              // Filter via stopsAffected if present
              const { selectedItem, selectedItemTo } = autoCompleteState;
              if (stopsAffected && stopsAffected.length > 0) {
                const lineCodes =
                  selectedItem.lines && selectedItem.lines.length > 0
                    ? selectedItem.lines.map((stop) => stop.naPTAN)
                    : [selectedItem.id, selectedItemTo.id];

                return disrItem.stopsAffected.some((el) => lineCodes.indexOf(el.atcoCode) > -1);
              }
              // Filter via the servicesAffected i.e.
              return disrItem.servicesAffected.some((service) => `${service.id}` === '4546');
            });
          }

          break;

        case 'train': {
          // Make sure that both selectedItem (above) and selectedItemTo are selected before we filter as we need both to work out correct lines
          if (autoCompleteState.selectedItemTo.lines) {
            // Join the lines array of the from/to selected stations
            const allLines = autoCompleteState.selectedItem.lines.concat(
              autoCompleteState.selectedItemTo.lines,
            );
            // Then get any duplicates found and pluck them out. If duplicates are found then this means the user MUST be interested in only them lines as that line was part of their from AND to station search.
            const getDuplicates = allLines.filter(
              (item, index) => allLines.indexOf(item) !== index,
            );
            // If duplicates exist, use them as that's what the user is interested in. Otherwise default to all lines (all will be unique)...this usually means the user has selected two stations that are on separate lines.
            const linesToCompareWith = getDuplicates.length ? getDuplicates : allLines;
            // Then filter out any disruptions that don't contain lines the user is interested in
            filteredData = filteredData.filter((disrItem) =>
              disrItem?.servicesAffected[0]?.routeDescriptions.some(
                (el) => linesToCompareWith.indexOf(el.description) > -1,
              ),
            );
          }
          break;
        }

        case 'roads': {
          const { lat, lon, radius } = autoCompleteState.selectedLocation;
          if (lat && lon && radius) {
            const getDistanceInMiles = (disrLat, disrLon) => {
              const startCoords = { lat, lon }; // Location selected by user
              const endCoords = { lat: disrLat, lon: disrLon };
              const distanceInMiles = haversineDistance(startCoords, endCoords) * 0.000621371; // GeoCoord distance using haversine formula converted to miles
              return distanceInMiles;
            };

            filteredData = filteredData.filter((disrItem) => {
              return getDistanceInMiles(disrItem.lat, disrItem.lon) <= radius;
            });
          }
          break;
        }

        // The mode is bus and the id the user clicked in the autocomplete is within the servicesAffected array
        default: {
          filteredData = filteredData.filter((disrItem) => {
            if (disrItem?.servicesAffected) {
              return disrItem.servicesAffected.some(
                (el) => el.id === autoCompleteState.selectedItem.id,
              );
            }

            return false;
          });
        }
      }
    }
  }
  return filteredData;
};

export default useFilterLogic;
