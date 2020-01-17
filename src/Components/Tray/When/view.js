// Import packages
import React from 'react';
// import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';

// Import components
import Button from '../../Button/Button';

// Import consts
import { NOW, TOMORROW, CHOOSE_DATE, TITLE, BTN_NOW, BTN_TOMORROW, BTN_CHOOSE_DATE } from './data';

// Import styles
import 'react-datepicker/dist/react-datepicker.css';
import s from './When.module.scss';

const WhenView = props => {
  const { timeToCheck, time, selectDate, datePicker } = props || {};
  const nowActive = timeToCheck === NOW;
  const tomorrowActive = timeToCheck === TOMORROW;
  const chooseDateActive = timeToCheck === CHOOSE_DATE;
  return (
    <>
      <div className="wmnds-grid">
        <div className="wmnds-col-1">
          <h4>{TITLE}</h4>
        </div>
      </div>
      <div className="wmnds-grid wmnds-grid--justify-between">
        {/* Now button */}
        <Button
          btnClass="wmnds-btn--secondary wmnds-btn--small wmnds-col-auto"
          isActive={nowActive}
          onClick={() => selectDate(NOW)}
          className={s.btn}
          text={BTN_NOW}
        />
        {/* Tomorrow button */}
        <Button
          btnClass="wmnds-btn--secondary wmnds-btn--small wmnds-col-auto"
          isActive={tomorrowActive}
          onClick={() => selectDate(TOMORROW)}
          className={s.btn}
          text={BTN_TOMORROW}
        />
        <div className="wmnds-col-auto">
          {/* Choose date button */}
          <div className={s.chooseDateWrapper}>
            <Button
              btnClass="wmnds-btn--secondary wmnds-btn--small"
              isActive={chooseDateActive}
              className={`${s.btn} ${s.chooseDateBtn}`}
              onClick={e => e.preventDefault}
              text={BTN_CHOOSE_DATE}
            />

            <span className={s.datePicker}>
              <DatePicker selected={time} onSelect={datePicker} withPortal />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

// WhenView.propTypes = {
//   timeToCheck: PropTypes.string,
//   time: PropTypes.string,
//   selectDate: PropTypes.func,
//   datePicker: PropTypes.func
// };

WhenView.defaultProps = {
  timeToCheck: '',
  time: '',
  selectDate: () => {},
  datePicker: () => {}
};

export default WhenView;
