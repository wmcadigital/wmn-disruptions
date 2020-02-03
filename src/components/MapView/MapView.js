import React from 'react';
import Map from './Map/Map';
import Tray from './Tray/Tray';
import s from './MapView.module.scss';

const MapView = () => {
  return (
    <div className={s.disruptionsContainer} id="disruptions-container">
      {/* Be careful with changeing this id (#disruptions-container) as it is being used by the tray to determine its container */}
      <Map />
      <Tray />
    </div>
  );
};

export default MapView;
