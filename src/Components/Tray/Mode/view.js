// Import packages
import React from 'react';
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
import { TITLE, BUS, TRAIN, TRAM, ROADS } from './data';

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

    return (
      <>
        <div className="wmnds-grid">
          <div className="wmnds-col-1">
            <h5>{TITLE}</h5>
          </div>
        </div>
        <div className="wmnds-grid">
          <div className={`wmnds-col-1 ${s.buttons}`}>
            <Button
              isActive={busActive}
              className={s.btn}
              onClick={() => changeModeToCheck(BUS)}
              iconLeft="modes-isolated-bus"
            >
              Bus
            </Button>

            <Button isActive={trainActive} className={s.btn} onClick={() => changeModeToCheck(TRAIN)}>
              <Icon class="wmnds-btn__icon" iconName="modes-isolated-rail" />
              Train
            </Button>

            <Button isActive={tramActive} className={s.btn} onClick={() => changeModeToCheck(TRAM)}>
              <Icon class="wmnds-btn__icon" iconName="modes-isolated-metro" />
              Tram
            </Button>

            <Button isActive={roadsActive} className={s.btn} onClick={() => changeModeToCheck(ROADS)}>
              <Icon class="wmnds-btn__icon" iconName="modes-isolated-roads" />
              Roads
            </Button>
          </div>
        </div>
      </>
    );
  }
}

ModeView.propTypes = {
  changeModeToCheck: PropTypes.func,
  modeToCheck: PropTypes.string
};

ModeView.defaultProps = {
  changeModeToCheck: () => {},
  modeToCheck: BUS
};

const mapStateToProps = state => {
  const { mode } = state || {};
  const { modeToCheck } = mode || {};
  return {
    modeToCheck: modeToCheck || ''
  };
};

const mapDispatchToProps = dispatch => {
  const { SetModeAction } = a || {};
  return {
    SetModeAction: data => dispatch(SetModeAction(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModeView);
