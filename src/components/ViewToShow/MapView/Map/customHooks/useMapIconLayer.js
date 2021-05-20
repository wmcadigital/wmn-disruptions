import { useContext, useEffect, useState } from 'react';
import { loadModules } from 'esri-loader';
import { format, parse } from 'fecha';
import haversineDistance from 'haversine-distance';
import useDateFilter from 'customHooks/useDateFilter';
import {
  FetchDisruptionsContext,
  AutoCompleteContext,
  ModeContext,
  WhenContext,
} from 'globalState';

import modeIcon from './useModeIcon';

const useMapIconLayer = (mapState, viewState) => {
  // Set globalstates from imported context
  const [autoCompleteState] = useContext(AutoCompleteContext); // Get the state of modeButtons from modeContext
  const [fetchDisruptionsState] = useContext(FetchDisruptionsContext); // Get the state of modeButtons from modeContext
  const [modeState] = useContext(ModeContext); // Get the state of modeButtons from modeContext
  const [whenState] = useContext(WhenContext); // Get the state of whenButtons from WhenContext
  const { fromDate, toDate } = useDateFilter();
  const [isIconLayerCreated, setIsIconLayerCreated] = useState(false); // Set this to true when iconLayer has been created

  // This useEffect is to add the disruption icons to the map
  useEffect(() => {
    const map = mapState; // Reassign injected mapState to 'map' to be consistent
    const view = viewState;
    let graphicsLayer; // Set here, so we can cleanup in the return

    // If disruption state has data in it...
    if (fetchDisruptionsState.data.length && view) {
      // lazy load the required ArcGIS API for JavaScript modules and CSS
      loadModules(['esri/Graphic', 'esri/layers/GraphicsLayer', 'esri/layers/FeatureLayer']).then(
        ([Graphic, GraphicsLayer, FeatureLayer]) => {
          const today = format(new Date(), 'YYYY-MM-DD'); // Get today's date in nice format to use in map function below

          graphicsLayer = new GraphicsLayer(); // Set up a graphics layer placeholder so we can inject disruption icons into it in future
          map.add(graphicsLayer); // Add graphics layer to map

          // Create new graphic for each lat long in disruptions list
          const disruptionsData = fetchDisruptionsState.data.map((item) => {
            // Destructure values from item
            const {
              disruptionTimeWindow,
              servicesAffected,
              stopsAffected,
              id,
              title,
              mode,
              disruptionSeverity,
              lat,
              lon,
            } = item;

            let startDate = today;
            let endDate = today;

            // If disruption time window exists then set start/end dates to those
            if (disruptionTimeWindow) {
              const getValidDate = (date) => {
                let setDate;
                if (date) {
                  setDate =
                    date.toLowerCase() !== 'invalid date' ? parse(date, 'isoDateTime') : new Date();
                } else {
                  setDate = new Date();
                }
                return setDate;
              }; // Parse the date to make sure a correct date is available, if not return todays date

              startDate = format(getValidDate(disruptionTimeWindow.start), 'YYYY-MM-DD');
              endDate = format(getValidDate(disruptionTimeWindow.end), 'YYYY-MM-DD');
            }

            let affectedIds = '';
            // If servicedsAffected on disruption add them to the affectedIds var so we can query them
            if (mode === 'bus' && servicesAffected && servicesAffected.length) {
              servicesAffected.forEach((service) => {
                affectedIds += `${service.id}, `;
              });
            }
            // If train, we need to add lines to affectedIds
            else if (
              mode === 'train' &&
              servicesAffected &&
              servicesAffected.length &&
              servicesAffected[0]?.routeDescriptions
            ) {
              servicesAffected[0].routeDescriptions.forEach((line) => {
                affectedIds += `${line.description}`;
              });
            }
            // Or a tram
            else if (mode === 'tram') {
              if (stopsAffected && stopsAffected.length) {
                stopsAffected.forEach((stop) => {
                  affectedIds += `${stop.atcoCode}, `;
                });
              }
              if (servicesAffected && servicesAffected.length) {
                servicesAffected.forEach((service) => {
                  affectedIds += `${service.id}, `;
                });
              }
            }
            // Roads
            else if (mode === 'road' && autoCompleteState.selectedLocation) {
              const startCoords = {
                lat: autoCompleteState.selectedLocation.lat,
                lon: autoCompleteState.selectedLocation.lon,
              }; // Location selected by user
              const endCoords = { lat, lon };
              const distanceInMiles = haversineDistance(startCoords, endCoords) * 0.000621371;
              affectedIds += `${distanceInMiles}`;
            }

            // Return graphic element with attributes we want to query, and geomotry/location of disruption
            return new Graphic({
              attributes: {
                id,
                title,
                mode,
                disruptionSeverity,
                servicesAffected: affectedIds,
                startDate,
                endDate,
              },
              geometry: {
                type: 'point',
                // If no lat/long then default to Birmingham city centre
                longitude: lon || -1.8960335,
                latitude: lat || 52.481755,
                spatialreference: {
                  wkid: 4326,
                },
              },
            });
          });

          // Create a feature layer so that we can query it
          const flayer = new FeatureLayer({
            source: disruptionsData, // Set the source to the disruptionsData we created above
            objectIdField: 'oid', // This must be defined when creating a layer from `Graphic` objects
            fields: [
              {
                name: 'oid',
                alias: 'oid',
                type: 'oid',
              },
              {
                name: 'id',
                alias: 'id',
                type: 'string',
              },
              {
                name: 'title',
                alias: 'title',
                type: 'string',
              },
              {
                name: 'mode',
                alias: 'mode',
                type: 'string',
              },
              {
                name: 'severity',
                alias: 'severity',
                type: 'string',
              },
              {
                name: 'disruptionSeverity',
                alias: 'disruptionSeverity',
                type: 'string',
              },
              {
                name: 'servicesAffected',
                alias: 'servicesAffected',
                type: 'string',
              },
              {
                name: 'stopsAffected',
                alias: 'stopsAffected',
                type: 'string',
              },
              {
                name: 'startDate',
                alias: 'startDate',
                type: 'string',
              },
              {
                name: 'endDate',
                alias: 'endDate',
                type: 'string',
              },
            ],
          });

          // QUERY FEATURE LAYER, Any fields to be queried need to be included in fields list of feature layer above.
          // ESRI maps uses SQL syntax to query.
          let queryBuilder; // Placeholder query var to filter, this will be updated based on state of app...
          // If when selected
          if (whenState.when) {
            queryBuilder = `((startDate >= '${fromDate}' AND startDate <= '${toDate}') OR (endDate >= '${fromDate}' AND startDate <= '${toDate}'))`;
          }

          // If mode is selected
          if (modeState.mode) {
            if (modeState.mode === 'roads') {
              queryBuilder += ` AND (mode = 'road')`;
            } else {
              queryBuilder += ` AND mode = '${modeState.mode}'`; // add mode query to queryBuilder
            }
          }

          // TRAIN
          if (
            modeState.mode === 'train' &&
            autoCompleteState.selectedItem.id &&
            autoCompleteState.selectedItemTo.id
          ) {
            // Join the lines array of the from/to selected stations
            const allLines = autoCompleteState.selectedItem.lines.concat(
              autoCompleteState.selectedItemTo.lines
            );
            // Then get any duplicates found and pluck them out. If duplicates are found then this means the user MUST be interested in only them lines as that line was part of their from AND to station search.
            const getDuplicates = allLines.filter(
              (item, index) => allLines.indexOf(item) !== index
            );
            // If duplicates exist, use them as that's what the user is interested in. Otherwise default to all lines (all will be unique)...this usually means the user has selected two stations that are on separate lines.
            const linesToCompareWith = getDuplicates.length ? getDuplicates : allLines;

            let trainQuery = ''; // placeholder for generating the train query

            // Loop through each of our lines that the user is interested in and generate a nice SQL query
            linesToCompareWith.forEach((line, index) => {
              let or = ''; // placeholder to add "OR" to sql query
              if (index !== linesToCompareWith.length - 1) {
                // If the item is not the last in the loop then add " OR " to the query as there will be more items to chain on to the query
                or = ' OR ';
              }
              // Update the train query to check the disruption icon attributes if the servicesAffected contains our line in the loop
              trainQuery += `(servicesAffected LIKE '%${line}%')${or}`;
            });

            queryBuilder += ` AND (${trainQuery})`; // Stack the train query all together and add it on to the main sql query
          }
          // TRAM
          else if (
            modeState.mode === 'tram' &&
            autoCompleteState.selectedItem.id &&
            autoCompleteState.selectedItemTo.id
          ) {
            let tramQuery = "(servicesAffected LIKE '%4546%')";
            // Wait until the stop by stop api returns in-between stops
            if (
              autoCompleteState.selectedItem?.lines &&
              autoCompleteState.selectedItem.lines.length
            ) {
              const stops = autoCompleteState.selectedItem.lines;
              tramQuery = stops.length ? `${tramQuery} OR ` : tramQuery;

              stops.forEach((stop, index) => {
                let or = ''; // placeholder to add "OR" to sql query
                if (index !== stops.length - 1) {
                  // If the item is not the last in the loop then add " OR " to the query as there will be more items to chain on to the query
                  or = ' OR ';
                }
                // Update the train query to check the disruption icon attributes if the servicesAffected contains our line in the loop
                tramQuery += `(servicesAffected LIKE '%${stop.atcoCode}%')${or}`;
              });
            } else {
              tramQuery += ` OR (servicesAffected LIKE '%${autoCompleteState.selectedItem.id}%')`;
              tramQuery += ` OR (servicesAffected LIKE '%${autoCompleteState.selectedItemTo.id}%')`;
            }

            queryBuilder += ` AND (${tramQuery})`; // Stack the train query all together and add it on to the main sql query
            // Check for any disruptions to the full line
          }
          // Roads
          else if (modeState.mode === 'roads' && autoCompleteState.selectedLocation.radius) {
            const { radius } = autoCompleteState.selectedLocation;
            queryBuilder += ` AND servicesAffected <= ${radius}`;
          }
          // ANYTHING ELSE (BUS)
          else if (
            autoCompleteState.selectedItem.id &&
            !autoCompleteState.selectedItem.selectedByMap &&
            modeState.mode !== 'train' &&
            modeState.mode !== 'tram'
          ) {
            // If autocomplete ID
            queryBuilder += ` AND servicesAffected LIKE '%${autoCompleteState.selectedItem.id}%'`; // Add selected id query to queryBuilder
          }

          const query = flayer.createQuery(); // Create a query based on feature layer above
          query.where = queryBuilder; // .where uses the SQL query we built

          // function that takes a result, and creates a graphic, then adds to iconLayer on map
          function addGraphics(results) {
            graphicsLayer.removeAll(); // Remove all graphics from iconLayer
            setIsIconLayerCreated(false); // Reset this var as GoTO method relies on it to change
            // Foreach result the loop through (async as we have to await the icon to be resolved)
            results.features.forEach(async (feature) => {
              // Await for the correct icon to come back based on mode/severity (if the current feature matches selectedItem, pass true to get hover icon)
              const icon = await modeIcon(
                feature.attributes.mode,
                feature.attributes.disruptionSeverity,
                feature.attributes.id === autoCompleteState.selectedItem.id
              );

              // Create new graphic
              const graphic = new Graphic({
                geometry: feature.geometry,
                attributes: feature.attributes,
                symbol: {
                  // autocasts as new SimpleMarkerSymbol()
                  type: 'picture-marker',
                  url: icon, // Set to svg disruption indicator
                  // Chnange height based on selected
                  height: '30px',
                  width: '50px',
                },
              });

              graphicsLayer.add(graphic); // Add graphic to iconLayer on map
            });

            setIsIconLayerCreated(true);
          }

          flayer.queryFeatures(query).then((result) => {
            addGraphics(result);
          }); // Add queried result as a graphic to iconLayer
        }
      );
    }
    // If component unmounting
    return () => {
      if (graphicsLayer) map.remove(graphicsLayer); // remove the graphicsLayer on the map
      setIsIconLayerCreated(false);
    };
  }, [
    autoCompleteState.selectedItem,
    autoCompleteState.selectedItem.id,
    autoCompleteState.selectedItem.lines,
    autoCompleteState.selectedItem.selectedByMap,
    autoCompleteState.selectedItemTo.id,
    autoCompleteState.selectedItemTo.lines,
    autoCompleteState.selectedLocation,
    fetchDisruptionsState.data,
    fromDate,
    mapState,
    modeState.mode,
    toDate,
    viewState,
    whenState.when,
  ]);

  return { isIconLayerCreated };
};

export default useMapIconLayer;
