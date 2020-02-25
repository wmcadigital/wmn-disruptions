import { useContext, useEffect } from 'react';
import { loadModules } from 'esri-loader';
import busMinor from 'assets/map-icons/bus-minor.png';

import { FetchDisruptionsContext, AutoCompleteContext, ModeContext } from 'globalState';

const useMapIconLayer = (_map, _glayer) => {
  const [autoCompleteState] = useContext(AutoCompleteContext); // Get the state of modeButtons from modeContext
  const [fetchDisruptionsState] = useContext(FetchDisruptionsContext); // Get the state of modeButtons from modeContext
  const [modeState] = useContext(ModeContext); // Get the state of modeButtons from modeContext

  const map = _map;
  const glayer = _glayer;

  // This useEffect is to add the disruption icons to the map
  useEffect(() => {
    // If disruption state has data in it...
    if (fetchDisruptionsState.data.length) {
      // Load ESRI modules
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
            glayer.current.add(g);
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
          glayer.current.removeAll();
          addGraphics(result);
          // view.goTo({ center: g, zoom: 15 });
        });
      });
    }
  }, [
    autoCompleteState.selectedService.id,
    fetchDisruptionsState.data,
    glayer,
    map,
    modeState.mode
  ]);
};

export default useMapIconLayer;
