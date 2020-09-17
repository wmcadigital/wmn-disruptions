import { useEffect, useContext, useState } from 'react';
import { loadModules } from 'esri-loader';
import { AutoCompleteContext } from 'globalState';
// Import map icons
import locateCircle from 'assets/svgs/map/locate-circle.svg';

const useCreateMap = (_mapRef) => {
  const [, autoCompleteDispatch] = useContext(AutoCompleteContext); // Get the state of modeButtons from modeContext
  const [currentLocationState, setCurrentLocationState] = useState();
  const [viewState, setViewState] = useState();
  const [mapState, setMapState] = useState();
  const mapRef = _mapRef;

  // Map useEffect (this is to apply core mapping stuff on page/component load)
  useEffect(() => {
    // Reassign injected useRef params to internal vars
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
          zoom: 14,
        });

        // Move zoom widget to top-right corner of view
        view.ui.move(['zoom'], 'top-right');
        // END CREATE MAP VIEW

        view.ui.move(['attribution'], 'bottom');

        // LOCATE BUTTON
        const goToOverride = async (e, options) =>
          setCurrentLocationState(await options.target.target);

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

        // on pointer move
        view.on('pointer-move', (e) => {
          // capture lat/longs of point
          const screenPoint = {
            x: e.x,
            y: e.y,
          };
          // Check lat longs on map view and pass anything found as a response
          view.hitTest(screenPoint).then((response) => {
            const hoveredGraphics = response.results.filter((result) => {
              return result.graphic.attributes && result.graphic.attributes.id;
            }); // Return anything hovered over that contains attributes and attributes.id (this is so we can tell it is a disruption icon)
            if (mapRef.current) {
              // If the hoveredGraphics has length, then it means we have hovered over a disruption
              if (hoveredGraphics.length) {
                mapRef.current.style.cursor = 'pointer'; // change map cursor to pointer
              } else {
                mapRef.current.style.cursor = 'default'; // else keep default pointer
              }
            }
          });
        });

        setMapState(map);
        setViewState(view);

        // If component unmounting
        return () => {
          if (view) {
            // destroy the map view
            view.container = null;
          }
        };
      });
    }
  }, [_mapRef, autoCompleteDispatch, currentLocationState, mapRef, mapState]);

  return { mapState, viewState, currentLocationState };
};

export default useCreateMap;
