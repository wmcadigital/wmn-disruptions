import { useEffect, useContext } from 'react';
import { loadModules } from 'esri-loader';
import { AutoCompleteContext } from 'globalState';
// Import map icons
import locateCircle from 'assets/svgs/map/locate-circle.svg';

const useCreateMap = (_mapRef, _map, _currentLocation, _iconLayer, _polyline, _view) => {
  const [autoCompleteState, autoCompleteDispatch] = useContext(AutoCompleteContext); // Get the state of modeButtons from modeContext

  // Map useEffect (this is to apply core mapping stuff on page/component load)
  useEffect(() => {
    // Reassign injected useRef params to internal vars
    const mapRef = _mapRef;
    const map = _map;
    const currentLocation = _currentLocation;
    const iconLayer = _iconLayer;
    const polyline = _polyline;
    const view = _view;
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
        'esri/layers/GraphicsLayer'
      ],
      {
        css: true
      }
    ).then(([Map, MapView, Basemap, VectorTileLayer, Locate, Graphic, GraphicsLayer]) => {
      // When loaded, create a new basemap
      const basemap = new Basemap({
        baseLayers: [
          new VectorTileLayer({
            portalItem: {
              // set the basemap to the one being used: https://tfwm.maps.arcgis.com/home/item.html?id=53f165a8863c4d40ba017042e248355e
              id: '53f165a8863c4d40ba017042e248355e'
            }
          })
        ]
      });

      // Create a new map with the basemap set above
      map.current = new Map({
        basemap
      });

      // Create a new map view with settings
      view.current = new MapView({
        container: mapRef.current,
        map: map.current,
        center: [-2.0047209, 52.4778132],
        zoom: 10
      });

      const goToOverride = (e, options) => {
        currentLocation.current = options.target.target; // Set currentLocation to the target of locate button (latLng of user)
        // Set locations to goto (if there are graphics items available then we want to show them in the view as well as the location of the user, else show just location of user)
        const locations = iconLayer.current.graphics.items
          ? [iconLayer.current.graphics.items, currentLocation.current]
          : currentLocation.current;

        return view.current.goTo(locations); // Go to locations set above
      };

      // Create a locate button
      const locateBtn = new Locate({
        view: view.current, // Attaches the Locate button to the view
        goToOverride,
        graphic: new Graphic({
          // overwrites the default symbol used for the graphic placed at the location of the user when found
          symbol: {
            type: 'picture-marker',
            url: locateCircle, // Set to svg circle when user hits 'locate' button
            height: '150px',
            width: '150px'
          }
        })
      });

      // Move zoom widget to top-right corner of view.current
      view.current.ui.move(['zoom'], 'top-right');

      // Add the locate widget to the top right corner of the view.current
      view.current.ui.add(locateBtn, {
        position: 'top-right'
      });

      // Set up a graphics layer placeholder so we can inject a polyline into it in future
      polyline.current = new GraphicsLayer();
      // Set up a graphics layer placeholder so we can inject disruption icons into it in future
      iconLayer.current = new GraphicsLayer();

      map.current.addMany([polyline.current, iconLayer.current]);

      // on pointer move
      view.current.on('pointer-move', e => {
        // capture lat/longs of point
        const screenPoint = {
          x: e.x,
          y: e.y
        };
        // Check lat longs on map view and pass anything found as a response
        view.current.hitTest(screenPoint).then(response => {
          // If there is a response and it contains an attribute id then it's one of our icon graphics
          if (response.results[0].graphic.attributes.id) {
            mapRef.current.style.cursor = 'pointer'; // change map cursor to pointer
          } else {
            mapRef.current.style.cursor = 'default'; // else keep default pointer
          }
        });
      });

      let mapClick; // set placeholder click event that we can assign an on click

      if (view.current) {
        const getGraphics = response => {
          const selectedMapDisruption = response.results[0].graphic.attributes.id;

          if (selectedMapDisruption !== undefined && !autoCompleteState.selectedService.id) {
            autoCompleteDispatch({
              type: 'UDPATE_SELECTED_MAP_DISRUPTION',
              selectedMapDisruption
            });
          } else if (autoCompleteState.selectedService.id) {
            const scrollPos = document.getElementById(`scroll-holder-for-${selectedMapDisruption}`)
              .offsetTop;
            document.getElementById('js-disruptions-tray').scrollTop = scrollPos;
          }
        };

        // Set up a click event handler and retrieve the screen point
        mapClick = view.current.on('click', e => {
          // intersect the given screen x, y coordinates
          const { screenPoint } = e;
          // the hitTest() checks to see if any graphics in the view.current
          view.current.hitTest(screenPoint).then(getGraphics);
        });
      }

      // If component unmounting
      return () => {
        if (view.current) {
          // destroy the map view
          view.current.container = null;
          mapClick.remove(); // remove click event
        }
      };
    });
  }, [
    _currentLocation,
    _iconLayer,
    _map,
    _mapRef,
    _polyline,
    _view,
    autoCompleteDispatch,
    autoCompleteState.selectedService.id
  ]);
};

export default useCreateMap;
