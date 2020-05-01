import { useContext, useEffect } from 'react';
import { loadModules } from 'esri-loader';
import { format } from 'fecha';
import useDateFilter from 'customHooks/useDateFilter';
import {
  FetchDisruptionsContext,
  AutoCompleteContext,
  ModeContext,
  WhenContext,
} from 'globalState';

import modeIcon from './useModeIcon';

const useMapIconLayer = (mapState, viewState, currentLocationState) => {
  // Set globalstates from imported context
  const [autoCompleteState] = useContext(AutoCompleteContext); // Get the state of modeButtons from modeContext
  const [fetchDisruptionsState] = useContext(FetchDisruptionsContext); // Get the state of modeButtons from modeContext
  const [modeState] = useContext(ModeContext); // Get the state of modeButtons from modeContext
  const [whenState] = useContext(WhenContext); // Get the state of whenButtons from WhenContext
  const { fromDate, toDate } = useDateFilter();

  // This useEffect is to add the disruption icons to the map
  useEffect(() => {
    const map = mapState; // Reassign injected mapState to 'map' to be consistent
    const currentLocation = currentLocationState; // Reassign injected mapState to 'map' to be consistent
    const view = viewState;

    let graphicsLayer; // Set here, so we can cleanup in the return

    // const currentLocation = _currentLocation;

    // If disruption state has data in it...
    if (fetchDisruptionsState.data.length && map) {
      // lazy load the required ArcGIS API for JavaScript modules and CSS
      loadModules(['esri/Graphic', 'esri/layers/GraphicsLayer', 'esri/layers/FeatureLayer']).then(
        ([Graphic, GraphicsLayer, FeatureLayer]) => {
          const today = format(new Date(), 'YYYY-MM-DD');
          graphicsLayer = new GraphicsLayer(); // Set up a graphics layer placeholder so we can inject disruption icons into it in future

          map.add(graphicsLayer); // Add graphics layer to map

          // Create new graphic for each lat long in disruptions list
          const disruptionsData = fetchDisruptionsState.data.map((item) => {
            let startDate = today;
            let endDate = today;
            // If disruption time window exists then set start/end dates to those
            if (item.disruptionTimeWindow) {
              startDate = format(new Date(item.disruptionTimeWindow.start), 'YYYY-MM-DD');
              endDate = format(new Date(item.disruptionTimeWindow.end), 'YYYY-MM-DD');
            }

            let affectedIds = '';
            // If servicedsAffected on disruption add them to the affectedIds var so we can query them
            if (item.servicesAffected) {
              item.servicesAffected.forEach((service) => {
                affectedIds += `${service.id}, `;
              });
            }
            // Return graphic element with attributes we want to query, and geomotry/location of disruption
            return new Graphic({
              attributes: {
                id: item.id,
                title: item.title,
                mode: item.mode,
                disruptionSeverity: item.disruptionSeverity,
                servicesAffected: affectedIds,
                startDate,
                endDate,
              },
              geometry: {
                type: 'point',
                longitude: item.lon || 0,
                latitude: item.lat || 0,
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
            queryBuilder += ` AND mode = '${modeState.mode}'`; // add mode query to queryBuilder
          }
          // If autocomplete ID
          if (autoCompleteState.selectedService.id) {
            queryBuilder += ` AND servicesAffected LIKE '%${autoCompleteState.selectedService.id}%'`; // Add selected id query to queryBuilder
          }

          const query = flayer.createQuery(); // Create a query based on feature layer above
          query.where = queryBuilder; // .where uses the SQL query we built

          // function that takes a result, and creates a graphic, then adds to iconLayer on map
          function addGraphics(results) {
            graphicsLayer.removeAll(); // Remove all graphics from iconLayer
            // Foreach result the loop through (async as we have to await the icon to be resolved)
            results.features.forEach(async (feature, i) => {
              // Await for the correct icon to come back based on mode/severity (if the current feature matches selectedMapDisruption, pass true to get hover icon)
              const icon = await modeIcon(
                feature.attributes.mode,
                feature.attributes.disruptionSeverity,
                feature.attributes.id === autoCompleteState.selectedMapDisruption
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
              // If it's the last item in the array then...
              if (results.features.length - 1 === i) {
                // Set locations to goto (if there is users currentLocation  available then we want to show them in the view as well as the location of the graphic items, else just show graphic items)
                const locations = map.layers.items.map((layer) => layer.graphics.items);
                if (currentLocation) locations.push(currentLocation);
                view.goTo(locations); // Go to locations set above
              }
            });
          }

          flayer.queryFeatures(query).then((result) => {
            addGraphics(result);
          }); // Add queried result as a graphic to iconLayer
        }
      );
    }

    // If component unmounting
    return () => {
      if (graphicsLayer) {
        map.remove(graphicsLayer); // remove the graphicsLayer on the map
      }
    };
  }, [
    autoCompleteState.selectedMapDisruption,
    autoCompleteState.selectedService.id,
    currentLocationState,
    fetchDisruptionsState.data,
    fromDate,
    mapState,
    modeState.mode,
    toDate,
    viewState,
    whenState.when,
  ]);
};

export default useMapIconLayer;
