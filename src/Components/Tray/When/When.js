// Import packages
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import components
import WhenView from './view';

// Import consts
import { NOW, TOMORROW, CHOOSE_DATE } from './data';

// Import actions
import * as a from './actions';

class When extends React.Component {
  constructor(props) {
    super(props);

    this.ChangeTimeToCheck = this.ChangeTimeToCheck.bind(this);
    this.SelectDate = this.SelectDate.bind(this);
    this.DatePicker = this.DatePicker.bind(this);
    this.ModeOfTransport = this.ModeOfTransport(this);
  }

  componentDidMount() {
    const { props } = this;
    const { SetTimeToCheckAction } = props || {};
    SetTimeToCheckAction(NOW);
  }

  ChangeTimeToCheck(btn) {
    const { props } = this;
    const { SetTimeToCheckAction } = props || {};
    SetTimeToCheckAction(btn);
  }

  SelectDate(btn) {
    const { props, ChangeTimeToCheck } = this;
    const { SetTimeAction } = props || {};
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    if (btn === NOW) {
      SetTimeAction(today);
    } else if (btn === TOMORROW) {
      SetTimeAction(tomorrow);
    }

    ChangeTimeToCheck(btn);
  }

  DatePicker(date) {
    const { props, ChangeTimeToCheck } = this;
    const { SetTimeAction } = props || {};
    SetTimeAction(date);
    ChangeTimeToCheck(CHOOSE_DATE);
  }

  ModeOfTransport() {
    // Still to be set up with API
  }

  render() {
    const { props, SelectDate, DatePicker } = this;
    const { time, timeToCheck } = props || {};

    return <WhenView timeToCheck={timeToCheck} time={time} selectDate={SelectDate} datePicker={DatePicker} />;
  }
}

When.propTypes = {
  timeToCheck: PropTypes.string
};

When.defaultProps = {
  timeToCheck: ''
};

const mapStateToProps = state => {
  const { time } = state || {};
  const { timeToCheck, time: timeSelected } = time || {};
  return {
    timeToCheck: timeToCheck || '',
    time: timeSelected || ''
  };
};

const mapDispatchToProps = dispatch => {
  const { SetTimeToCheckAction, SetTimeAction } = a || {};
  return {
    SetTimeToCheckAction: data => dispatch(SetTimeToCheckAction(data)),
    SetTimeAction: data => dispatch(SetTimeAction(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(When);
