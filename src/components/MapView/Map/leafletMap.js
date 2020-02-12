import React, { useEffect } from 'react';
import L from 'leaflet';
// import s from './Map.module.scss';

// require('mapbox-gl');
require('esri-leaflet');
require('esri-leaflet-vector');

const Map = () => {
  const mapRef = React.createRef();
  useEffect(() => {
    const map = L.map('disruptions-map', {
      center: [52.486125, -1.878662],
      zoom: 8
    });

    // When loaded, create a new basemap
    // set the basemap to the one being used: https://tfwm.maps.arcgis.com/home/item.html?id=53f165a8863c4d40ba017042e248355e
    L.esri.Vector.layer('53f165a8863c4d40ba017042e248355e').addTo(map);

    // esri.basemapLayer(basemap).addTo(map);
    // return () => {
    //   cleanup;
    // };
  }, []);

  return <div id="disruptions-map" ref={mapRef} title="Disruptions map" />;
};

export default Map;
