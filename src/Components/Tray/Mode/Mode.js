// Import packages
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import components
import ModeView from './view';

// Import actions
import * as a from './actions';
import * as searchActions from '../Search/actions';

class Mode extends React.Component {
    constructor(props) {
        super(props);

        this.ChangeModeToCheck = this.ChangeModeToCheck.bind(this);
    }

    ChangeModeToCheck(mode) {
        const { props } = this;
        const {
            SetModeAction,
            ResetSearch,
            DeselectResult
        } = props || {};

        DeselectResult();
        ResetSearch();
        SetModeAction(mode);
    }

    render() {
        const { ChangeModeToCheck } = this;
        return (
            <div>
            <h6>Test</h6>
            <ModeView
                changeModeToCheck={ChangeModeToCheck}
            />
            </div>
        )
    }
}

Mode.propTypes = {
    modeToCheck: PropTypes.string,
};

Mode.defaultProps = {
    modeToCheck: '',
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
    const { ResetSearch, DeselectResult } = searchActions || {};
    return {
        SetModeAction: data => dispatch(SetModeAction(data)),
        ResetSearch: data => dispatch(ResetSearch(data)),
        DeselectResult: data => dispatch(DeselectResult(data))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Mode);

