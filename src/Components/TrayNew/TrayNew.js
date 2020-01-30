import React, { useEffect, useContext, useState } from 'react';
import Draggable from 'react-draggable'; // Uses https://www.npmjs.com/package/react-draggable
import Swipe from 'react-easy-swipe';

// Import Context
import { TrayLayoutContext } from 'globalState/';

// Import components
import When from './When/When';
import Mode from './Mode/Mode';
import AutoComplete from './AutoComplete/AutoComplete';

// Import styles
import s from './TrayNew.module.scss';

const TrayNew = () => {
  const [trayLayoutState, TrayLayoutDispatch] = useContext(TrayLayoutContext);
  const [isTrayOpen, setIsTrayOpen] = useState(false);
  const [lockTray, setLockTray] = useState(false);

  useEffect(() => {
    TrayLayoutDispatch({ type: 'UPDATE_MAP_HEIGHT', height: document.getElementById('disruptions-map').offsetHeight }); // Get height of map and set it in context

    TrayLayoutDispatch({
      type: 'UPDATE_TRAY_HEIGHT',
      height: document.getElementById('js-disruptions-tray').offsetHeight
    }); // Get height of tray and set it in context

    TrayLayoutDispatch({ type: 'UPDATE_MAX_TRAY_HEIGHT' });
  }, [TrayLayoutDispatch]);

  const isTrayAtTop = (e, data) => {
    const { y } = data;
    // If y coords are at top of container, then lock tray
    return y === -trayLayoutState.mapHeight ? setIsTrayOpen(true) : setIsTrayOpen(false);
  };

  const onSwipeUp = () => {
    const tray = document.getElementById('js-disruptions-tray');

    console.log({ isTrayOpen, scrollTop: tray.scrollTop, lockTray });

    return isTrayOpen && tray.scrollTTop !== 0 ? setLockTray(true) : null;

    // return tray.scrollTop === 0 && tray.classList.contains(s.trayIsOpen) ? setIsTrayOpen(false) : null;
  };

  const onSwipeDown = () => {
    const tray = document.getElementById('js-disruptions-tray');
    console.log(tray.scrollTop);

    return isTrayOpen && tray.scrollTop === 0 ? setLockTray(false) : null;
  };

  // const onSwipeStart = () => {
  //   const tray = document.getElementById('js-disruptions-tray');
  //   console.log(tray.scrollTop);

  //   return isTrayOpen && tray.scrollTop === 0 ? setLockTray(false) : null;
  // };

  return (
    <Draggable
      axis="y"
      grid={[1, 1]}
      bounds={{ left: 0, top: -trayLayoutState.mapHeight, right: 0, bottom: -100 }}
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
