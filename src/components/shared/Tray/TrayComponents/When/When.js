import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker'; // Uses https://reactdatepicker.com/
import { format } from 'fecha';
import enGB from 'date-fns/locale/en-GB';
// CustomHooks
import useResetState from 'customHooks/useResetState';
// Import components
import Button from 'components/shared/Button/Button';
// Import styles
import 'react-datepicker/dist/react-datepicker.css';
// Import Custom CSS for the date picker.
import './datePicker.scss';

// This is only set once as the date/time is relevant to when the user first accessed the app, otherwise the cached disruptions will be out of sync with the real world time
const today = new Date(); // Get today's date
const nowText = `Now ${format(today, 'HH:mm')}`; // Set nowText to be 'Now HH:MM'

const When = () => {
  const { updateWhen, whenState, whenDispatch } = useResetState();

  registerLocale('en-GB', enGB); // Register a local as en-gb which we use for datepicker below

  return (
    <div className="wmnds-grid">
      <div className="wmnds-col-1">
        <h4>When</h4>
      </div>
      <div className="wmnds-grid">
        {/* Now button */}
        <Button
          btnClass="wmnds-btn--secondary wmnds-col-auto wmnds-m-r-sm wmnds-m-b-sm wmnds-p-xsm"
          isActive={whenState.when === 'now'}
          onClick={() => updateWhen('now')}
          text={nowText}
        />
        {/* Tomorrow button */}
        <Button
          btnClass="wmnds-btn--secondary wmnds-col-auto wmnds-m-r-sm wmnds-m-b-sm wmnds-p-xsm"
          isActive={whenState.when === 'tomorrow'}
          onClick={() => updateWhen('tomorrow')}
          text="Tomorrow"
        />
        {/* Choose date button */}
        <Button
          btnClass="wmnds-btn--secondary wmnds-col-auto wmnds-m-b-sm wmnds-p-xsm"
          isActive={whenState.when === 'customDate'}
          onClick={() => whenDispatch({ type: 'TOGGLE_DATEPICKER' })}
          text={whenState.datePickerText}
        />
        {/* Only show datepicker if when = customDate */}
        <div
          className="wmnds-col-1"
          style={{ display: whenState.isDatePickerOpen ? 'inline-block' : 'none' }}
        >
          <DatePicker
            selected={whenState.whenCustomDate || today}
            minDate={today}
            onChange={(date) => updateWhen('customDate', date)}
            calendarClassName="disruptions-date-picker"
            inline
            locale="en-GB"
          />
        </div>
      </div>
    </div>
  );
};

export default When;
