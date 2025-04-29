import React from 'react';
// Import customHooks
import useWindowHeightWidth from 'customHooks/useWindowHeightWidth';
// Import components
import Map from './Map/Map';
import Tray from '../../shared/Tray/Tray';
// Import styles
import s from './MapView.module.scss';

function MapView() {
  const { appHeight, windowWidth, bannerHeight } = useWindowHeightWidth(); // Get window height and width
  const mobileSize = `calc(100vh - ${bannerHeight}px - 200px)`;

  // Show correct height based on screen size
  const mapHeight = windowWidth < 768 ? mobileSize : appHeight; // Minus 298px as this is the height footer 'calc(100vh - 88px - 72px)'
  const leftPadding = windowWidth / 2 - 504;

  return (
    <div className={s.disruptionsContainer} style={{ height: mapHeight, paddingLeft: leftPadding }}>
      <Map />
      <Tray />
    </div>
  );
}

export default MapView;
