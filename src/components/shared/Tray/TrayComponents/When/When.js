import React, { useContext, useState, useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker'; // Uses https://reactdatepicker.com/
import { format } from 'fecha';
import enGB from 'date-fns/locale/en-GB';

// Import contexts
import { AutoCompleteContext, WhenContext } from 'globalState';
// Import components
import Button from 'components/shared/Button/Button';
// Import styles
import 'react-datepicker/dist/react-datepicker.css';
// Import Custom CSS for the date picker.
import './datePicker.scss';

const When = () => {
  const [whenState, whenDispatch] = useContext(WhenContext); // Get the state of whenButtons from WhenContext
  const [autoCompleteState, autoCompleteDispatch] = useContext(AutoCompleteContext); // Get the state of autoComplete from AutoCompleteContext
  const today = new Date(); // Get today's date
  const formattedNowText = `Now ${format(today, 'HH:mm')}`; // The format we want our now text to be
  const [nowText, setNowText] = useState(formattedNowText); // Set state for now text and start off with current time

  useEffect(() => {
    // Set an interval to run every minute to update nowText to keep time in sync
    const interval = setInterval(() => {
      setNowText(formattedNowText); // Set nowText to be 'Now HH:mm'
    }, 1000 * 60);

    return () => clearInterval(interval); // On unmount clear interval
  }, [formattedNowText, today]);

  registerLocale('en-GB', enGB); // Register a local as en-gb which we use for datepicker below

  const updateWhen = (when, date) => {
    if (when === 'customDate') {
      whenDispatch({ type: 'UPDATE_CUSTOMDATE', date });
    } else {
      // Update the when context to selected when
      whenDispatch({ type: 'UPDATE_WHEN', when });
    }
    // Reset selected disruption ID from map (if any)
    if (autoCompleteState.selectedMapDisruption) {
      autoCompleteDispatch({ type: 'RESET_SELECTED_SERVICE' });
    }
  };

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
