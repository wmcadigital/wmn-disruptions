// Using https://developers.arcgis.com/labs/browse/?product=javascript&topic=any and ESRI JS API
import React, { useContext, useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';
import axios from 'axios';

import { FetchDisruptionsContext, AutoCompleteContext, ModeContext } from 'globalState';
import busMinor from 'assets/map-icons/bus-minor.png';
import useCreateMap from './customHooks/useCreateMap';

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

import s from './Map.module.scss';

const WebMapView = () => {
  const mapRef = useRef();
  const view = useRef(); // view.current
  const map = useRef();
  const glayer = useRef();
  const polyline = useRef();

  const [fetchDisruptionsState] = useContext(FetchDisruptionsContext); // Get the state of modeButtons from modeContext
  const [autoCompleteState] = useContext(AutoCompleteContext); // Get the state of modeButtons from modeContext
  const [modeState] = useContext(ModeContext); // Get the state of modeButtons from modeContext

  useCreateMap(mapRef, map, glayer, polyline, view);

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

        console.log({ queryBuilder });

        const query = flayer.createQuery();
        query.where = queryBuilder;

        flayer.queryFeatures(query).then(result => {
          glayer.current.removeAll();
          addGraphics(result);
          console.log({ map: map.current.layers });

          // view.goTo({ center: g, zoom: 15 });
        });
      });
    }
  }, [autoCompleteState.selectedService, fetchDisruptionsState.data, modeState.mode]);

  // This useEffect is to plot the line on the map
  useEffect(() => {
    if (polyline.current) {
      polyline.current.removeAll();
    }
    // If there is an ID in state, then lets hit the API and get the geoJSON
    if (autoCompleteState.selectedService.id) {
      axios
        .get(
          `https://trasnport-api-isruptions-v2.azure-api.net/bus/v1/RouteGeoJSON/${autoCompleteState.selectedService.id}`,
          {
            headers: {
              'Ocp-Apim-Subscription-Key': '55060e2bfbf743c5829b9eef583506f7'
            }
          }
        )
        .then(route => {
          // Get esri modules
          loadModules(['esri/Graphic']).then(([Graphic]) => {
            // Create a new polyline with the geoJSON from the API for the ID
            const poly = new Graphic({
              geometry: {
                type: 'polyline',
                paths: route.data.geoJson.features[0].geometry.coordinates
              },
              symbol: {
                type: 'simple-line', // autocasts as new SimpleLineSymbol()
                color: [226, 119, 40], // RGB color values as an array
                width: 4
              }
            });

            polyline.current.add(poly); // Add polyline to the map
          });
        });
    }
  }, [autoCompleteState.selectedService.id]);

  return (
    <div id="disruptions-map" className={`webmap ${s.map}`} ref={mapRef} title="Disruptions map" />
  );
};

export default WebMapView;
