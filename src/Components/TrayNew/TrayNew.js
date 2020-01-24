import React from 'react';
import DatePicker from 'react-datepicker';

// Import components
import Button from '../Button/Button';

// Import styles
import s from './TrayNew.module.scss';

const TrayNew = props => {
  const { setWhen, when, datePicker } = props || {};

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
          <div className={s.chooseDateWrapper}>
            <Button
              btnClass="wmnds-btn--secondary wmnds-btn--small wmnds-p-xsm"
              isActive={when === 'customDate'}
              onClick={() => setWhen('customDate')}
              className={`${s.btn} ${s.chooseDateBtn}`}
              text="Choose date"
            />

            <span className={s.datePicker} style={{ display: 'none' }}>
              <DatePicker selected={today} onSelect={datePicker} withPortal />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrayNew;
