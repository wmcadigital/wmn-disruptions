// Import packages
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";

// Import components
import Button from '../../../Button/Button';

// Import consts
import {
    NOW,
    TOMORROW,
    CHOOSE_DATE,
    TITLE,
    BTN_NOW,
    BTN_TOMORROW,
    BTN_CHOOSE_DATE
} from './data';

// Import styles
import "react-datepicker/dist/react-datepicker.css";
import s from './When.module.scss';

const WhenView = (props) => {
        const {
            timeToCheck,
            time,
            selectDate,
            datePicker
        } = props || {};
        const nowActive = timeToCheck === NOW;
        const tomorrowActive = timeToCheck === TOMORROW;
        const chooseDateActive = timeToCheck === CHOOSE_DATE;
    return (
        <Fragment>
            <div className="pure-g gutters">
                <div className="wmnds-col-1">
                    <h5>{TITLE}</h5>
                </div>
            </div>
            <div className="pure-g gutters">
                <div className={`wmnds-col-1 ${s.buttons}`}>
                    <Button
                        type="mode"
                        isSmall
                        isActive={nowActive}
                        onClick={() => selectDate(NOW)}
                        className={s.btn}
                    >
                        {BTN_NOW}
                    </Button>
                    <Button
                        type="mode"
                        isSmall
                        isActive={tomorrowActive}
                        onClick={() => selectDate(TOMORROW)}
                        className={s.btn}
                    >
                        {BTN_TOMORROW}
                    </Button>
                    <div className={s.chooseDateWrapper}>
                        <Button
                            type="mode"
                            isSmall
                            isActive={chooseDateActive}
                            className={`${s.btn} ${s.chooseDateBtn}`}
                            onClick={(e) => e.preventDefault}
                        >
                            {BTN_CHOOSE_DATE}
                        </Button>
                        <span className={s.datePicker}>
                            <DatePicker
                                selected={time}
                                onSelect={datePicker}
                                withPortal
                            />
                        </span>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

WhenView.propTypes = {
    timeToCheck: PropTypes.string,
    time: PropTypes.string,
    selectDate: PropTypes.func,
    datePicker: PropTypes.func,
};

WhenView.defaultProps = {
    timeToCheck: '',
    time: '',
    selectDate: () => {},
    datePicker: () => {},
};

export default WhenView;
