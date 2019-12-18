import React from 'react';
import { loadModules } from 'esri-loader';

export default class WebMapView extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules(['esri/Map', 'esri/views/MapView', 'esri/layers/VectorTileLayer'], {
      css: true
    }).then(([Map, MapView, VectorTileLayer]) => {
      // eslint-disable-next-line no-param-reassign

      // const map = new WebMap({
      //   portalItem: {
      //     // autocasts as new PortalItem()
      //     id: '53f165a8863c4d40ba017042e248355e'
      //   }
      // });
      const map = new Map();

      this.view = new MapView({
        container: this.mapRef.current,
        map,
        center: [-2.0047209, 52.4778132],
        zoom: 10
      });

      // The URL referenced in the constructor may point to a style url JSON (as in this sample)
      // or directly to a vector tile service
      const vtlayer = new VectorTileLayer({
        url: 'https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer'
      });
      map.add(vtlayer);
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
