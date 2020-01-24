import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Import components
import Button from '../../Button/Button';

// Import styles
import s from './DatePickerNew.module.scss';

const DatePickerNew = props => {
  const { today, when, setWhen } = props || {};

  return (
    <div className={s.chooseDateWrapper}>
      <Button
        btnClass="wmnds-btn--secondary wmnds-btn--small wmnds-p-xsm"
        isActive={when === 'customDate'}
        onClick={() => setWhen('customDate')}
        className={`${s.btn} ${s.chooseDateBtn}`}
        text="Choose date"
      />
      {/* Only show datepicker if when = customDate */}
      <span className={s.datePicker} style={{ display: when === 'customDate' ? 'inline-block' : 'none' }}>
        <DatePicker selected={today} minDate={today} inline />
      </span>
    </div>
  );
};

export default DatePickerNew;
