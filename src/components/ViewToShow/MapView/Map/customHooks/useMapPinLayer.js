import { useContext, useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';
import { AutoCompleteContext, ModeContext } from 'globalState';

const useMapPinLayer = (map, view) => {
  console.log(map);
  //
  const [autoCompleteState] = useContext(AutoCompleteContext);
  const [modeState] = useContext(ModeContext);
  const { mode } = modeState;
  //
  const graphicsLayer = useRef();

  useEffect(() => {
    const { location, radius } = autoCompleteState?.selectedItem || {};
    const isLocationSelected = location && location?.x && location?.y && radius;
    const isRoadsModeSelected = mode === 'roads';

    const drawPinLayer = async () => {
      const [lat, lon] = [location.y, location.x];
      const [Graphic, GraphicsLayer, Circle] = await loadModules([
        'esri/Graphic',
        'esri/layers/GraphicsLayer',
        'esri/geometry/Circle',
      ]);

      if (!graphicsLayer.current) {
        graphicsLayer.current = new GraphicsLayer({ id: 'pinLayer' });
        map.add(graphicsLayer.current);
      }

      const circle = new Circle({
        center: [lon, lat],
        radius: radius * 1609.34,
        geodesic: true,
      });

      const polygon = {
        type: 'polygon',
        rings: circle.rings[0],
      };

      const alpha = 0.2;
      const simpleFill = {
        type: 'simple-fill',
        color: [157, 91, 175, alpha], // #9d5baf
        outline: {
          color: [60, 16, 83, alpha], // #3c1053
          width: 0.3,
        },
      };

      const pointGraphic = new Graphic({
        geometry: polygon,
        symbol: simpleFill,
      });

      graphicsLayer.current.removeAll();
      graphicsLayer.current.add(pointGraphic);
    };

    if (isLocationSelected && isRoadsModeSelected && view) {
      drawPinLayer();
    }

    if (map && graphicsLayer.current && (!isLocationSelected || !isRoadsModeSelected)) {
      graphicsLayer.current.removeAll();
    }

    return () => {
      if (!graphicsLayer.current) return;
      map.remove(graphicsLayer);
    };
  }, [autoCompleteState.selectedItem, map, mode, view]);

  const pauseMapGoTo = mode === 'roads' && !graphicsLayer.current;

  return { pauseMapGoTo };
};

export default useMapPinLayer;
