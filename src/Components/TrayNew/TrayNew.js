import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable'; // Uses https://www.npmjs.com/package/react-draggable
import Swipe from 'react-easy-swipe';

// Import components
import When from './When/When';
import Mode from './Mode/Mode';
import AutoComplete from './AutoComplete/AutoComplete';

// Import styles
import s from './TrayNew.module.scss';

const TrayNew = () => {
  const [mapHeight, setMapHeight] = useState(0); // Set mapHeight to state, we will make the tray confine to these bounds
  const [isTrayOpen, setIsTrayOpen] = useState(false); // Used to store bool if tray is fully open
  const [lockTray, setLockTray] = useState(false); // Store bool if we should lock the tray or not

  // UseEffect, so we can wait until components rendered to get height
  useEffect(() => {
    setMapHeight(document.getElementById('disruptions-map').offsetHeight); // Get height of map and set it in state
  }, []);

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
    const { y } = data; // Get y scroll position
    // If y coords are at top of container, then set tray open to true, otherwise false
    return y === -mapHeight ? setIsTrayOpen(true) : setIsTrayOpen(false);
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

  return (
    <Draggable
      axis="y"
      grid={[1, 1]}
      bounds={{ left: 0, top: -mapHeight, right: 0, bottom: -100 }}
      defaultPosition={{ x: 0, y: -100 }}
      onStart={() => onStart()}
      onStop={(e, data) => onStop(e, data)}
      disabled={lockTray}
      cancel="input"
    >
      <div className={`${s.tray} wmnds-grid `}>
        <Swipe
          className={`${s.trayWrapper} wmnds-p-md ${isTrayOpen ? s.trayIsOpen : ''}`}
          onSwipeUp={() => onSwipeUp()}
          onSwipeDown={() => onSwipeDown()}
          id="js-disruptions-tray"
        >
          <div className={`${s.drawerHandle} wmnds-col-1`}>
            <p>Swipe tray up</p>
          </div>
          <When />
          <Mode />
          <AutoComplete />
        </Swipe>
      </div>
    </Draggable>
  );
};

export default TrayNew;
