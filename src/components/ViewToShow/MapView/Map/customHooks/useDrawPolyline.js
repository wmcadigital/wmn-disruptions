/* eslint-disable no-console */
import { useState, useEffect, useCallback, useContext, useRef } from 'react';
import { loadModules } from 'esri-loader';
import axios from 'axios';

import { AutoCompleteContext, ModeContext } from 'globalState';

const useDrawPolyline = (view) => {
  const [autoCompleteState] = useContext(AutoCompleteContext);
  const { id, operator } = autoCompleteState.selectedItem;
  const { id: toId } = autoCompleteState.selectedItemTo;
  const [modeState] = useContext(ModeContext);
  const { mode } = modeState;
  //
  const [isPolylineDrawn, setIsPolylineDrawn] = useState(false);
  const axiosSource = useRef(null);

  const clearPolyline = useCallback(() => {
    if (!view || !view?.map) return;
    const polylineLayer = view.map.findLayerById('polyline');
    polylineLayer.removeAll();
    if (axiosSource.current) axiosSource.current.cancel();
    axiosSource.current = null;
    setIsPolylineDrawn(false);
  }, [view]);

  const drawPolyline = useCallback(
    async (apiPath) => {
      const { REACT_APP_API_HOST, REACT_APP_API_KEY } = process.env;

      if (axiosSource.current) axiosSource.current.cancel();
      axiosSource.current = axios.CancelToken.source();
      let response;

      try {
        const url = `${REACT_APP_API_HOST}${apiPath}`;
        const headers = { 'Ocp-Apim-Subscription-Key': REACT_APP_API_KEY };
        const cancelToken = axiosSource.current.token;
        response = await axios.get(url, { headers, cancelToken });
      } catch (error) {
        console.log(error);
      }

      if (!response?.data?.geoJson?.features[0]?.geometry?.coordinates) return;
      const paths = response?.data?.geoJson?.features[0]?.geometry?.coordinates;

      let Graphic;
      try {
        [Graphic] = await loadModules(['esri/Graphic']);
      } catch (error) {
        console.log(error);
      }

      const polyline = new Graphic({
        geometry: {
          type: 'polyline',
          paths,
        },
        symbol: {
          type: 'simple-line',
          color: '#3c1053',
          width: 4,
        },
      });

      if (!view || !view?.map) return;
      const polylineLayer = view.map.findLayerById('polyline');
      polylineLayer.add(polyline);
      setIsPolylineDrawn(true);
    },
    [view]
  );

  const drawBusPolyline = useCallback(() => {
    drawPolyline(`/bus/v1/RouteGeoJSON/${id}/${operator}`);
  }, [drawPolyline, id, operator]);

  const drawTramPolyline = useCallback(() => {
    drawPolyline('/Metro/v1/RouteGeoJSON');
  }, [drawPolyline]);

  useEffect(() => {
    if (mode === 'bus' && id && operator) drawBusPolyline();
    else if (mode === 'tram' && id && toId) drawTramPolyline();
    else clearPolyline();

    return () => {
      if (axiosSource.current) axiosSource.current.cancel();
      setIsPolylineDrawn(false);
    };
  }, [clearPolyline, drawBusPolyline, drawTramPolyline, id, mode, operator, toId]);

  return { isPolylineDrawn };
};

export default useDrawPolyline;
