import { useState, useContext, useCallback, useEffect } from 'react';
import { loadModules } from 'esri-loader';
import { AutoCompleteContext, ModeContext } from 'globalState';
import mapMarker from 'assets/svgs/map/map-marker.svg';

const useSelectedLocation = (view) => {
  const [autoCompleteState] = useContext(AutoCompleteContext);
  const { lat, lon, radius } = autoCompleteState?.selectedLocation || {};
  const hasUserSelectedLocation = lat && lon && radius;

  const [modeState] = useContext(ModeContext);
  const { mode } = modeState;
  const isRoadsModeSelected = mode === 'roads';
  //
  const [isLocationSelected, setIsLocationSelected] = useState(false);

  const drawSelectedLocation = useCallback(async () => {
    let Graphic;
    let Circle;

    try {
      [Graphic, Circle] = await loadModules(['esri/Graphic', 'esri/geometry/Circle']);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
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

    if (!view || !view?.map) return;

    const locationGraphicsLayer = view.map.findLayerById('location');
    if (!locationGraphicsLayer) return;
    locationGraphicsLayer.visible = true;
    locationGraphicsLayer.addMany([radiusCircleGraphic, pinpointGraphic]);
    setIsLocationSelected(true);
  }, [lat, lon, radius, view]);

  const clearLocation = useCallback(() => {
    if (!view || !view?.map) return;

    const locationGraphicsLayer = view.map.findLayerById('location');
    if (!locationGraphicsLayer) return;

    locationGraphicsLayer.removeAll();
    locationGraphicsLayer.visible = false;
    setIsLocationSelected(false);
  }, [view]);

  useEffect(() => {
    if (isRoadsModeSelected && hasUserSelectedLocation) drawSelectedLocation();
    else clearLocation();
  }, [clearLocation, drawSelectedLocation, hasUserSelectedLocation, isRoadsModeSelected]);

  return { isLocationSelected };
};

export default useSelectedLocation;
