/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import { useEffect, useState, useContext, useCallback } from 'react';
import { AutoCompleteContext, ModeContext } from 'globalState';

const usePointerEvents = (view, isIconLayerCreated) => {
  const [areEventsAdded, setAreEventsAdded] = useState(false);
  const [, autoCompleteDispatch] = useContext(AutoCompleteContext);
  const [modeState] = useContext(ModeContext);

  const getClickedFeature = useCallback(
    async (hitTestResponse) => {
      const clickedIcons = hitTestResponse.results.filter((result) => {
        return result.graphic?.sourceLayer?.id === 'disruptions';
      });
      if (!clickedIcons.length) return null;

      const clickedFeatureOID = clickedIcons[0]?.graphic?.attributes?.oid;
      if (!clickedFeatureOID) return null;

      const disruptionsFeatureLayer = view.map.findLayerById('disruptions');
      const query = disruptionsFeatureLayer.createQuery();
      query.where = `oid = ${clickedFeatureOID}`;
      const queryResult = await disruptionsFeatureLayer.queryFeatures(query);

      const clickedFeature = queryResult?.features[0];
      if (!clickedFeature) return null;

      return clickedFeature;
    },
    [view]
  );

  const selectDisruption = useCallback(
    (disruptionId) => {
      if (modeState.mode !== 'roads') {
        autoCompleteDispatch({
          type: 'RESET_SELECTED_SERVICES',
        });
      }
      //   Update state to make it selected map disruption
      autoCompleteDispatch({
        type: 'UDPATE_SELECTED_ITEM',
        payload: { id: disruptionId, selectedByMap: true },
      });
    },
    [autoCompleteDispatch, modeState.mode]
  );

  const setSelectedItem = useCallback(
    async (event) => {
      try {
        const response = await view.hitTest(event.screenPoint);
        const feature = await getClickedFeature(response);
        if (feature) selectDisruption(feature.attributes.id);
      } catch (error) {
        console.log('setSelectedItem error:', error);
      }
    },
    [view, getClickedFeature, selectDisruption]
  );

  const usePointerCursor = useCallback(
    async (event) => {
      const disruptionsLayer = view.map.findLayerById('disruptions');
      const options = { include: disruptionsLayer };

      try {
        const { results } = await view.hitTest(event, options);
        if (results && results.length) {
          view.root.style.cursor = 'pointer';
        } else {
          view.root.style.cursor = null;
        }
      } catch (error) {
        console.log('usePointerCursor error:', error);
      }
    },
    [view]
  );

  const addPointerEvents = useCallback(() => {
    view.on('click', setSelectedItem);
    view.on('pointer-move', usePointerCursor);
    setAreEventsAdded(true);
  }, [setSelectedItem, usePointerCursor, view]);

  useEffect(() => {
    if (view === null || !view?.map) return;
    if (areEventsAdded || !isIconLayerCreated) return;
    addPointerEvents();
  });
};

export default usePointerEvents;
