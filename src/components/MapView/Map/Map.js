// Using https://developers.arcgis.com/labs/browse/?product=javascript&topic=any and ESRI JS API
import React, { useRef, useEffect } from 'react';
// Import custom hooks for map functionality
import useCreateMap from './customHooks/useCreateMap';
import useMapIconLayer from './customHooks/useMapIconLayer';
import useMapPolyline from './customHooks/useMapPolyline';
// Import custom styling
import './Map.scss';
import useMapPointerEvents from './customHooks/useMapPointerEvents';

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

  // Set locations to goto (if there is users currentLocation  available then we want to show them in the view as well as the location of the graphic items, else just show graphic items)
  useEffect(() => {
    console.log(currentLocationState);
    // Function for zooming map to area (notice async as we to await for when map is ready)
    const goToArea = async () => {
      if ((mapState && isPolylineCreated) || isIconLayerCreated) {
        const locations = await mapState.layers.items.map((layer) => layer.graphics.items);
        if (currentLocationState) locations.push(currentLocationState);
        viewState.goTo(locations); // Go to locations set above
      }
    };
    goToArea();
  }, [currentLocationState, isIconLayerCreated, isPolylineCreated, mapState, viewState]);

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
