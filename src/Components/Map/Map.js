import React from 'react';
import { loadModules } from 'esri-loader';

export default class WebMapView extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules(['esri/Map', 'esri/views/MapView', 'esri/Basemap', 'esri/layers/VectorTileLayer'], {
      css: true
    }).then(([Map, MapView, Basemap, VectorTileLayer]) => {
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
      const map = new Map({
        basemap
      });

      // Create a new map view with settings
      this.view = new MapView({
        container: this.mapRef.current,
        map,
        center: [-2.0047209, 52.4778132],
        zoom: 10
      });
    });
  }

  componentWillUnmount() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  }

  render() {
    return <div className="webmap" ref={this.mapRef} style={{ width: '100vw', height: '100vh' }} />;
  }
}
