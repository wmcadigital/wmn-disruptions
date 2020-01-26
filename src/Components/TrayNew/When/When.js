import React, { useContext } from 'react';
import DatePicker from 'react-datepicker';

// Import context
import { WhenContext } from './WhenContext';

// Import components
import Button from '../../Button/Button';

// Import Styles
import 'react-datepicker/dist/react-datepicker.css';

const When = () => {
  const [
    when,
    setWhen,
    whenCustom,
    setWhenCustom,
    isMapOpen,
    setisMapOpen,
    datePickerText,
    setDatePickerText
  ] = useContext(WhenContext);

  //  Update the state of when
  const updateWhen = (val, custom) => {
    setWhen(val);

    if (val === 'customDate' && custom) {
      const chosenDate = `${custom.getDate()}/${custom.getMonth() + 1}/${custom.getFullYear()}`;

      setDatePickerText(chosenDate);
      setWhenCustom(custom);
    }
  };

  const toggleDate = () => {
    setisMapOpen(prevIsMapOpen => !prevIsMapOpen);
    setWhen('customDate');
  };

  const today = new Date(); // Get today's date
  const nowText = `Now ${today.getHours()}:${today.getMinutes()}`; // Set nowText to be 'Now HH:MM'

  return (
    <div>
      <div className="wmnds-col-1">
        <h4>When</h4>
      </div>

      <div className="wmnds-grid">
        {/* Now button */}
        <Button
          btnClass="wmnds-btn--secondary wmnds-btn--small wmnds-col-auto wmnds-m-r-sm wmnds-m-b-sm wmnds-p-xsm"
          isActive={when === 'now'}
          onClick={() => updateWhen('now')}
          text={nowText}
        />
        {/* Tomorrow button */}
        <Button
          btnClass="wmnds-btn--secondary wmnds-btn--small wmnds-col-auto wmnds-m-r-sm wmnds-m-b-sm wmnds-p-xsm"
          isActive={when === 'tomorrow'}
          onClick={() => updateWhen('tomorrow')}
          text="Tomorrow"
        />
        <div className="wmnds-col-auto">
          {/* Choose date button */}
          <div>
            <Button
              btnClass="wmnds-btn--secondary wmnds-btn--small wmnds-p-xsm"
              isActive={when === 'customDate'}
              onClick={() => toggleDate()}
              text={datePickerText}
            />
          </div>
        </div>
        {/* Only show datepicker if when = customDate */}
        <div className="wmnds-col-1" style={{ display: isMapOpen ? 'inline-block' : 'none' }}>
          <DatePicker
            selected={whenCustom || today}
            minDate={today}
            onChange={date => updateWhen('customDate', date)}
            inline
          />
        </div>
      </div>
    </div>
  );
};

export default When;
