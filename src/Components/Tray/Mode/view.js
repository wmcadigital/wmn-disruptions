// Import packages
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import components
import Button from '../../Button/Button';
import Icon from '../../Icon/Icon';

// Import styles
import s from './Mode.module.scss';

// Import actions
import * as a from './actions';

// Import consts
import {
    TITLE,
    BTN_BUS,
    BTN_TRAIN,
    BTN_TRAM,
    BTN_ROADS,
    BUS,
    TRAIN,
    TRAM,
    ROADS
} from './data';

class ModeView extends React.Component {
    componentDidMount() {
        const { props } = this;
        const { SetModeAction } = props || {};
        SetModeAction(BUS);
    }

    render() {
        const { props } = this;
        const { modeToCheck, changeModeToCheck } = props;
        const busActive = modeToCheck === BUS;
        const trainActive = modeToCheck === TRAIN;
        const tramActive = modeToCheck === TRAM;
        const roadsActive = modeToCheck === ROADS;

        // if (modeToCheck === BUS ){
        //     console.log('Show Bus Info Now');
        // }

        // if (modeToCheck === TRAIN) {
        //     console.log('Show Train Info Now');
        // }

        return (
          <Fragment>
            <div className="wmnds-grid">
              <div className="wmnds-col-1">
                <h5>{TITLE}</h5>
              </div>
            </div>
            <div className="wmnds-grid">
              <div className={`wmnds-col-1 ${s.buttons}`}>
                <button className="wmnds-btn wmnds-btn--small wmnds-btn--mode">
                  <Icon class="wmnds-btn__icon" iconName="modes-isolated-bus" />
                  Bus
                </button>

                <Button
                  type="mode"
                  isSmall
                  isActive={trainActive}
                  className={s.btn}
                  onClick={() => changeModeToCheck(TRAIN)}
                >
                  <Icon
                    class="wmnds-btn__icon"
                    iconName="modes-isolated-rail"
                  />
                  Train
                </Button>

                <Button
                  type="mode"
                  isSmall
                  isActive={tramActive}
                  className={s.btn}
                  onClick={() => changeModeToCheck(TRAM)}
                >
                  <Icon
                    class="wmnds-btn__icon"
                    iconName="modes-isolated-metro"
                  />
                  Tram
                </Button>

                <Button
                  type="mode"
                  isSmall
                  isActive={roadsActive}
                  className={s.btn}
                  onClick={() => changeModeToCheck(ROADS)}
                >
                  <Icon class="wmnds-btn__icon" iconName="modes-isolated-roads" />
                  Roads
                </Button>
              </div>
            </div>
          </Fragment>
        );
    }
}

ModeView.propTypes = {
    changeModeToCheck: PropTypes.func,
    modeToCheck: PropTypes.string,
};

ModeView.defaultProps = {
    changeModeToCheck: () => {},
    modeToCheck: BUS,
};

const mapStateToProps = state => {
    const { mode } = state || {};
    const { modeToCheck } = mode || {};
    return {
        modeToCheck: modeToCheck || '',
    }
}

const mapDispatchToProps = dispatch => {
    const { SetModeAction } = a || {};
    return {
        SetModeAction: data => dispatch(SetModeAction(data))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModeView);