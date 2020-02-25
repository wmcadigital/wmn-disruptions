// Using https://developers.arcgis.com/labs/browse/?product=javascript&topic=any and ESRI JS API
import React, { useContext, useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';
import axios from 'axios';

import { AutoCompleteContext } from 'globalState';
import useCreateMap from './customHooks/useCreateMap';
import useMapIconLayer from './customHooks/useMapIconLayer';

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

  const [autoCompleteState] = useContext(AutoCompleteContext); // Get the state of modeButtons from modeContext

  useCreateMap(mapRef, map, glayer, polyline, view);

  useMapIconLayer(map, glayer);

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
