import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable'; // Uses https://www.npmjs.com/package/react-draggable
import Swipe from 'react-easy-swipe';

// Import Components
import TrayComponents from './TrayComponents/TrayComponents';
// Import styles
import s from './Tray.module.scss';

const Tray = () => {
  const [containerHeight, setContainerHeight] = useState(0); // Set ContainerHeight to state, we will make the tray confine to these bounds
  const [isTrayOpen, setIsTrayOpen] = useState(false); // Used to store bool if tray is fully open
  const [lockTray, setLockTray] = useState(false); // Store bool if we should lock the tray or not
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Store windows innerWidth so we can check on it for the render/return of this component

  // Check window width on resize, used to determine if we should show the mobile or desktop panel in the return/render at the bottom
  useEffect(() => {
    // Add event listner to window resize, if resized then update width with new window.width
    window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
    // Cleanup: remove eventListener
    return () => window.removeEventListener('resize', () => setWindowWidth(window.innerWidth));
  }, [setWindowWidth]); // Empty array to only run on componentDidMount

  // Get new map height on resize
  useEffect(() => {
    const mapEleHeight = document.getElementById('disruptions-container').offsetHeight; // getting the maps height(this will be used for the bounds of our draggable tray)
    setContainerHeight(mapEleHeight); // Set map height to state
  }, [windowWidth]); // Only re-run this effect when windowWidth is updated

  /*
  USED TO CONTROL SCROLLING OF TRAY ON MAP
  */

  // OnStart function for start of swiping tray
  const onStart = () => {
    document.body.style.overflow = 'hidden'; // Set body overflow to hidden, so we don't snap to body scrollbar
  };

  // onStop function for stop of swiping tray
  const onStop = (e, data) => {
    document.body.style.overflow = null; // Scrolling finished so return body overflow to normal
    const { lastY } = data; // Get lastY scroll position
    // If lastY coords are at top of container, then set tralastY open to true, otherwise false
    return lastY === -containerHeight ? setIsTrayOpen(true) : setIsTrayOpen(false);
  };

  /*
  USED TO CONTROL INTERNAL SCROLLING OF TRAY (OVERFLOW SCROLL)
  */

  // On Swipe down
  const onSwipeDown = () => {
    const trayScrollTop = document.getElementById('js-disruptions-tray').scrollTop; // Get elementById so we can check the scollTop
    // If tray is open and the scrollTop is 0 (we're at the top of the tray scroll), then unlock tray
    return isTrayOpen && trayScrollTop === 0 ? setLockTray(false) : null;
  };

  // On Swipe up
  const onSwipeUp = () => {
    const trayScrollTop = document.getElementById('js-disruptions-tray').scrollTop; // Get elementById so we can check the scollTop

    // If tray is open and the scrollTop is not 0 (we're not at the top of the tray scroll), so lock tray
    return isTrayOpen && trayScrollTop !== 0 ? setLockTray(true) : null;
  };

  // Output for how the mobile tray looks
  const mobileTray = (
    <Draggable
      axis="y"
      grid={[1, 1]}
      bounds={{ left: 0, top: -containerHeight, right: 0, bottom: -100 }}
      defaultPosition={{ x: 0, y: -100 }}
      onStart={() => onStart()}
      onStop={(e, data) => onStop(e, data)}
      disabled={lockTray}
      cancel="input"
    >
      <div className={`${s.tray} wmnds-grid `}>
        <Swipe
          className={`${s.swipeTrayWrapper} wmnds-p-md ${isTrayOpen ? s.trayIsOpen : ''}`}
          onSwipeUp={() => onSwipeUp()}
          onSwipeDown={() => onSwipeDown()}
          id="js-disruptions-tray"
        >
          <div className={`${s.drawerHandle} wmnds-col-1`}>
            <p>Swipe tray up</p>
          </div>
          <TrayComponents />
        </Swipe>
      </div>
    </Draggable>
  );

  // Output for how the desktop tray looks
  const DesktopTray = (
    <div className={`${s.tray} wmnds-grid wmnds-p-md`}>
      <TrayComponents />
    </div>
  );

  // If the device is less than x show mobileTray otherwise show desktop tray
  return <>{windowWidth < 768 ? mobileTray : DesktopTray}</>;
};

export default Tray;
