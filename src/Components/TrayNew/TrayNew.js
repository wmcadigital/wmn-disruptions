import React from 'react';
import Draggable from 'react-draggable';

// Import components
import When from './When/When';
import Mode from './Mode/Mode';
import AutoComplete from './AutoComplete/AutoComplete';

// Import styles
import s from './TrayNew.module.scss';

const TrayNew = () => {
  return (
    <Draggable axis="y" grid={[12, 12]} bounds={{ top: -150, bottom: 0 }} defaultPosition={{ x: 0, y: 0 }}>
      <div className={`${s.tray} wmnds-grid wmnds-p-md`}>
        <When />
        <Mode />
        <AutoComplete />
      </div>
    </Draggable>
  );
};

export default TrayNew;
