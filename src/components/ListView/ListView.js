import React from 'react';
import TrayComponents from 'components/shared/Tray/TrayComponents/TrayComponents';
// Import styles
import trayStyle from 'components/shared/Tray/Tray.module.scss';
import s from './ListView.module.scss';
import './ListView.scss';
// Import components
import DisruptionList from './DisruptionList/DisruptionList';

function NewListView() {
  return (
    <div className="wmnds-container wmnds-p-t-md wmnds-p-b-md">
      <div className="wmnds-grid wmnds-grid--justify-between">
        <div className="wmnds-col-1 wmnds-col-md-1-3">
          <div className={`${trayStyle.tray} wmnds-grid wmnds-p-md listview-tray`}>
            <TrayComponents />
          </div>
        </div>
        <div className={`wmnds-col-1 wmnds-col-md-2-3 ${s.list}`}>
          <DisruptionList />
        </div>
      </div>
    </div>
  );
}

export default NewListView;
