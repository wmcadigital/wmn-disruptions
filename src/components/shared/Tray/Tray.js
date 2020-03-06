import React, { useState, useEffect } from 'react';

// Import Components
import TrayComponents from './TrayComponents/TrayComponents';
import MobileTray from './MobileTray';
// Import styles
import s from './Tray.module.scss';

const Tray = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Store windows innerWidth so we can check on it for the render/return of this component

  // Check window width on resize, used to determine if we should show the mobile or desktop panel in the return/render at the bottom
  useEffect(() => {
    // Add event listner to window resize, if resized then update width with new window.width
    window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
    // Cleanup: remove eventListener
    return () => window.removeEventListener('resize', () => setWindowWidth(window.innerWidth));
  }, [setWindowWidth]); // Empty array to only run on componentDidMount

  // Output for how the mobile tray looks
  const mobileTray = <MobileTray windowWidth={windowWidth} />;

  // Output for how the desktop tray looks
  const DesktopTray = (
    <div className={`${s.tray} wmnds-grid wmnds-p-md`} id="js-disruptions-tray">
      <TrayComponents />
    </div>
  );

  // If the device is less than x show mobileTray otherwise show desktop tray
  return <>{windowWidth < 768 ? mobileTray : DesktopTray}</>;
};

export default Tray;
