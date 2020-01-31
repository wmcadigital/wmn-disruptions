import React, { useContext } from 'react';
import DatePicker from 'react-datepicker'; // Uses https://reactdatepicker.com/

// Import contexts
import { WhenContext } from 'globalState';
// Import components
import Button from 'components/shared/Button/Button';
// Import styles
import 'react-datepicker/dist/react-datepicker.css';

const When = () => {
  const [whenState, whenDispatch] = useContext(WhenContext); // Get the state of whenButtons from WhenContext

  const today = new Date(); // Get today's date
  const nowText = `Now ${today.getHours()}:${today.getMinutes()}`; // Set nowText to be 'Now HH:MM'

  return (
    <div className="wmnds-grid">
      <div className="wmnds-col-1">
        <h4>When</h4>
      </div>
      <div className="wmnds-grid">
        {/* Now button */}
        <Button
          btnClass="wmnds-btn--secondary wmnds-btn--small wmnds-col-auto wmnds-m-r-sm wmnds-m-b-sm wmnds-p-xsm"
          isActive={whenState.when === 'now'}
          onClick={() => whenDispatch({ type: 'UPDATE_WHEN', when: 'now' })}
          text={nowText}
        />
        {/* Tomorrow button */}
        <Button
          btnClass="wmnds-btn--secondary wmnds-btn--small wmnds-col-auto wmnds-m-r-sm wmnds-m-b-sm wmnds-p-xsm"
          isActive={whenState.when === 'tomorrow'}
          onClick={() => whenDispatch({ type: 'UPDATE_WHEN', when: 'tomorrow' })}
          text="Tomorrow"
        />
        {/* Choose date button */}
        <Button
          btnClass="wmnds-btn--secondary wmnds-btn--small wmnds-col-auto wmnds-p-xsm wmnds-m-b-sm"
          isActive={whenState.when === 'customDate'}
          onClick={() => whenDispatch({ type: 'TOGGLE_DATEPICKER' })}
          text={whenState.datePickerText}
        />
        {/* Only show datepicker if when = customDate */}
        <div className="wmnds-col-1" style={{ display: whenState.isDatePickerOpen ? 'inline-block' : 'none' }}>
          <DatePicker
            selected={whenState.whenCustomDate || today}
            minDate={today}
            onChange={date => whenDispatch({ type: 'UPDATE_CUSTOMDATE', date })}
            inline
          />
        </div>
      </div>
    </div>
  );
};

export default When;
