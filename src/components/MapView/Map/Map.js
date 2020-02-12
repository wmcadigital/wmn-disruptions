// Using https://developers.arcgis.com/labs/browse/?product=javascript&topic=any and ESRI JS API
import React, { useContext, useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';
import axios from 'axios';
import locateCircle from 'assets/svgs/map/locate-circle.svg';

import { FetchDisruptionsContext, AutoCompleteContext } from 'globalState';

import s from './Map.module.scss';

const WebMapView = () => {
  const mapRef = useRef();

  const [fetchDisruptionsState] = useContext(FetchDisruptionsContext); // Get the state of modeButtons from modeContext
  const [autoCompleteState] = useContext(AutoCompleteContext); // Get the state of modeButtons from modeContext
  // const [pins, setPins] = useState([]);
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
        });
    }
  }, [autoCompleteState.id]);

  useEffect(() => {
    let view;
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    // Make sure that the referenced module is also injected as a param in the .then function below
    loadModules(
      [
        'esri/Map',
        'esri/views/MapView',
        'esri/Basemap',
        'esri/layers/VectorTileLayer',
        'esri/layers/GraphicsLayer',
        'esri/widgets/Locate',
        'esri/Graphic'
      ],
      {
        css: true
      }
    ).then(([Map, MapView, Basemap, VectorTileLayer, GraphicsLayer, Locate, Graphic]) => {
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
      const map = new Map({
        basemap
      });

      // Create a new map view with settings
      view = new MapView({
        container: mapRef.current,
        map,
        center: [-2.0047209, 52.4778132],
        zoom: 10
      });

      const locateBtn = new Locate({
        view, // Attaches the Locate button to the view
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

      view.ui.move(['zoom'], 'top-right');

      // Add the locate widget to the top left corner of the view
      view.ui.add(locateBtn, {
        position: 'top-right'
      });

      if (fetchDisruptionsState.data.length) {
        const graphics = fetchDisruptionsState.data.map(item => {
          return new Graphic({
            geometry: {
              type: 'point',
              longitude: item.lon,
              latitude: item.lat
            },
            symbol: {
              type: 'picture-marker',
              url: locateCircle, // Set to svg circle when user hits 'locate' button
              height: '150px',
              width: '150px'
            }
          });
        });
        console.log(graphics);

        const graphicsLayer = new GraphicsLayer({
          graphics // array of graphics objects
        });

        map.add(graphicsLayer);
      }
    });

    return () => {
      if (view) {
        // destroy the map view
        view.container = null;
      }
    };
  }, [fetchDisruptionsState.data]);

  return (
    <div id="disruptions-map" className={`webmap ${s.map}`} ref={mapRef} title="Disruptions map" />
  );
};

export default WebMapView;
