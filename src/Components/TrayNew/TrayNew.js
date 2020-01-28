import React from 'react';

// Import context
import { WhenProvider } from 'globalState/WhenContext';
import { ModeProvider } from 'globalState/ModeContext';

// Import components
import When from './When/When';
import Mode from './Mode/Mode';
import AutoComplete from './AutoComplete/AutoComplete';

// Import styles
import s from './TrayNew.module.scss';

const TrayNew = () => {
  return (
    <div className={`${s.tray} wmnds-grid wmnds-p-md`}>
      <WhenProvider>
        <When />
      </WhenProvider>

      <ModeProvider>
        <Mode />
        <AutoComplete />
      </ModeProvider>
    </div>
  );
};

export default TrayNew;
