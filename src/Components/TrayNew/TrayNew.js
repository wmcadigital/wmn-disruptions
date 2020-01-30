import React, { useEffect, useContext, useState } from 'react';
import Draggable from 'react-draggable'; // Uses https://www.npmjs.com/package/react-draggable

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

  useEffect(() => {
    TrayLayoutDispatch({ type: 'UPDATE_MAP_HEIGHT', height: document.getElementById('disruptions-map').offsetHeight }); // Get height of map and set it in context

    TrayLayoutDispatch({
      type: 'UPDATE_TRAY_HEIGHT',
      height: document.getElementById('js-disruptions-tray').offsetHeight
    }); // Get height of tray and set it in context

    TrayLayoutDispatch({ type: 'UPDATE_MAX_TRAY_HEIGHT' });
  }, [TrayLayoutDispatch, isTrayOpen]);

  const isTrayAtTop = (e, data) => {
    console.log('isTrayAtTop?');

    const { y } = data;
    // If y coords are at top of container, then lock tray
    return y === -trayLayoutState.mapHeight ? setIsTrayOpen(true) : null;
  };

  const onScrollTray = () => {
    const tray = document.getElementById('js-disruptions-tray');

    return tray.scrollTop === 0 && tray.classList.contains(s.trayIsOpen) ? setIsTrayOpen(false) : null;
  };

  return (
    <Draggable
      axis="y"
      grid={[1, 1]}
      bounds={{ left: 0, top: -trayLayoutState.mapHeight, right: 0, bottom: -100 }}
      defaultPosition={{ x: 0, y: -100 }}
      // onStart={}
      onStop={(e, data) => isTrayAtTop(e, data)}
      disabled={isTrayOpen}
    >
      <div className={`${s.tray} wmnds-grid ${isTrayOpen ? s.trayIsOpen : ''}`} id="js-disruptions-tray">
        <div className={`${s.trayWrapper} wmnds-p-md`} onTouchMove={() => onScrollTray()}>
          <div className={`${s.drawerHandle} wmnds-col-1`}>
            <p>Swipe tray up</p>
          </div>
          <When />
          <Mode />
          <AutoComplete />
        </div>
      </div>
    </Draggable>
  );
};

export default TrayNew;
