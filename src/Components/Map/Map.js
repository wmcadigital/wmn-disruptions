// Using https://developers.arcgis.com/labs/browse/?product=javascript&topic=any and ESRI JS API
import React, { Component } from 'react';
import { loadModules } from 'esri-loader';
import locateCircle from '../../assets/svgs/map/locate-circle.svg';

import s from './Map.module.scss';

class WebMapView extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    // Make sure that the referenced module is also injected as a param in the .then function below
    loadModules(
      [
        'esri/Map',
        'esri/views/MapView',
        'esri/Basemap',
        'esri/layers/VectorTileLayer',
        'esri/widgets/Locate',
        'esri/Graphic'
      ],
      {
        css: true
      }
    ).then(([Map, MapView, Basemap, VectorTileLayer, Locate, Graphic]) => {
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

      const locateBtn = new Locate({
        view: this.view, // Attaches the Locate button to the view
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

      // Add the locate widget to the top left corner of the view
      this.view.ui.add(locateBtn, {
        position: 'top-left'
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
    return <div id="disruptions-map" className={`webmap ${s.map}`} ref={this.mapRef} title="Disruptions map" />;
  }
}

export default WebMapView;
