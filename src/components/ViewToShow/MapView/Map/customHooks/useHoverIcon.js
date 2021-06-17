/* eslint-disable no-console */
import { useState, useCallback, useContext, useEffect } from 'react';
import { AutoCompleteContext } from 'globalState';

const useHoverIcon = (view, isIconLayerCreated) => {
  const [autoCompleteState] = useContext(AutoCompleteContext);
  const selectedItemId = autoCompleteState?.selectedItem?.id;
  const [shouldUpdateIcons, setShouldUpdateIcons] = useState(false);

  useEffect(() => {
    if (!isIconLayerCreated) return;
    setShouldUpdateIcons(true);
  }, [isIconLayerCreated, selectedItemId]);

  const getDisruptionsFeatureLayer = useCallback(() => {
    if (!view || !view?.map || !isIconLayerCreated) return null;
    return view.map.findLayerById('disruptions');
  }, [isIconLayerCreated, view]);

  const queryDisruptionsFeatureLayer = useCallback(
    async (whereClause) => {
      const disruptionsFeatureLayer = getDisruptionsFeatureLayer();
      if (!disruptionsFeatureLayer) return [];

      const query = disruptionsFeatureLayer.createQuery();
      query.where = whereClause;
      let queryResult;

      try {
        queryResult = await disruptionsFeatureLayer.queryFeatures(query);
      } catch (error) {
        console.log(error);
      }

      if (!queryResult?.features.length) return [];
      return queryResult.features;
    },
    [getDisruptionsFeatureLayer]
  );

  const updateIcons = useCallback(
    async (disruptionId) => {
      const disruptionsFeatureLayer = getDisruptionsFeatureLayer();
      if (!disruptionsFeatureLayer) return;

      const whereClause = `(id LIKE '${disruptionId}') OR (mapIcon LIKE '%-hover%')`;
      let features;

      try {
        features = await queryDisruptionsFeatureLayer(whereClause);
      } catch (error) {
        console.log(error);
      }

      if (!features.length) return;

      const featureToHover = features.filter(
        (feature) => feature.attributes.id === disruptionId
      )[0];

      const featureToUnhover = features.filter((feature) =>
        feature.attributes.mapIcon.includes('hover')
      )[0];

      const isAlreadyHovered = featureToHover?.attributes?.id === featureToUnhover?.attributes?.id;
      if (isAlreadyHovered) return;

      const updateFeatures = [];
      if (featureToUnhover) {
        featureToUnhover.attributes.mapIcon = featureToUnhover.attributes.mapIcon.replace(
          '-hover',
          ''
        );
        updateFeatures.push(featureToUnhover);
      }

      if (featureToHover) {
        featureToHover.attributes.mapIcon = `${featureToHover.attributes.mapIcon}-hover`;
        updateFeatures.push(featureToHover);
      }

      try {
        await disruptionsFeatureLayer.applyEdits({ updateFeatures });
      } catch (error) {
        console.log('Error applying disruption feature layer edits:', error);
      }

      setShouldUpdateIcons(false);
    },
    [getDisruptionsFeatureLayer, queryDisruptionsFeatureLayer]
  );

  useEffect(() => {
    if (!shouldUpdateIcons) return;
    updateIcons(selectedItemId);
  }, [updateIcons, selectedItemId, shouldUpdateIcons]);
};

export default useHoverIcon;
