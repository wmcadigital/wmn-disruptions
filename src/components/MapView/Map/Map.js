// Using https://developers.arcgis.com/labs/browse/?product=javascript&topic=any and ESRI JS API
import React, { useRef } from 'react';

import useCreateMap from './customHooks/useCreateMap';
import useMapIconLayer from './customHooks/useMapIconLayer';
import useMapPolyline from './customHooks/useMapPolyline';

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

  useCreateMap(mapRef, map, glayer, polyline, view);

  useMapIconLayer(map, glayer);

  useMapPolyline(polyline);

  return (
    <div id="disruptions-map" className={`webmap ${s.map}`} ref={mapRef} title="Disruptions map" />
  );
};

export default WebMapView;
