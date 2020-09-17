import { useEffect } from 'react';

const useMapGoto = (
  mapState,
  viewState,
  isIconLayerCreated,
  isPolylineCreated,
  currentLocationState
) => {
  // Set locations to goto (if there is users currentLocation  available then we want to show them in the view as well as the location of the graphic items, else just show graphic items)
  useEffect(() => {
    // Function for zooming map to area (notice async as we to await for when map is ready)
    const goToArea = async () => {
      if (mapState && viewState && (isPolylineCreated || isIconLayerCreated)) {
        const locations = await mapState.layers.items.map((layer) => layer.graphics.items);
        if (currentLocationState) locations.push(currentLocationState);
        viewState.goTo({ target: locations.flat() }); // Go to locations set above (flatten array so goto can understand better)
      }
    };
    goToArea();
  }, [currentLocationState, isIconLayerCreated, isPolylineCreated, mapState, viewState]);
};

export default useMapGoto;
