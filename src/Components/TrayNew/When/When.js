import React, { useContext } from 'react';
import DatePicker from 'react-datepicker';

// Import context
import { WhenContext } from './WhenContext';

// Import components
import Button from '../../Button/Button';

// Import Styles
import 'react-datepicker/dist/react-datepicker.css';

const When = () => {
  const [whenState, setWhenState] = useContext(WhenContext);

  //  Update the state of when
  const updateWhen = (val, custom) => {
    setWhenState(state => ({ ...state, when: val }));

    if (val === 'customDate' && custom) {
      const chosenDate = `${custom.getDate()}/${custom.getMonth() + 1}/${custom.getFullYear()}`;

      setWhenState(state => ({ ...state, datePickerText: chosenDate }));
      setWhenState(state => ({ ...state, whenCustom: custom }));
    }
  };

  const toggleDate = () => {
    setWhenState(state => ({ ...state, isMapOpen: !state.isMapOpen }));
    setWhenState(state => ({ ...state, when: 'customDate' }));
  };

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
          onClick={() => updateWhen('now')}
          text={nowText}
        />
        {/* Tomorrow button */}
        <Button
          btnClass="wmnds-btn--secondary wmnds-btn--small wmnds-col-auto wmnds-m-r-sm wmnds-m-b-sm wmnds-p-xsm"
          isActive={whenState.when === 'tomorrow'}
          onClick={() => updateWhen('tomorrow')}
          text="Tomorrow"
        />
        <div className="wmnds-col-auto">
          {/* Choose date button */}
          <div>
            <Button
              btnClass="wmnds-btn--secondary wmnds-btn--small wmnds-p-xsm"
              isActive={whenState.when === 'customDate'}
              onClick={() => toggleDate()}
              text={whenState.datePickerText}
            />
          </div>
        </div>
        {/* Only show datepicker if when = customDate */}
        <div className="wmnds-col-1" style={{ display: whenState.isMapOpen ? 'inline-block' : 'none' }}>
          <DatePicker
            selected={whenState.whenCustom || today}
            minDate={today}
            onChange={date => updateWhen('customDate', date)}
            inline
          />
        </div>
      </div>
    </>
  );
};

export default When;
