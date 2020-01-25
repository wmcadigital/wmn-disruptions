import React from 'react';

// Import components
import WhenButton from './WhenButtons/WhenButtons';

// Import styles
import s from './TrayNew.module.scss';

const TrayNew = () => {
  return (
    <div className={`${s.tray} wmnds-grid wmnds-p-md`}>
      <WhenButton />
    </div>
  );
};

export default TrayNew;
