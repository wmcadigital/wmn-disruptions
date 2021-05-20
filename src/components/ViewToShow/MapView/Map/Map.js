// Using https://developers.arcgis.com/labs/browse/?product=javascript&topic=any and ESRI JS API
import React, { useRef } from 'react';
// Import custom hooks for map functionality
import useWindowHeightWidth from 'customHooks/useWindowHeightWidth';
import useCreateMap from './customHooks/useCreateMap';
import useMapIconLayer from './customHooks/useMapIconLayer';
import useMapPolyline from './customHooks/useMapPolyline';
// Import custom styling
import './Map.scss';
import useMapPointerEvents from './customHooks/useMapPointerEvents';
import useMapGoto from './customHooks/useMapGoto';
import useMapRoadsLocationLayer from './customHooks/useMapRoadsLocationLayer';

const WebMapView = () => {
  const mapRef = useRef(); // This ref is used to reference the dom node the map mounts on
  const { appHeight } = useWindowHeightWidth();
  // Custom hook to define the core mapping settings/placeholders on page/component load
  const { mapState, viewState, currentLocationState } = useCreateMap(mapRef);
  // Custom hook to add the disruption icons to the map
  const { isIconLayerCreated } = useMapIconLayer(mapState, viewState);
  // Custom hook to plot a route line on the map
  const { isPolylineCreated } = useMapPolyline(mapState, viewState);
  // Roads
  const { roadsLocation } = useMapRoadsLocationLayer(mapState, viewState);
  // Custom hook to set click event of icons on map
  useMapPointerEvents(mapState, viewState);
  // Custom hook that will pan/zoom map to selected dataset
  useMapGoto(
    mapState,
    viewState,
    isIconLayerCreated,
    isPolylineCreated,
    roadsLocation,
    currentLocationState
  );

  return (
    <div
      id="disruptions-map"
      className="webmap disruptions-esri-map"
      ref={mapRef}
      title="Disruptions map"
      // Map needs to have a min height (so tray can slide over top) else when squashed, it sets zoom to 1
      style={{ minHeight: appHeight && appHeight / 2 }}
    />
  );
};

export default WebMapView;
