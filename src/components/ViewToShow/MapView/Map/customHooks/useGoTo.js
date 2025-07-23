import { useState, useEffect, useCallback, useContext } from 'react';
import { AutoCompleteContext } from 'globalState';

// Custom hook to handle map "go to" actions based on disruptions, polylines, or selected locations
const useGoTo = (
  view,
  isIconLayerCreated,
  isFilteringDone,
  isPolylineDrawn,
  isLocationSelected,
) => {
  // Get autocomplete state from context
  const [autoCompleteState] = useContext(AutoCompleteContext);
  const { selectedItem } = autoCompleteState;
  const { selectedByMap } = selectedItem;

  // State to control whether to trigger goTo
  const [shouldGoTo, setShouldGoTo] = useState(false);
  // If user selected by map, don't move the view
  const shouldStayInPlace = selectedByMap === true;

  // Effect to set shouldGoTo when filtering or polyline drawing is done
  useEffect(() => {
    if (!view || !isIconLayerCreated) return;
    if (isFilteringDone || isPolylineDrawn) setShouldGoTo(true);
  }, [isFilteringDone, isIconLayerCreated, isPolylineDrawn, view]);

  // Get geometries of visible disruptions after filtering
  const getVisibleDisruptionsGeometry = useCallback(async () => {
    if (!view || !view.map) return [];
    const disruptionsFeatureLayer = view.map.findLayerById('disruptions');
    if (!disruptionsFeatureLayer) return [];

    const disruptionsFeatureLayerView = await view.whenLayerView(disruptionsFeatureLayer);
    const { filter } = disruptionsFeatureLayerView;

    const query = disruptionsFeatureLayer.createQuery();
    query.returnGeometry = true;

    if (filter) {
      query.where = filter.where;
      query.distance = filter.distance;
      query.geometry = filter.geometry;
      query.spatialRelationship = filter.spatialRelationship;
      query.units = filter.units;
    }

    const result = await disruptionsFeatureLayer.queryFeatures(query);
    const { features } = result;
    if (!features || !features.length) return [];

    return features.map((feature) => feature.geometry);
  }, [view]);

  // Get geometries of drawn polylines
  const getPolylineGeometry = useCallback(() => {
    if (!view || !view.map || !isPolylineDrawn) return [];
    const polylineGraphicsLayer = view.map.findLayerById('polyline');
    if (!polylineGraphicsLayer) return [];
    const { graphics } = polylineGraphicsLayer;
    if (!graphics || !graphics.items.length) return [];
    return graphics.items.map((graphic) => graphic.geometry);
  }, [isPolylineDrawn, view]);

  // Get geometries of selected locations
  const getSelectedLocationGeometry = useCallback(() => {
    if (!view || !view.map || !isLocationSelected) return [];
    const selectedLocationGraphicsLayer = view.map.findLayerById('location');
    if (!selectedLocationGraphicsLayer) return [];
    const { graphics } = selectedLocationGraphicsLayer;
    if (!graphics || !graphics.items.length) return [];
    return graphics.items.map((graphic) => graphic.geometry);
  }, [isLocationSelected, view]);

  // Go to all target geometries (disruptions, polylines, locations)
  const goToTarget = useCallback(async () => {
    const disruptionsGeometry = await getVisibleDisruptionsGeometry();
    const polylineGeometry = getPolylineGeometry();
    const selectedLocationGeometry = getSelectedLocationGeometry();

    const targetGeometry = [
      ...disruptionsGeometry,
      ...polylineGeometry,
      ...selectedLocationGeometry,
    ];

    // Only go to if there is something to show
    if (!view || !view?.map || !targetGeometry.length) return;
    view.goTo(targetGeometry).then(() => setShouldGoTo(false));
  }, [getPolylineGeometry, getSelectedLocationGeometry, getVisibleDisruptionsGeometry, view]);

  // Effect to trigger goTo when shouldGoTo is set and user hasn't selected by map
  useEffect(() => {
    // if (!shouldGoTo || shouldStayInPlace) setShouldGoTo(false);
    goToTarget();
  }, [goToTarget, shouldGoTo, shouldStayInPlace, isPolylineDrawn, isLocationSelected]);
};

export default useGoTo;
