import { useState, useContext, useEffect, useRef } from 'react';
import { AutoCompleteContext, ModeContext } from 'globalState';
import mapMarker from 'assets/svgs/map/map-marker.svg';

import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Circle from '@arcgis/core/geometry/Circle';

const useMapRoadsLocationLayer = (map, view) => {
  const [autoCompleteState] = useContext(AutoCompleteContext);
  const [modeState] = useContext(ModeContext);
  const { mode } = modeState;
  const isRoadsModeSelected = mode === 'roads';
  // 'roadsLocation' state will be used to centre the map to the selectedLocation
  const [roadsLocation, setRoadsLocation] = useState(null); // https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#goTo for info on the allowed format
  const graphicsLayer = useRef();

  useEffect(() => {
    const { lat, lon, radius } = autoCompleteState?.selectedLocation || {};
    const isLocationSelected = lat && lon && radius;

    const drawRoadsLocationLayer = async () => {
      // const [Graphic, GraphicsLayer, Circle] = await loadModules([
      //   'esri/Graphic',
      //   'esri/layers/GraphicsLayer',
      //   'esri/geometry/Circle',
      // ]);

      if (!graphicsLayer.current) {
        graphicsLayer.current = new GraphicsLayer({ id: 'roadsLocation' });
        map.add(graphicsLayer.current);
      }

      // Create radius circle
      const circle = new Circle({
        center: [lon, lat],
        radius: radius * 1609.34, // Miles to kilometres
        geodesic: true,
      });

      const opacity = 0.2;

      const radiusCircleGraphic = new Graphic({
        geometry: {
          type: 'polygon',
          rings: circle.rings[0],
        },
        symbol: {
          type: 'simple-fill',
          color: [157, 91, 175, opacity], // #9d5baf
          outline: {
            color: [60, 16, 83, opacity], // #3c1053
            width: 0.3,
          },
        },
      });

      // Pinpoint icon
      const pinpointGraphic = new Graphic({
        geometry: {
          type: 'point',
          latitude: lat,
          longitude: lon,
        },
        symbol: {
          type: 'picture-marker',
          url: mapMarker,
          height: '102.4px',
          width: '38.4px',
        },
      });

      setRoadsLocation(radiusCircleGraphic); // allow the map to be centered on the radius circle, so the whole thing is in view

      graphicsLayer.current.removeAll();
      graphicsLayer.current.addMany([radiusCircleGraphic, pinpointGraphic]);
      graphicsLayer.current.visible = true;
      map.reorder(graphicsLayer.current, 0); // Place this layer at the bottom (below iconLayer)
    };

    if (isLocationSelected && isRoadsModeSelected && view) {
      drawRoadsLocationLayer();
    }

    if (map && graphicsLayer.current && (!isLocationSelected || !isRoadsModeSelected)) {
      graphicsLayer.current.visible = false;
      setRoadsLocation(null);
    }

    return () => {
      if (!graphicsLayer.current) return;
      map.remove(graphicsLayer);
      setRoadsLocation(null);
    };
  }, [autoCompleteState.selectedLocation, isRoadsModeSelected, map, mode, view]);

  return {
    roadsLocation,
  };
};

export default useMapRoadsLocationLayer;
