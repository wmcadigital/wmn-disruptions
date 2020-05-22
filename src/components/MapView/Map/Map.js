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
import useMapPointerEvents from './customHooks/useMapPointerEvents';

const WebMapView = () => {
  const { eleHeight } = useWindowHeightWidth(); // Get window height and width

  // Set map refs so we can reassign them within custom functions/hooks below (similar to the state of our map)
  const mapRef = useRef(); // This ref is used to reference the dom node the map mounts on

  // Custom hook to define the core mapping settings/placeholders on page/component load
  const { mapState, viewState, currentLocationState } = useCreateMap(mapRef);
  useMapPointerEvents(mapState, viewState);
  // Custom hook to add the disruption icons to the map
  useMapIconLayer(mapState, viewState, currentLocationState);
  // Custom hook to plot a route line on the map
  useMapPolyline(mapState, viewState, currentLocationState);

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
