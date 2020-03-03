import { useContext, useEffect } from 'react';
import { loadModules } from 'esri-loader';
import { format } from 'fecha';
import busMinor from 'assets/map-icons/bus-minor.png';
import useDateFilter from 'customHooks/useDateFilter';

import {
  FetchDisruptionsContext,
  AutoCompleteContext,
  ModeContext,
  WhenContext
} from 'globalState';

// Import map icons
// bus icons
// import busMajor from 'assets/map-icons/bus-major.png';
// import busSevere from 'assets/map-icons/bus-severe.png';
// tram icons
// import tramMinor from 'assets/map-icons/tram-minor.png';
// import tramMajor from 'assets/map-icons/tram-major.png';
// import tramSevere from 'assets/map-icons/tram-severe.png';
// train icons
// import trainMinor from 'assets/map-icons/train-minor.png';
// import trainMajor from 'assets/map-icons/train-major.png';
// import trainSevere from 'assets/map-icons/train-severe.png';
// roads icons
// import roadsMinor from 'assets/map-icons/roads-minor.png';
// import roadsMajor from 'assets/map-icons/roads-major.png';
// import roadsSevere from 'assets/map-icons/roads-severe.png';

const useMapIconLayer = (_iconLayer, _view) => {
  // Set globalstates from imported context
  const [autoCompleteState] = useContext(AutoCompleteContext); // Get the state of modeButtons from modeContext
  const [fetchDisruptionsState] = useContext(FetchDisruptionsContext); // Get the state of modeButtons from modeContext
  const [modeState] = useContext(ModeContext); // Get the state of modeButtons from modeContext
  const [whenState] = useContext(WhenContext); // Get the state of whenButtons from WhenContext
  const { fromDate, toDate } = useDateFilter();

  // Reassign injected useRef params to internal vars
  const iconLayer = _iconLayer.current;
  const view = _view.current;

  // This useEffect is to add the disruption icons to the map
  useEffect(() => {
    // If disruption state has data in it...
    if (fetchDisruptionsState.data.length) {
      // lazy load the required ArcGIS API for JavaScript modules and CSS
      loadModules(['esri/Graphic', 'esri/layers/FeatureLayer']).then(([Graphic, FeatureLayer]) => {
        const today = format(new Date(), 'YYYY-MM-DD');

        // Create new graphic for each lat long in disruptions list
        const disruptionsData = fetchDisruptionsState.data.map(item => {
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
            item.servicesAffected.forEach(service => {
              affectedIds += `${service.id}, `;
            });
          }
          // Return graphic element with attributes we want to query, and geomotry/location of disruption
          return new Graphic({
            attributes: {
              id: item.id,
              title: item.title,
              mode: item.mode,
              servicesAffected: affectedIds,
              startDate,
              endDate
            },
            geometry: {
              type: 'point',
              longitude: item.lon || 0,
              latitude: item.lat || 0,
              spatialreference: {
                wkid: 4326
              }
            }
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
              type: 'oid'
            },
            {
              name: 'id',
              alias: 'id',
              type: 'string'
            },
            {
              name: 'title',
              alias: 'title',
              type: 'string'
            },
            {
              name: 'mode',
              alias: 'mode',
              type: 'string'
            },
            {
              name: 'servicesAffected',
              alias: 'servicesAffected',
              type: 'string'
            },
            {
              name: 'startDate',
              alias: 'startDate',
              type: 'string'
            },
            {
              name: 'endDate',
              alias: 'endDate',
              type: 'string'
            }
          ]
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

        flayer.queryFeatures(query).then(result => {
          // function that takes a result, and creates a graphic, then adds to iconLayer on map
          function addGraphics(item) {
            item.features.forEach(feature => {
              const graphic = new Graphic({
                geometry: feature.geometry,
                attributes: feature.attributes,
                symbol: {
                  // autocasts as new SimpleMarkerSymbol()
                  type: 'picture-marker',
                  url: busMinor, // Set to svg disruption indicator
                  height: '30px',
                  width: '51px'
                }
              });
              iconLayer.add(graphic); // Add graphic to iconLayer on map
            });
          }

          iconLayer.removeAll(); // Remove all graphics from iconLayer
          addGraphics(result); // Add queried result as a graphic to iconLayer

          view.goTo({ target: iconLayer.graphics.items });
        });
      });
    }
  }, [
    autoCompleteState.selectedService.id,
    fetchDisruptionsState.data,
    fromDate,
    iconLayer,
    modeState.mode,
    toDate,
    view,
    whenState.when
  ]);
};

export default useMapIconLayer;
