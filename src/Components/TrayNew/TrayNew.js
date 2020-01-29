import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';

// Import components
import When from './When/When';
import Mode from './Mode/Mode';
import AutoComplete from './AutoComplete/AutoComplete';

// Import styles
import s from './TrayNew.module.scss';

const TrayNew = () => {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const getHeaderHeight = document.getElementsByClassName('wmnds-header')[0].clientHeight;
    const getBreadcrumbHeight = document.getElementsByClassName('wmnds-breadcrumb')[0].clientHeight;
    const getAppHeaderHeight = document.querySelector('#disruptionsApp > .wmnds-container').clientHeight;

    setHeaderHeight(getHeaderHeight + getBreadcrumbHeight + getAppHeaderHeight);
  }, []);

  return (
    <div className={s.trayContainer}>
      <Draggable
        axis="y"
        grid={[12, 12]}
        bounds={{ top: headerHeight, bottom: 650 }}
        defaultPosition={{ x: 0, y: 650 }}
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
    </div>
  );
};

export default TrayNew;
