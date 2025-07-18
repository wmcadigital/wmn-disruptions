/* eslint-disable no-console */
import { useState, useEffect, useCallback, useContext } from 'react';
import { AutoCompleteContext, ModeContext, WhenContext } from 'globalState';
import useDateFilter from 'customHooks/useDateFilter';

import FeatureFilter from '@arcgis/core/layers/support/FeatureFilter';
import Point from '@arcgis/core/geometry/Point';

// Custom hook to filter disruption icons on the map based on user-selected filters
const useFilterIcons = (view, isIconLayerCreated) => {
  // State to track if filtering is done
  const [isFilteringDone, setIsFilteringDone] = useState(false);

  // Contexts for autocomplete, mode, and when (date) filters
  const [autoCompleteState] = useContext(AutoCompleteContext);
  const { selectedItem, selectedItemTo, selectedLocation } = autoCompleteState;
  const { selectedByMap } = selectedItem;

  const [modeState] = useContext(ModeContext);
  const { mode } = modeState;

  const [whenState] = useContext(WhenContext);
  const { when } = whenState;

  // Get date range for filtering
  const { fromDateUtc, toDateUtc } = useDateFilter();

  // Helper to get the disruptions FeatureLayer from the map
  const getDisruptionsFeatureLayer = useCallback(() => {
    if (!view || !view?.map || !isIconLayerCreated) return null;
    return view.map.findLayerById('disruptions');
  }, [isIconLayerCreated, view]);

  // Main filtering function
  const filterIcons = useCallback(async () => {
    const disruptionsFeatureLayer = getDisruptionsFeatureLayer();
    if (!disruptionsFeatureLayer) return;

    setIsFilteringDone(false);

    // After getting the disruptionsFeatureLayer
    // console.log('Disruptions FeatureLayer source:', disruptionsFeatureLayer.source?.toArray?.());

    let disruptionsFeatureLayerView;
    try {
      // Wait for the layer view to be ready
      disruptionsFeatureLayerView = await view.whenLayerView(disruptionsFeatureLayer);
    } catch (error) {
      const { name } = error;
      // Ignore error if layer view creation was cancelled (e.g., map unmounted)
      if (name !== 'cancelled:layerview-create') {
        console.log(error);
      }
    }

    let whereClause;
    let distance;
    let point;

    // TIME FILTER: filter by date range
    if (when) {
      whereClause = `((startDate >= '${fromDateUtc}' AND startDate <= '${toDateUtc}') OR (endDate >= '${fromDateUtc}' AND startDate <= '${toDateUtc}'))`;
    }

    // MODE FILTER: filter by selected mode
    if (mode && mode === 'roads') whereClause += ` AND (mode = 'road')`;
    if (mode && mode !== 'roads') whereClause += ` AND (mode = '${mode}')`;

    // BUS FILTER: filter by selected bus service
    if (mode === 'bus' && !selectedByMap && selectedItem?.id) {
      const busWhereClause = `servicesAffected LIKE '%${selectedItem.id}%'`;
      whereClause += ` AND (${busWhereClause})`;
    }

    // TRAIN FILTER: filter by selected train lines/stations
    if (mode === 'train' && !selectedByMap && selectedItem?.id && selectedItemTo?.id) {
      const allLines = [...selectedItem.lines, ...selectedItemTo.lines];
      const allUniqueLines = allLines.filter((line, index, self) => self.indexOf(line) === index);

      const trainStationsWhereClause = allUniqueLines.reduce((accumulator, line, index, self) => {
        const or = index === self.length - 1 ? '' : ' OR ';
        return `${accumulator}(servicesAffected LIKE '%${line}%')${or}`;
      }, '');

      whereClause += ` AND (${trainStationsWhereClause})`;
    }

    // TRAM FILTER: filter by selected tram stops/lines
    if (mode === 'tram' && !selectedByMap && selectedItem?.id && selectedItemTo?.id) {
      let tramWhereClause = "(servicesAffected LIKE '%4546%')";

      if (selectedItem?.lines && selectedItem.lines.length) {
        const stops = selectedItem.lines;

        const tramStopsWhereClause = stops.reduce((accumulator, stop, index, self) => {
          const or = index === self.length - 1 ? '' : ' OR ';
          return `${accumulator}(servicesAffected LIKE '%${stop.atcoCode}%')${or}`;
        }, '');

        tramWhereClause = `${tramWhereClause} OR ${tramStopsWhereClause}`;
      } else {
        tramWhereClause = `${tramWhereClause} OR (servicesAffected LIKE '%${selectedItem.id}%')`;
        tramWhereClause = `${tramWhereClause} OR (servicesAffected LIKE '%${selectedItemTo.id}%')`;
      }
      whereClause += ` AND (${tramWhereClause})`;
    }

    // ROADS FILTER: filter by spatial location and radius
    const { lat, lon, radius } = selectedLocation;
    if (mode === 'roads' && lat && lon && radius) {
      distance = selectedLocation.radius;
      point = new Point({ y: lat, x: lon });
    }

    // Apply the filter to the FeatureLayerView if available
    if (!disruptionsFeatureLayerView) return;
    disruptionsFeatureLayerView.filter = new FeatureFilter({
      where: whereClause,
      geometry: point,
      spatialRelationship: 'contains',
      distance,
      units: 'miles',
    });

    // After applying the filter and getting the FeatureLayerView
    // if (disruptionsFeatureLayerView) {
    //   // Query all visible features after filtering
    //   const query = disruptionsFeatureLayer.createQuery();
    //   query.where = disruptionsFeatureLayerView.filter?.where || '1=1';
    //   query.returnGeometry = true;

    //   const result = await disruptionsFeatureLayer.queryFeatures(query);
    //   const filteredPoints = result.features.map((f) => f.geometry);

    //   const filteredFeatures = result.features;
    //   console.log('Filtered features:', filteredFeatures);

    //   const lastFeature = filteredFeatures[filteredFeatures.length - 1];
    //   console.log('Last filtered feature:', lastFeature);

    //   console.log('Filtered points on map view:', filteredPoints);
    // }

    setIsFilteringDone(true);
  }, [
    fromDateUtc,
    getDisruptionsFeatureLayer,
    mode,
    selectedByMap,
    selectedItem.id,
    selectedItem.lines,
    selectedItemTo.id,
    selectedItemTo.lines,
    selectedLocation,
    toDateUtc,
    view,
    when,
  ]);

  // Run filterIcons whenever dependencies change
  useEffect(() => {
    filterIcons();
  }, [filterIcons]);

  // Return filtering status
  return { isFilteringDone };
};

export default useFilterIcons;
