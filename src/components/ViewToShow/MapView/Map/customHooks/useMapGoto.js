import { useEffect, useCallback } from 'react';

const useMapGoto = (
  mapState,
  viewState,
  isIconLayerCreated,
  isPolylineCreated,
  roadsLocation,
  currentLocationState
) => {
  const goToTarget = useCallback(
    async (target) => {
      viewState.goTo({ target }).catch((error) => {
        if (error === 'AbortError') return;
        // eslint-disable-next-line no-console
        console.log(error);
      });
    },
    [viewState]
  );

  useEffect(() => {
    if (!mapState || !viewState) return;

    const shouldGoToTarget = isPolylineCreated || isIconLayerCreated || roadsLocation;
    if (!shouldGoToTarget) return;

    // CENTRE MAP BASED ON PRIORITY

    // User's selected location on 'roads' mode
    if (roadsLocation) {
      goToTarget(roadsLocation);
      return;
    }
    // User's current location selected from 'Find my location' button
    if (currentLocationState) {
      goToTarget(currentLocationState);
      return;
    }
    // Disruption icons
    const disruptionLocations = mapState.layers.items.map((layer) => layer.graphics.items);
    goToTarget(disruptionLocations);
  }, [
    currentLocationState,
    goToTarget,
    isIconLayerCreated,
    isPolylineCreated,
    mapState,
    roadsLocation,
    viewState,
  ]);
};

export default useMapGoto;
