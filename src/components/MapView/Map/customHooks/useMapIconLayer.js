import { useContext, useEffect } from 'react';
import { loadModules } from 'esri-loader';
import busMinor from 'assets/map-icons/bus-minor.png';

import { FetchDisruptionsContext, AutoCompleteContext, ModeContext } from 'globalState';

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

const useMapIconLayer = (_map, _iconLayer) => {
  // Set globalstates from imported context
  const [autoCompleteState] = useContext(AutoCompleteContext); // Get the state of modeButtons from modeContext
  const [fetchDisruptionsState] = useContext(FetchDisruptionsContext); // Get the state of modeButtons from modeContext
  const [modeState] = useContext(ModeContext); // Get the state of modeButtons from modeContext
  // Reassign injected useRef params to internal vars
  const map = _map;
  const iconLayer = _iconLayer;

  // This useEffect is to add the disruption icons to the map
  useEffect(() => {
    // If disruption state has data in it...
    if (fetchDisruptionsState.data.length) {
      // lazy load the required ArcGIS API for JavaScript modules and CSS
      loadModules(['esri/Graphic', 'esri/layers/FeatureLayer']).then(([Graphic, FeatureLayer]) => {
        // Create new graphic for each lat long in disruptions list
        const graphics = fetchDisruptionsState.data.map(item => {
          let affectedIds = '';
          if (item.servicesAffected) {
            item.servicesAffected.forEach(service => {
              affectedIds += `${service.id}, `;
            });
          }

          return new Graphic({
            attributes: {
              id: item.id,
              title: item.title,
              mode: item.mode,
              servicesAffected: affectedIds
            },
            geometry: {
              type: 'point',
              longitude: item.lon || 0,
              latitude: item.lat || 0,
              spatialreference: { wkid: 4326 }
            },
            symbol: {
              type: 'picture-marker',
              url: busMinor, // Set to svg circle when user hits 'locate' button
              height: '30px',
              width: '51px'
            }
          });
        });

        const flayer = new FeatureLayer({
          source: graphics,
          objectIdField: 'oid', // This must be defined when creating a layer from `Graphic` objects
          // outFields: ['*'],
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
            }
          ]
        });

        function addGraphics(result) {
          result.features.forEach(feature => {
            const g = new Graphic({
              geometry: feature.geometry,
              attributes: feature.attributes,
              popupTemplate: {
                // autocasts as new PopupTemplate()
                title: '{title}',
                content: [
                  {
                    type: 'fields',
                    fieldInfos: [
                      {
                        fieldName: 'title',
                        label: 'Title',
                        visible: true
                      },
                      {
                        fieldName: 'id',
                        label: 'id',
                        visible: true
                      },
                      {
                        fieldName: 'servicesAffected',
                        label: 'servicesAffected',
                        visible: true
                      }
                    ]
                  }
                ]
              },
              symbol: {
                // autocasts as new SimpleMarkerSymbol()
                type: 'picture-marker',
                url: busMinor, // Set to svg circle when user hits 'locate' button
                height: '30px',
                width: '51px'
              }
            });
            iconLayer.current.add(g);
          });
        }

        let queryBuilder;

        if (modeState.mode) {
          queryBuilder = `mode = '${modeState.mode}'`;
        }

        if (autoCompleteState.selectedService.id) {
          queryBuilder += ` AND servicesAffected LIKE '%${autoCompleteState.selectedService.id}%'`;
        }

        const query = flayer.createQuery();
        query.where = queryBuilder;

        flayer.queryFeatures(query).then(result => {
          iconLayer.current.removeAll();
          addGraphics(result);
          // view.goTo({ center: g, zoom: 15 });
        });
      });
    }
  }, [
    autoCompleteState.selectedService.id,
    fetchDisruptionsState.data,
    iconLayer,
    map,
    modeState.mode
  ]);
};

export default useMapIconLayer;
