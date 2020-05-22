import React from 'react';
import Map from './Map/Map';
import Tray from '../shared/Tray/Tray';
import s from './MapView.module.scss';

const MapView = () => {
  return (
    // Be careful with changeing this id (#disruptions-container) as it is being used by the tray to determine its container
    <div className={s.disruptionsContainer}>
      <Map />
      <Tray />
    </div>
  );
};

export default MapView;
