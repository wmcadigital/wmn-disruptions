import { useContext, useEffect } from 'react';
import { loadModules } from 'esri-loader';
import axios from 'axios';
import { AutoCompleteContext } from 'globalState';

const useMapPolyline = (_polyline, _iconLayer, _view, _currentLocation) => {
  const [autoCompleteState] = useContext(AutoCompleteContext); // Get the state of modeButtons from modeContext

  // This useEffect is to plot the line on the map
  useEffect(() => {
    // Reassign injected useRef params to internal vars
    const polyline = _polyline;
    const iconLayer = _iconLayer;
    const currentLocation = _currentLocation;
    const view = _view;
    if (polyline.current) {
      polyline.current.removeAll();
    }
    // If there is an ID and query in state, then lets hit the API and get the geoJSON
    if (autoCompleteState.selectedService.id && polyline.current) {
      const { REACT_APP_API_HOST, REACT_APP_API_KEY } = process.env; // Destructure env vars

      axios
        .get(`${REACT_APP_API_HOST}/bus/v1/RouteGeoJSON/${autoCompleteState.selectedService.id}`, {
          headers: {
            'Ocp-Apim-Subscription-Key': REACT_APP_API_KEY,
          },
        })
        .then((route) => {
          // lazy load the required ArcGIS API for JavaScript modules and CSS
          loadModules(['esri/Graphic']).then(([Graphic]) => {
            // Create a new polyline with the geoJSON from the API for the ID
            const poly = new Graphic({
              geometry: {
                type: 'polyline',
                paths: route.data.geoJson.features[0].geometry.coordinates,
              },
              symbol: {
                type: 'simple-line', // autocasts as new SimpleLineSymbol()
                color: '#3c1053', // RGB color values as an array
                width: 4,
              },
            });

            polyline.current.add(poly); // Add polyline to the map

            const locations = currentLocation.current
              ? [
                  polyline.current.graphics.items,
                  iconLayer.current.graphics.items,
                  currentLocation.current,
                ]
              : [polyline.current.graphics.items, iconLayer.current.graphics.items];

            view.current.goTo(locations); // Go to locations set abov
          });
        });
    }
  }, [_currentLocation, _iconLayer, _polyline, _view, autoCompleteState.selectedService.id]);
};

export default useMapPolyline;
