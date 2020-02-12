// Using https://developers.arcgis.com/labs/browse/?product=javascript&topic=any and ESRI JS API
import React, { useContext, useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';
import axios from 'axios';

import { FetchDisruptionsContext, AutoCompleteContext } from 'globalState';

// Import map icons
import locateCircle from 'assets/svgs/map/locate-circle.svg';
// bus icons
import busMinor from 'assets/map-icons/bus-minor.png';
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
  const renders = useRef(0);
  const view = useRef();
  const map = useRef();

  const [fetchDisruptionsState] = useContext(FetchDisruptionsContext); // Get the state of modeButtons from modeContext
  const [autoCompleteState] = useContext(AutoCompleteContext); // Get the state of modeButtons from modeContext

  // Map useEffect
  useEffect(() => {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    // Make sure that the referenced module is also injected as a param in the .then function below
    loadModules(
      [
        'esri/Map',
        'esri/views/MapView',
        'esri/Basemap',
        'esri/layers/VectorTileLayer',
        'esri/widgets/Locate',
        'esri/Graphic'
      ],
      {
        css: true
      }
    ).then(([Map, MapView, Basemap, VectorTileLayer, Locate, Graphic]) => {
      // When loaded, create a new basemap
      const basemap = new Basemap({
        baseLayers: [
          new VectorTileLayer({
            portalItem: {
              // set the basemap to the one being used: https://tfwm.maps.arcgis.com/home/item.html?id=53f165a8863c4d40ba017042e248355e
              id: '53f165a8863c4d40ba017042e248355e'
            }
          })
        ]
      });

      // Create a new map with the basemap set above
      map.current = new Map({
        basemap
      });

      // Create a new map view with settings
      view.current = new MapView({
        container: mapRef.current,
        map: map.current,
        center: [-2.0047209, 52.4778132],
        zoom: 10
      });

      const locateBtn = new Locate({
        view: view.current, // Attaches the Locate button to the view
        graphic: new Graphic({
          // overwrites the default symbol used for the graphic placed at the location of the user when found
          symbol: {
            type: 'picture-marker',
            url: locateCircle, // Set to svg circle when user hits 'locate' button
            height: '150px',
            width: '150px'
          }
        })
      });

      view.current.ui.move(['zoom'], 'top-right');

      // Add the locate widget to the top left corner of the view.current
      view.current.ui.add(locateBtn, {
        position: 'top-right'
      });
    });
    // eslint-disable-next-line no-plusplus
    console.log(renders.current++);

    return () => {
      if (view.current) {
        // destroy the map view
        view.current.container = null;
      }
    };
  }, []);

  useEffect(() => {
    if (autoCompleteState.id) {
      axios
        .get(
          `https://trasnport-api-isruptions-v2.azure-api.net/bus/v1/RouteGeoJSON/${autoCompleteState.id}`,
          {
            headers: {
              'Ocp-Apim-Subscription-Key': '55060e2bfbf743c5829b9eef583506f7'
            }
          }
        )
        .then(route => {
          console.log(route);
          // Get esri modules
          loadModules(['esri/Graphic']).then(([Graphic]) => {
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
            view.current.graphics.add(poly);
            console.log(poly);
          });
        });
    }
  }, [autoCompleteState.id]);

  useEffect(() => {
    if (fetchDisruptionsState.data.length) {
      loadModules(['esri/Graphic', 'esri/layers/GraphicsLayer']).then(
        ([Graphic, GraphicsLayer]) => {
          const graphics = fetchDisruptionsState.data.map(item => {
            return new Graphic({
              geometry: {
                type: 'point',
                longitude: item.lon,
                latitude: item.lat
              },
              symbol: {
                type: 'picture-marker',
                url: busMinor, // Set to svg circle when user hits 'locate' button
                height: '30px',
                width: '51px'
              }
            });
          });
          console.log(graphics);

          const graphicsLayer = new GraphicsLayer({
            graphics // array of graphics objects
          });

          map.current.add(graphicsLayer);
        }
      );
    }
  }, [fetchDisruptionsState.data]);

  return (
    <div id="disruptions-map" className={`webmap ${s.map}`} ref={mapRef} title="Disruptions map" />
  );
};

export default WebMapView;
