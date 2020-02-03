import React from 'react';
// Import Components
import TrayComponents from 'components/MapView/Tray/TrayComponents/TrayComponents';
// Import styles
import './ListView.scss';
import s from 'components/MapView/Tray/Tray.module.scss';
import RestInfo from './RestInfo';

function NewListView() {
  return (
    <div className="wmnds-container">
      <div className="wmnds-grid">
        <div className="wmnds-col-1 wmnds-col-md-2-5">
          <div className={`${s.tray} wmnds-grid wmnds-p-md listview-tray`}>
            <TrayComponents />
          </div>
        </div>
        <div className="wmnds-col-1 wmnds-col-md-3-5">
          <RestInfo />
        </div>
      </div>
    </div>
  );
}

export default NewListView;
