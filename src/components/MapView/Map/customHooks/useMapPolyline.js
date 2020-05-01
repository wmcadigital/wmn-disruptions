import { useContext, useEffect } from 'react';
import { loadModules } from 'esri-loader';
import axios from 'axios';
import { AutoCompleteContext } from 'globalState';

const useMapPolyline = (mapState) => {
  const [autoCompleteState] = useContext(AutoCompleteContext); // Get the state of modeButtons from modeContext

  // This useEffect is to plot the line on the map
  useEffect(() => {
    // Reassign injected useRef params to internal vars
    // const polyline = _polyline;
    // const iconLayer = _iconLayer;
    // const currentLocation = _currentLocation;
    // const view = _view;
    // if (polyline.current) {
    //   polyline.current.removeAll();
    // }
    const map = mapState;
    let graphicsLayer; // Set here, so we can cleanup in the return

    // If there is an ID and query in state, then lets hit the API and get the geoJSON
    if (autoCompleteState.selectedService.id && map) {
      const { REACT_APP_API_HOST, REACT_APP_API_KEY } = process.env; // Destructure env vars

      axios
        .get(`${REACT_APP_API_HOST}/bus/v1/RouteGeoJSON/${autoCompleteState.selectedService.id}`, {
          headers: {
            'Ocp-Apim-Subscription-Key': REACT_APP_API_KEY,
          },
        })
        .then((route) => {
          // lazy load the required ArcGIS API for JavaScript modules and CSS
          loadModules(['esri/Graphic', 'esri/layers/GraphicsLayer']).then(
            ([Graphic, GraphicsLayer]) => {
              graphicsLayer = new GraphicsLayer(); // Set up a graphics layer placeholder so we can inject disruption icons into it in future
              map.add(graphicsLayer); // Add graphics layer to map

              // Create a new polyline with the geoJSON from the API for the ID
              const polyline = new Graphic({
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

              graphicsLayer.add(polyline); // Add polyline to graphicsLayer on map

              // const locations = currentLocation.current
              //   ? [
              //       polyline.current.graphics.items,
              //       iconLayer.current.graphics.items,
              //       currentLocation.current,
              //     ]
              //   : [polyline.current.graphics.items, iconLayer.current.graphics.items];

              // view.current.goTo(locations); // Go to locations set abov
            }
          );
        });

      // If component unmounting
      return () => {
        if (graphicsLayer) {
          map.remove(graphicsLayer); // remove the graphicsLayer on the map
        }
      };
    }
  }, [autoCompleteState.selectedService.id, mapState]);
};

export default useMapPolyline;
