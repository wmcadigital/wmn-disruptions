import React from 'react';

// Import components
import Button from '../Button/Button';
import NewDatePicker from './DatePickerNew/DatePickerNew';

// Import styles
import s from './TrayNew.module.scss';

const TrayNew = props => {
  const { setWhen, when } = props || {};

  const today = new Date(); // Get today's date
  const nowText = `Now ${today.getHours()}:${today.getMinutes()}`; // Set nowText to be 'Now HH:MM'

  return (
    <div className={`${s.tray} wmnds-grid wmnds-p-md`}>
      {/* When */}

      <div className="wmnds-col-1">
        <h4>When</h4>
      </div>

      <div className="wmnds-grid">
        {/* Now button */}
        <Button
          btnClass="wmnds-btn--secondary wmnds-btn--small wmnds-col-auto wmnds-m-r-sm wmnds-m-b-sm wmnds-p-xsm"
          isActive={when === 'now'}
          onClick={() => setWhen('now')}
          className={s.btn}
          text={nowText}
        />
        {/* Tomorrow button */}
        <Button
          btnClass="wmnds-btn--secondary wmnds-btn--small wmnds-col-auto wmnds-m-r-sm wmnds-m-b-sm wmnds-p-xsm"
          isActive={when === 'tomorrow'}
          onClick={() => setWhen('tomorrow')}
          className={s.btn}
          text="Tomorrow"
        />
        <div className="wmnds-col-auto">
          {/* Choose date button */}
          <NewDatePicker today={today} when={when} setWhen={setWhen} />
        </div>
      </div>
    </div>
  );
};

export default TrayNew;
