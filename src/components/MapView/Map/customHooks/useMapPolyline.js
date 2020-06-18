import { useContext, useEffect } from 'react';
import { loadModules } from 'esri-loader';
import axios from 'axios';
import { AutoCompleteContext } from 'globalState';

const useMapPolyline = (mapState, viewState, currentLocationState) => {
  const [autoCompleteState] = useContext(AutoCompleteContext); // Get the state of modeButtons from modeContext

  // This useEffect is to plot the line on the map
  useEffect(() => {
    const map = mapState; // Reassign injected mapState to 'map' to be consistent
    const view = viewState;
    const currentLocation = currentLocationState; // Reassign injected mapState to 'map' to be consistent
    const source = axios.CancelToken.source(); // Set source of cancelToken

    let graphicsLayer; // Set here, so we can cleanup in the return

    // If there is an ID and query in state, then lets hit the API and get the geoJSON
    if (autoCompleteState.selectedService.id && map && view) {
      const { REACT_APP_API_HOST, REACT_APP_API_KEY } = process.env; // Destructure env vars

      axios
        .get(`${REACT_APP_API_HOST}/bus/v1/RouteGeoJSON/${autoCompleteState.selectedService.id}`, {
          headers: {
            'Ocp-Apim-Subscription-Key': REACT_APP_API_KEY,
          },
          cancelToken: source.token, // Set token with API call, so we can cancel this call on unmount
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

              // Set locations to goto (if there is users currentLocation  available then we want to show them in the view as well as the location of the graphic items, else just show graphic items)
              const locations = map.layers.items.map((layer) => layer.graphics.items);
              if (currentLocation) locations.push(currentLocation);
              view.goTo(locations); // Go to locations set above
            }
          );
        })
        .catch((error) => {
          if (!axios.isCancel(error)) {
            // eslint-disable-next-line no-console
            console.log({ error });
          }
        });
    }
    // If component unmounting
    return () => {
      source.cancel(); // cancel the request
      if (graphicsLayer) map.remove(graphicsLayer); // remove the graphicsLayer on the map
    };
  }, [autoCompleteState.selectedService.id, currentLocationState, mapState, viewState]);
};

export default useMapPolyline;
