import React from 'react';
// Import styles
import s from './TrayNew.scss';

const TrayNew = () => {
  return (
    <div className={s.tray}>
      <div className="wmnds-grid">
        <div className="wmnds-col-1">
          <h4>When</h4>
        </div>
      </div>
    </div>
  );
};

// Default Props
TrayNew.defaultProps = {
  searchPhrase: undefined
};

export default TrayNew;
