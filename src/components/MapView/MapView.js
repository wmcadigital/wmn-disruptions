import React from 'react';
import Map from './Map/Map';
import Tray from '../shared/Tray/Tray';
import s from './MapView.module.scss';

const MapView = () => {
  return (
    <div className={s.disruptionsContainer}>
      <Map />
      <Tray />
    </div>
  );
};

export default MapView;
