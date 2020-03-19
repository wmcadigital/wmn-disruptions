// Using https://developers.arcgis.com/labs/browse/?product=javascript&topic=any and ESRI JS API
import React, { useRef } from 'react';
// Import custom hooks for map functionality
import useCreateMap from './customHooks/useCreateMap';
import useMapIconLayer from './customHooks/useMapIconLayer';
import useMapPolyline from './customHooks/useMapPolyline';
// import useMapPointerEvents from './customHooks/useMapPointerEvents';
// Import custom styling
import s from './Map.module.scss';

const WebMapView = () => {
  // Set map refs so we can reassign them within custom functions/hooks below (similar to the state of our map)
  const mapRef = useRef(); // This ref is used to reference the dom node the map mounts on
  const view = useRef(); // Used to ref the view of the map
  const map = useRef(); // Used to ref the map itself
  const currentLocation = useRef();
  const iconLayer = useRef(); // Used to ref a graphicsLayer for icons on map
  const polyline = useRef(); // Used to ref a graphicsLayer for the polyline of a route

  // Custom hook to define the core mapping settings/placeholders on page/component load
  useCreateMap(mapRef, map, currentLocation, iconLayer, polyline, view);

  // Custom hook to add the disruption icons to the map
  useMapIconLayer(iconLayer, view, currentLocation);

  // Custom hook to plot a route line on the map
  useMapPolyline(polyline, view, currentLocation);

  return (
    <div id="disruptions-map" className={`webmap ${s.map}`} ref={mapRef} title="Disruptions map" />
  );
};

export default WebMapView;
