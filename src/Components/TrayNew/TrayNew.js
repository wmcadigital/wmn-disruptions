import React from 'react';

// Import components
import When from './When/When';

// Import styles
import s from './TrayNew.module.scss';
import { WhenProvider } from './When/WhenContext';

const TrayNew = () => {
  return (
    <div className={`${s.tray} wmnds-grid wmnds-p-md`}>
      <WhenProvider>
        <When />
      </WhenProvider>
    </div>
  );
};

export default TrayNew;
