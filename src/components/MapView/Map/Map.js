// Using https://developers.arcgis.com/labs/browse/?product=javascript&topic=any and ESRI JS API
import React, { useRef } from 'react';
// Import customHooks
import useWindowHeightWidth from 'customHooks/useWindowHeightWidth';
// Import custom hooks for map functionality
import useCreateMap from './customHooks/useCreateMap';
import useMapIconLayer from './customHooks/useMapIconLayer';
import useMapPolyline from './customHooks/useMapPolyline';
// Import custom styling
import './Map.scss';

const WebMapView = () => {
  const { eleHeight } = useWindowHeightWidth(); // Get window height and width

  // Set map refs so we can reassign them within custom functions/hooks below (similar to the state of our map)
  const mapRef = useRef(); // This ref is used to reference the dom node the map mounts on
  // const view = useRef(); // Used to ref the view of the map
  const map = useRef(); // Used to ref the map itself
  const currentLocation = useRef();
  const iconLayer = useRef(); // Used to ref a graphicsLayer for icons on map
  const polyline = useRef(); // Used to ref a graphicsLayer for the polyline of a route

  console.log(1);
  // Custom hook to define the core mapping settings/placeholders on page/component load
  const { v } = useCreateMap(mapRef, map, currentLocation, iconLayer, polyline);
  console.log(2);
  // Custom hook to add the disruption icons to the map
  useMapIconLayer(iconLayer, v, currentLocation);
  console.log(3);
  // Custom hook to plot a route line on the map
  useMapPolyline(polyline, iconLayer, v, currentLocation);

  return (
    <div
      id="disruptions-map"
      className="webmap disruptions-esri-map"
      ref={mapRef}
      title="Disruptions map"
      style={{ height: `${eleHeight}px` }}
    />
  );
};

export default WebMapView;
