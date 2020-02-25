import { useEffect } from 'react';
import { loadModules } from 'esri-loader';

// Import map icons
import locateCircle from 'assets/svgs/map/locate-circle.svg';

const useCreateMap = (_mapRef, _map, _iconLayer, _polyline, _view) => {
  // Reassign injected useRef params to internal vars
  const mapRef = _mapRef;
  const map = _map;
  const iconLayer = _iconLayer;
  const polyline = _polyline;
  const view = _view;

  // Map useEffect (this is to apply core mapping stuff on page/component load)
  useEffect(() => {
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

      // Create a locate button
      const locateBtn = new Locate({
        view: view.current, // Attaches the Locate button to the view
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
      map.current.add(polyline.current);

      // Set up a graphics layer placeholder so we can inject disruption icons into it in future
      iconLayer.current = new GraphicsLayer();
      map.current.add(iconLayer.current);

      // If component unmounting
      return () => {
        if (view.current) {
          // destroy the map view
          view.current.container = null;
        }
      };
    });
  }, [iconLayer, map, mapRef, polyline, view]);
};

export default useCreateMap;
