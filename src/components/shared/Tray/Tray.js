import React from 'react';

// Import Components
import TrayComponents from './TrayComponents/TrayComponents';
import MobileTray from './MobileTray';
// Import styles
import s from './Tray.module.scss';

const Tray = () => {
  // Output for how the mobile tray looks
  const mobileTray = <MobileTray windowWidth={windowWidth} windowHeight={windowHeight} />;

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
