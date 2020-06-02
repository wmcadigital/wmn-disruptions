import React from 'react';
// Import customHooks
import useWindowHeightWidth from 'customHooks/useWindowHeightWidth';
// Import Components
import TrayComponents from './TrayComponents/TrayComponents';
import MobileTray from './MobileTray';
// Import styles
import s from './Tray.module.scss';

const Tray = () => {
  const { windowWidth } = useWindowHeightWidth(); // Get window height and width

  // Output for how the mobile tray looks
  const mobileTray = <MobileTray />;

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
