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
  const [mapHeight, setMapHeight] = useState(0);
  const [isTrayOpen, setIsTrayOpen] = useState(false);
  const [lockTray, setLockTray] = useState(false);

  useEffect(() => {
    setMapHeight(document.getElementById('disruptions-map').offsetHeight); // Get height of map and set it in state
  }, []);

  const isTrayAtTop = (e, data) => {
    const { y } = data;
    // If y coords are at top of container, then lock tray
    return y === -mapHeight ? setIsTrayOpen(true) : setIsTrayOpen(false);
  };

  const onSwipeUp = () => {
    const tray = document.getElementById('js-disruptions-tray');

    return isTrayOpen && tray.scrollTTop !== 0 ? setLockTray(true) : null;
  };

  const onSwipeDown = () => {
    const tray = document.getElementById('js-disruptions-tray');

    return isTrayOpen && tray.scrollTop === 0 ? setLockTray(false) : null;
  };

  return (
    <Draggable
      axis="y"
      grid={[1, 1]}
      bounds={{ left: 0, top: -mapHeight, right: 0, bottom: -100 }}
      defaultPosition={{ x: 0, y: -100 }}
      onStop={(e, data) => isTrayAtTop(e, data)}
      // onStart={}
      disabled={lockTray}
    >
      <div className={`${s.tray} wmnds-grid `}>
        <Swipe
          className={`${s.trayWrapper} wmnds-p-md ${lockTray ? s.trayIsOpen : ''}`}
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
