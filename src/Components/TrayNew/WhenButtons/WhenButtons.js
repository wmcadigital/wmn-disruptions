import React, { Component } from 'react';
import DatePicker from 'react-datepicker';

// Import components
import Button from '../../Button/Button';

// Import Styles
import 'react-datepicker/dist/react-datepicker.css';

class WhenButtons extends Component {
  constructor(props) {
    super(props);

    // const { state } = this;

    this.state = {
      when: '',
      whenCustom: '',
      isMapOpen: false,
      datePickerText: 'Choose date'
    };

    this.toggleDate = this.toggleDate.bind(this);
    this.setWhen = this.setWhen.bind(this);
  }

  // Update the state of when
  setWhen(val, custom) {
    this.setState({
      when: val
    });

    if (val === 'customDate' && custom) {
      const chosenDate = `${custom.getDate()}/${custom.getMonth() + 1}/${custom.getFullYear()}`;

      this.setState({
        datePickerText: chosenDate,
        whenCustom: custom
      });
    }
  }

  toggleDate() {
    this.setState(prevState => ({
      isMapOpen: !prevState.isMapOpen
    }));
    this.setWhen('customDate');
  }

  render() {
    const { state } = this;

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
            isActive={state.when === 'now'}
            onClick={() => this.setWhen('now')}
            text={nowText}
          />
          {/* Tomorrow button */}
          <Button
            btnClass="wmnds-btn--secondary wmnds-btn--small wmnds-col-auto wmnds-m-r-sm wmnds-m-b-sm wmnds-p-xsm"
            isActive={state.when === 'tomorrow'}
            onClick={() => this.setWhen('tomorrow')}
            text="Tomorrow"
          />
          <div className="wmnds-col-auto">
            {/* Choose date button */}
            <div>
              <Button
                btnClass="wmnds-btn--secondary wmnds-btn--small wmnds-p-xsm"
                isActive={state.when === 'customDate'}
                onClick={() => this.toggleDate()}
                text={state.datePickerText}
              />
            </div>
          </div>
          {/* Only show datepicker if when = customDate */}
          <div className="wmnds-col-1" style={{ display: state.isMapOpen ? 'inline-block' : 'none' }}>
            <DatePicker
              selected={state.whenCustom || today}
              minDate={today}
              onChange={date => this.setWhen('customDate', date)}
              inline
            />
          </div>
        </div>
      </div>
    );
  }
}

export default WhenButtons;
