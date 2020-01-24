import React from 'react';
import DatePicker from 'react-datepicker';

// Import components
import Button from '../Button/Button';

// Import styles
import s from './TrayNew.module.scss';

const TrayNew = props => {
  const { handleWhen, when, time, datePicker } = props || {};

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
          onClick={() => handleWhen('now')}
          className={s.btn}
          text="Now 14:44"
        />
        {/* Tomorrow button */}
        <Button
          btnClass="wmnds-btn--secondary wmnds-btn--small wmnds-col-auto wmnds-m-r-sm wmnds-m-b-sm wmnds-p-xsm"
          isActive={when === 'tomorrow'}
          className={s.btn}
          text="Tomorrow"
        />
        <div className="wmnds-col-auto">
          {/* Choose date button */}
          <div className={s.chooseDateWrapper}>
            <Button
              btnClass="wmnds-btn--secondary wmnds-btn--small wmnds-p-xsm"
              isActive={when === 'customDate'}
              className={`${s.btn} ${s.chooseDateBtn}`}
              onClick={e => e.preventDefault}
              text="Choose date"
            />

            <span className={s.datePicker} style={{ display: 'none' }}>
              <DatePicker selected={time} onSelect={datePicker} withPortal />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrayNew;
