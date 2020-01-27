import React, { useContext } from 'react';
import DatePicker from 'react-datepicker'; // Uses https://reactdatepicker.com/

// Import context
import { WhenContext } from './WhenContext';

// Import components
import Button from '../../Button/Button';

// Import Styles
import 'react-datepicker/dist/react-datepicker.css';

const When = () => {
  const [whenState, whenDispatch] = useContext(WhenContext); // Get the state of whenButtons from WhenContext

  const today = new Date(); // Get today's date
  const nowText = `Now ${today.getHours()}:${today.getMinutes()}`; // Set nowText to be 'Now HH:MM'

  return (
    <>
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
        <div className="wmnds-col-auto">
          {/* Choose date button */}
          <div>
            <Button
              btnClass="wmnds-btn--secondary wmnds-btn--small wmnds-p-xsm"
              isActive={whenState.when === 'customDate'}
              onClick={() => whenDispatch({ type: 'TOGGLE_DATEPICKER' })}
              text={whenState.datePickerText}
            />
          </div>
        </div>
        {/* Only show datepicker if when = customDate */}
        <div className="wmnds-col-1" style={{ display: whenState.isMapOpen ? 'inline-block' : 'none' }}>
          <DatePicker
            selected={whenState.whenCustom || today}
            minDate={today}
            onChange={date => whenDispatch({ type: 'UPDATE_CUSTOMDATE', date })}
            inline
          />
        </div>
      </div>
    </>
  );
};

export default When;
