import React from 'react';
import TrayComponents from 'components/shared/Tray/TrayComponents/TrayComponents';
import s from 'components/shared/Tray/Tray.module.scss';
import DisruptionList from './DisruptionList/DisruptionList';
import './ListView.scss';

function NewListView() {
  return (
    <div className="wmnds-container wmnds-p-t-md wmnds-p-b-md">
      <div className="wmnds-grid">
        <div className="wmnds-col-1 wmnds-col-md-2-5">
          <div className={`${s.tray} wmnds-grid wmnds-p-md listview-tray`}>
            <TrayComponents />
          </div>
        </div>
        <div className="wmnds-col-1 wmnds-col-md-3-5">
          <DisruptionList />
        </div>
      </div>
    </div>
  );
}

export default NewListView;
