// Using https://developers.arcgis.com/labs/browse/?product=javascript&topic=any and ESRI JS API
import React, { useRef } from 'react';
// Import custom hooks for map functionality
import useCreateMap from './customHooks/useCreateMap';
import useMapIconLayer from './customHooks/useMapIconLayer';
import useMapPolyline from './customHooks/useMapPolyline';
// Import custom styling
import './Map.scss';
import useMapPointerEvents from './customHooks/useMapPointerEvents';
import useMapGoto from './customHooks/useMapGoto';

const WebMapView = () => {
  const mapRef = useRef(); // This ref is used to reference the dom node the map mounts on

  // Custom hook to define the core mapping settings/placeholders on page/component load
  const { mapState, viewState, currentLocationState } = useCreateMap(mapRef);
  // Custom hook to add the disruption icons to the map
  const { isIconLayerCreated } = useMapIconLayer(mapState, viewState);
  // Custom hook to plot a route line on the map
  const { isPolylineCreated } = useMapPolyline(mapState, viewState);
  // Custom hook to set click event of icons on map
  useMapPointerEvents(mapState, viewState);
  // Custom hook that will pan/zoom map to selected dataset
  useMapGoto(mapState, viewState, isIconLayerCreated, isPolylineCreated, currentLocationState);

  return (
    <div
      id="disruptions-map"
      className="webmap disruptions-esri-map"
      ref={mapRef}
      title="Disruptions map"
    />
  );
};

export default WebMapView;
