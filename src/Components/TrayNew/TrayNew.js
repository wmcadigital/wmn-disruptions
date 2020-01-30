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
  const [isFullyTrayOpen, setIsFullyTrayOpen] = useState(false); // Used to store bool if tray is fully open
  const [lockTray, setLockTray] = useState(false); // Store bool if we should lock the tray or not
  // const [yScroll, setYScroll] = useState(false);

  // UseEffect, so we can wait until components rendered to get height
  useEffect(() => {
    setMapHeight(document.getElementById('disruptions-map').offsetHeight); // Get height of map and set it in state
  }, []);

  const onStart = (e, data) => {
    const { y } = data;

    document.body.style.overflow = 'hidden';
    // If y coords are at top of container, then lock tray
    return y === -mapHeight ? setIsFullyTrayOpen(true) : setIsFullyTrayOpen(false);
  };

  const onStop = (e, data) => {
    document.body.style.overflow = null;
    const { y } = data;
    // If y coords are at top of container, then lock tray
    return y === -mapHeight ? setIsFullyTrayOpen(true) : setIsFullyTrayOpen(false);
  };

  // On Swipe up
  const onSwipeDown = () => {
    // Get elementById so we can check the scollTop
    const trayScrollTop = document.getElementById('js-disruptions-tray').scrollTop;
    if (isFullyTrayOpen) {
      if (trayScrollTop === 0) {
        setLockTray(false);
      }
    }

    // return isFullyTrayOpen && trayScrollTop === 0 ? setLockTray(true) : null;
  };

  const onSwipeUp = () => {
    // Get elementById so we can check the scollTop
    const trayScrollTop = document.getElementById('js-disruptions-tray').scrollTop;

    if (isFullyTrayOpen) {
      if (trayScrollTop !== 0) {
        console.log(0);
        setLockTray(true);
      } else {
        console.log(false);
        setLockTray(false);
      }
    }
    // return isFullyTrayOpen ? (trayScrollTop !== 0 ?  :) : null;
  };

  return (
    <Draggable
      axis="y"
      grid={[1, 1]}
      bounds={{ left: 0, top: -mapHeight, right: 0, bottom: -100 }}
      defaultPosition={{ x: 0, y: -100 }}
      onStart={(e, data) => onStart(e, data)}
      onStop={(e, data) => onStop(e, data)}
      // onDrag={(e, data) => isTrayFullyOpen(e, data)}
      disabled={lockTray}
    >
      <div className={`${s.tray} wmnds-grid `}>
        <Swipe
          className={`${s.trayWrapper} wmnds-p-md ${isFullyTrayOpen ? s.trayIsOpen : ''}`}
          onSwipeUp={() => onSwipeUp()}
          onSwipeDown={() => onSwipeDown()}
          // onSwipeStart={() => onSwipeStart()}
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
