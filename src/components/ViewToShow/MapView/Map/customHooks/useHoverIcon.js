/* eslint-disable no-param-reassign */
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
        const { name } = error;
        // MapView is destroyed on onUnmount which throws 'load:instance-destroyed', so only log other errors
        if (name !== 'load:instance-destroyed') {
          console.log(error);
        }
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

      const featuresToHover = features.filter((feature) => feature.attributes.id === disruptionId);

      const featuresToUnhover = features.filter((feature) =>
        feature.attributes.mapIcon.includes('hover')
      );
      const hoveredFeatureIds = featuresToUnhover.map((hovered) => hovered?.attributes?.id);

      const isIdAlreadyHovered = featuresToHover.some((feature) => {
        return hoveredFeatureIds.includes(feature?.attributes?.id);
      });
      if (isIdAlreadyHovered) return;

      const updateFeatures = [];
      if (featuresToUnhover) {
        featuresToUnhover.forEach((feature) => {
          feature.attributes.mapIcon = feature.attributes.mapIcon.replace('-hover', '');
        });
        updateFeatures.push(featuresToUnhover);
      }

      if (featuresToHover.length) {
        featuresToHover.forEach((feature) => {
          feature.attributes.mapIcon = `${feature.attributes.mapIcon}-hover`;
        });
        updateFeatures.push(featuresToHover);
      }

      try {
        await disruptionsFeatureLayer.applyEdits({ updateFeatures: updateFeatures.flat() });
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
