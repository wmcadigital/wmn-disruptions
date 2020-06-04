import React from 'react';
// Import customHooks
import useWindowHeightWidth from 'customHooks/useWindowHeightWidth';
// Import components
import Map from './Map/Map';
import Tray from '../shared/Tray/Tray';
// Import styles
import s from './MapView.module.scss';

const MapView = () => {
  const { appHeight } = useWindowHeightWidth(); // Get window height and width

  return (
    <div className={s.disruptionsContainer} style={{ height: appHeight }}>
      <Map />
      <Tray />
    </div>
  );
};

export default MapView;
