import React from 'react';
import RestInfo from './RestInfo';
import './ListView.scss';

function NewListView() {
  return (
    <div>
      <div className="wmnds-grid">
        <div className="wmnds-col-2-5" />
        <div className="wmnds-col-3-5">
          <RestInfo />
        </div>
      </div>
    </div>
  );
}

export default NewListView;
