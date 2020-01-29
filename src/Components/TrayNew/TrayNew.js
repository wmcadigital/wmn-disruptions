import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';

// Import components
import When from './When/When';
import Mode from './Mode/Mode';
import AutoComplete from './AutoComplete/AutoComplete';

// Import styles
import s from './TrayNew.module.scss';

const TrayNew = () => {
  const [maxTrayHeight, setMaxTrayHeight] = useState(0);

  // const [minTrayHeight, setMinTrayHeight] = useState(0);

  useEffect(() => {
    const getContainerHeight = document.getElementById('js-map-tray-wrapper').clientHeight;

    setMaxTrayHeight(getContainerHeight);

    // const getHeaderHeight = document.getElementsByClassName('wmnds-header')[0].clientHeight;
    // const getBreadcrumbHeight = document.getElementsByClassName('wmnds-breadcrumb')[0].clientHeight;
    // const getAppHeaderHeight = document.querySelector('#disruptionsApp > .wmnds-container').clientHeight;
    // setMinTrayHeight(0);
    // setMaxTrayHeight(getHeaderHeight + getBreadcrumbHeight + getAppHeaderHeight);
  }, []);

  return (
    <Draggable
      axis="y"
      grid={[12, 12]}
      bounds={{ left: 0, top: -maxTrayHeight, right: 0, bottom: -36 }}
      defaultPosition={{ x: 0, y: -250 }}
    >
      <div className={`${s.tray} wmnds-grid wmnds-p-md`}>
        <div className={`${s.drawerHandle} wmnds-col-1`}>
          <p>Swipe tray up</p>
        </div>

        <When />
        <Mode />
        <AutoComplete />
      </div>
    </Draggable>
  );
};

export default TrayNew;
