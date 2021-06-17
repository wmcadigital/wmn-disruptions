/* eslint-disable no-console */
import { useState, useEffect, useCallback, useContext } from 'react';
import { loadModules } from 'esri-loader';
import { AutoCompleteContext, ModeContext, WhenContext } from 'globalState';
import useDateFilter from 'customHooks/useDateFilter';

const useFilterIcons = (view, isIconLayerCreated) => {
  const [isFilteringDone, setIsFilteringDone] = useState(false);

  const [autoCompleteState] = useContext(AutoCompleteContext);
  const { selectedItem, selectedItemTo, selectedLocation } = autoCompleteState;
  const { selectedByMap } = selectedItem;

  const [modeState] = useContext(ModeContext);
  const { mode } = modeState;

  const [whenState] = useContext(WhenContext);
  const { when } = whenState;

  const { fromDate, toDate } = useDateFilter();

  const getDisruptionsFeatureLayer = useCallback(() => {
    if (!view || !view?.map || !isIconLayerCreated) return null;
    return view.map.findLayerById('disruptions');
  }, [isIconLayerCreated, view]);

  const filterIcons = useCallback(async () => {
    const disruptionsFeatureLayer = getDisruptionsFeatureLayer();
    if (!disruptionsFeatureLayer) return;

    setIsFilteringDone(false);

    let disruptionsFeatureLayerView;
    try {
      disruptionsFeatureLayerView = await view.whenLayerView(disruptionsFeatureLayer);
    } catch (error) {
      console.log(error);
    }

    let FeatureFilter;
    let Point;
    try {
      [FeatureFilter, Point] = await loadModules([
        'esri/views/layers/support/FeatureFilter',
        'esri/geometry/Point',
      ]);
    } catch (error) {
      console.log(error);
    }

    let whereClause;
    let distance;
    let point;

    // TIME FILTER
    if (when) {
      whereClause = `((startDate >= '${fromDate}' AND startDate <= '${toDate}') OR (endDate >= '${fromDate}' AND startDate <= '${toDate}'))`;
    }

    // MODE FILTER
    if (mode && mode === 'roads') whereClause += ` AND (mode = 'road')`;
    if (mode && mode !== 'roads') whereClause += ` AND (mode = '${mode}')`;

    // BUS FILTER
    if (mode === 'bus' && !selectedByMap && selectedItem?.id) {
      const busWhereClause = `servicesAffected LIKE '%${selectedItem.id}%'`;
      whereClause += ` AND (${busWhereClause})`;
    }

    // TRAIN FILTER
    if (mode === 'train' && !selectedByMap && selectedItem?.id && selectedItemTo?.id) {
      const allLines = [...selectedItem.lines, ...selectedItemTo.lines];
      const allUniqueLines = allLines.filter((line, index, self) => self.indexOf(line) === index);

      const trainStationsWhereClause = allUniqueLines.reduce((accumulator, line, index, self) => {
        const or = index === self.length - 1 ? '' : ' OR ';
        return `${accumulator}(servicesAffected LIKE '%${line}%')${or}`;
      }, '');

      whereClause += ` AND (${trainStationsWhereClause})`;
    }

    // TRAM FILTER
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

    // ROADS FILTER
    const { lat, lon, radius } = selectedLocation;
    if (mode === 'roads' && lat && lon && radius) {
      distance = selectedLocation.radius;
      point = new Point({ y: lat, x: lon });
    }

    disruptionsFeatureLayerView.filter = new FeatureFilter({
      where: whereClause,
      distance,
      geometry: point,
      spatialRelationship: 'contains',
      units: 'miles',
    });
    setIsFilteringDone(true);
  }, [
    fromDate,
    getDisruptionsFeatureLayer,
    mode,
    selectedByMap,
    selectedItem.id,
    selectedItem.lines,
    selectedItemTo.id,
    selectedItemTo.lines,
    selectedLocation,
    toDate,
    view,
    when,
  ]);

  useEffect(() => {
    filterIcons();
  }, [filterIcons]);

  return { isFilteringDone };
};

export default useFilterIcons;
