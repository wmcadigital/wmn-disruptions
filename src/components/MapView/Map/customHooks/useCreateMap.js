import { useEffect, useContext, useState } from 'react';
import { loadModules } from 'esri-loader';
import { AutoCompleteContext } from 'globalState';
// Import map icons
import locateCircle from 'assets/svgs/map/locate-circle.svg';

const useCreateMap = (_mapRef) => {
  const [autoCompleteState, autoCompleteDispatch] = useContext(AutoCompleteContext); // Get the state of modeButtons from modeContext
  const [currentLocationState, setCurrentLocationState] = useState();
  const [viewState, setViewState] = useState();
  const [mapState, setMapState] = useState();

  // Map useEffect (this is to apply core mapping stuff on page/component load)
  useEffect(() => {
    // Reassign injected useRef params to internal vars
    const mapRef = _mapRef;
    // If there is no map currently set up, then set it up
    if (!mapState) {
      // lazy load the required ArcGIS API for JavaScript modules and CSS
      // Make sure that the referenced module is also injected as a param in the .then function below
      loadModules(
        [
          'esri/Map',
          'esri/views/MapView',
          'esri/Basemap',
          'esri/layers/VectorTileLayer',
          'esri/widgets/Locate',
          'esri/Graphic',
        ],
        {
          css: true,
        }
      ).then(([Map, MapView, Basemap, VectorTileLayer, Locate, Graphic]) => {
        // CREATE MAP VIEW
        // When loaded, create a new basemap
        const basemap = new Basemap({
          baseLayers: [
            new VectorTileLayer({
              portalItem: {
                // set the basemap to the one being used: https://tfwm.maps.arcgis.com/home/item.html?id=53f165a8863c4d40ba017042e248355e
                id: '53f165a8863c4d40ba017042e248355e',
              },
            }),
          ],
        });

        // Create a new map with the basemap set above
        const map = new Map({
          basemap,
        });

        // Create a new map view with settings
        const view = new MapView({
          container: mapRef.current,
          map,
          center: [-2.0047209, 52.4778132],
          zoom: 10,
        });

        // Move zoom widget to top-right corner of view
        view.ui.move(['zoom'], 'top-right');
        // END CREATE MAP VIEW

        let currentLocation;
        // LOCATE BUTTON
        const goToOverride = (e, options) => {
          currentLocation = options.target.target; // Set currentLocation to the target of locate button (latLng of user)
          // Set locations to goto (if there are graphics items available then we want to show them in the view as well as the location of the user, else show just location of user)
          const locations = map.layers.items
            ? [map.layers.items.map((layer) => layer.graphics), currentLocation]
            : currentLocation;

          return view.goTo(locations); // Go to locations set above
        };

        // Create a locate button
        const locateBtn = new Locate({
          view, // Attaches the Locate button to the view
          goToOverride,
          iconClass: 'hello',
          graphic: new Graphic({
            // overwrites the default symbol used for the graphic placed at the location of the user when found
            symbol: {
              type: 'picture-marker',
              url: locateCircle, // Set to svg circle when user hits 'locate' button
              height: '150px',
              width: '150px',
            },
          }),
        });
        // Add the locate widget to the top right corner of the view
        view.ui.add(locateBtn, {
          position: 'top-right',
        });
        // END LOCATE BUTTON

        // POINTER EVENTS
        // on pointer move
        view.on('pointer-move', (e) => {
          // capture lat/longs of point
          const screenPoint = {
            x: e.x,
            y: e.y,
          };
          // Check lat longs on map view and pass anything found as a response
          view.hitTest(screenPoint).then((response) => {
            // If there is a response and it contains an attribute id then it's one of our icon graphics
            if (response.results.length && response.results[0].graphic.attributes.id) {
              mapRef.current.style.cursor = 'pointer'; // change map cursor to pointer
            } else {
              mapRef.current.style.cursor = 'default'; // else keep default pointer
            }
          });
        });

        let mapClick; // set placeholder click event that we can assign an on click

        // Only run the below if the map is available and there is data back from the API (data.length)
        if (view) {
          const getGraphics = (response) => {
            const selectedMapDisruption = response.results[0].graphic.attributes.id;

            // Scroll the tray to the clicked disruption
            const scrollTray = () => {
              const scrollPos = document.getElementById(
                `scroll-holder-for-${selectedMapDisruption}`
              ).offsetTop;
              document.getElementById('js-disruptions-tray').scrollTop = scrollPos;
            };

            if (selectedMapDisruption !== undefined && !autoCompleteState.selectedService.id) {
              autoCompleteDispatch({
                type: 'UDPATE_SELECTED_MAP_DISRUPTION',
                selectedMapDisruption,
              });
              scrollTray();
            } else if (autoCompleteState.selectedService.id) {
              scrollTray();
            }
          };

          // Set up a click event handler and retrieve the screen point
          mapClick = view.on('click', (e) => {
            // intersect the given screen x, y coordinates
            const { screenPoint } = e;
            // the hitTest() checks to see if any graphics in the view
            view.hitTest(screenPoint).then(getGraphics);
          });
        }
        // END POINTER EVENTS

        setCurrentLocationState(currentLocation);
        setMapState(map);
        setViewState(view);

        // If component unmounting
        return () => {
          if (view) {
            // destroy the map view
            view.container = null;
            mapClick.remove(); // remove click event
          }
        };
      });
    }
  }, [_mapRef, autoCompleteDispatch, autoCompleteState.selectedService.id, mapState]);

  return { mapState, viewState, currentLocationState };
};

export default useCreateMap;
