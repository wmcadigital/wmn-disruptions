import React from 'react';
import DatePicker from 'react-datepicker';

// Import components
import Button from '../Button/Button';

// Import styles
import s from './TrayNew.module.scss';
import 'react-datepicker/dist/react-datepicker.css';

const TrayNew = props => {
  const { setWhen, when, whenCustom } = props || {};

  const today = new Date(); // Get today's date
  const nowText = `Now ${today.getHours()}:${today.getMinutes()}`; // Set nowText to be 'Now HH:MM'

  const isMapOpen = when === 'customDate';

  // const [startDate] = useState(new Date());

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
              text={whenCustom.ToString || 'Choose date'}
            />
          </div>
        </div>
        {/* Only show datepicker if when = customDate */}
        <div className={`wmnds-col-1 ${s.datePicker}`} style={{ display: isMapOpen ? 'inline-block' : 'none' }}>
          <DatePicker
            selected={whenCustom || today}
            minDate={today}
            onChange={date => setWhen('customDate', date)}
            inline
          />
        </div>
      </div>
    </div>
  );
};

export default TrayNew;
