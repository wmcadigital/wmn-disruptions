import { useState, useEffect, useCallback, useContext } from 'react';
import { AutoCompleteContext } from 'globalState';

const useGoTo = (
  view,
  isIconLayerCreated,
  isFilteringDone,
  isPolylineDrawn,
  isLocationSelected
) => {
  const [autoCompleteState] = useContext(AutoCompleteContext);
  const { selectedItem } = autoCompleteState;
  const { selectedByMap } = selectedItem;
  //
  const [shouldGoTo, setShouldGoTo] = useState(false);
  const shouldStayInPlace = selectedByMap === true;

  useEffect(() => {
    if (!view || !isIconLayerCreated) return;
    if (isFilteringDone || isPolylineDrawn) setShouldGoTo(true);
  }, [isFilteringDone, isIconLayerCreated, isPolylineDrawn, view]);

  const getVisibleDisruptionsGeometry = useCallback(async () => {
    const disruptionsFeatureLayer = view.map.findLayerById('disruptions');
    if (!disruptionsFeatureLayer) return [];

    const disruptionsFeatureLayerView = await view.whenLayerView(disruptionsFeatureLayer);
    const { filter } = disruptionsFeatureLayerView;

    const query = disruptionsFeatureLayer.createQuery();
    query.returnGeomerty = true;

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

  const getPolylineGeometry = useCallback(() => {
    if (!view || !view?.map || !isPolylineDrawn) return [];

    const polylineGraphicsLayer = view.map.findLayerById('polyline');
    const { graphics } = polylineGraphicsLayer;

    if (!graphics || !graphics?.items.length) return [];
    return graphics.items.map((graphic) => graphic.geometry);
  }, [isPolylineDrawn, view]);

  const getSelectedLocationGeometry = useCallback(() => {
    if (!view || !view?.map || !isLocationSelected) return [];

    const selectedLocationGraphicsLayer = view.map.findLayerById('location');
    const { graphics } = selectedLocationGraphicsLayer;

    if (!graphics || !graphics?.items.length) return [];
    return graphics.items.map((graphic) => graphic.geometry);
  }, [isLocationSelected, view]);

  const goToTarget = useCallback(async () => {
    const disruptionsGeometry = await getVisibleDisruptionsGeometry();
    const polylineGeometry = getPolylineGeometry();
    const selectedLocationGeometry = getSelectedLocationGeometry();

    const targetGeometry = [
      ...disruptionsGeometry,
      ...polylineGeometry,
      ...selectedLocationGeometry,
    ];

    if (!view || !view?.map || !targetGeometry.length) return;
    view.goTo(targetGeometry).then(() => setShouldGoTo(false));
  }, [getPolylineGeometry, getSelectedLocationGeometry, getVisibleDisruptionsGeometry, view]);

  useEffect(() => {
    if (!shouldGoTo || shouldStayInPlace) setShouldGoTo(false);
    else goToTarget();
  }, [goToTarget, shouldGoTo, shouldStayInPlace, isPolylineDrawn, isLocationSelected]);
};

export default useGoTo;
