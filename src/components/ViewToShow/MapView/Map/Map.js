// Using https://developers.arcgis.com/javascript/latest/api-reference/ and ESRI JS API
import React, { useRef } from 'react';

// Import custom hooks for map functionality
import useWindowHeightWidth from 'customHooks/useWindowHeightWidth';
import useCreateMapView from './customHooks/useCreateMapView';
import useCreateIconLayer from './customHooks/useCreateIconLayer';
import usePointerEvents from './customHooks/usePointerEvents';
import useHoverIcon from './customHooks/useHoverIcon';
import useFilterIcons from './customHooks/useFilterIcons';
import useGoTo from './customHooks/useGoTo';
import useDrawPolyline from './customHooks/useDrawPolyline';
import useSelectedLocation from './customHooks/useSelectedLocation';
import useIconClustering from './customHooks/useIconClustering';
import './Map.scss';

const WebMapView = () => {
  // MAP SETUP
  const mapContainerRef = useRef();
  const { appHeight } = useWindowHeightWidth();
  const view = useCreateMapView(mapContainerRef);
  const isIconLayerCreated = useCreateIconLayer(view);
  useIconClustering(view, isIconLayerCreated);

  // MAP INTERACTION
  useHoverIcon(view, isIconLayerCreated);
  usePointerEvents(view, isIconLayerCreated);

  // MAP DRAWING / FILTERING
  const { isFilteringDone } = useFilterIcons(view, isIconLayerCreated);
  const { isPolylineDrawn } = useDrawPolyline(view);
  const { isLocationSelected } = useSelectedLocation(view);
  useGoTo(view, isIconLayerCreated, isFilteringDone, isPolylineDrawn, isLocationSelected);

  return (
    <div
      id="disruptions-map"
      className="webmap disruptions-esri-map"
      ref={mapContainerRef}
      title="Disruptions map"
      // Map needs to have a min height (so tray can slide over top) else when squashed, it sets zoom to 1
      style={{ minHeight: appHeight && appHeight / 2 }}
    />
  );
};

export default WebMapView;
