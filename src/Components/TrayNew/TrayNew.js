import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable'; // Uses https://www.npmjs.com/package/react-draggable

// Import components
import When from './When/When';
import Mode from './Mode/Mode';
import AutoComplete from './AutoComplete/AutoComplete';

// Import styles
import s from './TrayNew.module.scss';

const TrayNew = () => {
  const [maxTrayHeight, setMaxTrayHeight] = useState(0);
  // const [trayPosition] = useState(-100);

  useEffect(() => {
    const getContainerHeight = document.getElementById('js-map-tray-wrapper').clientHeight;

    setMaxTrayHeight(getContainerHeight);
  }, []);

  return (
    <Draggable
      axis="y"
      grid={[1, 1]}
      bounds={{ left: 0, top: -maxTrayHeight, right: 0, bottom: -100 }}
      defaultPosition={{ x: 0, y: -100 }}
      // position={{ x: 0, y: trayPosition }}
      cancel="js-internal-tray-wrapper"
    >
      {/* <div className="js-internal-tray-wrapper"> */}
      <div className={`${s.tray} wmnds-grid wmnds-p-md`}>
        <div className={`${s.drawerHandle} wmnds-col-1`}>
          <p>Swipe tray up</p>
        </div>

        <When />
        <Mode />
        <AutoComplete />
      </div>
      {/* </div> */}
    </Draggable>
  );
};

export default TrayNew;
