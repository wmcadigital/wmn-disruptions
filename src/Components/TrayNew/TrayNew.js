import React from 'react';

// Import components
import When from './When/When';
// Import context
import { WhenProvider } from './When/WhenContext';
// Import styles
import s from './TrayNew.module.scss';

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
