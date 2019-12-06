// Import packages
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import components
import ResultIcon from '../../../../../ResultIcon/ResultIcon';

// Import actions
import * as a from '../../actions';

// Import styles
import s from './SelectedResult.module.scss';

const SelectedResult = (props) => {
    const {
        searchResult: r,
        isFav,
        disruption,
        DeselectResult
    } = props || {};

    console.log("selected result is ", r)

    return (
        <Fragment>
            <div className={s.container}>
                <div className={s.iconWrapper}>
                    <ResultIcon searchResult={r} />
                </div>
                <div className={s.detailsWrapper}>
                    <span><strong>{r.service} {r.area}</strong></span><br/>
                    <span>{r.route}</span>
                </div>
                <div className={s.iconWrapper}>
                    <i className={`far fa-times-circle ${s.close}`} onClick={() => DeselectResult()} />
                </div>
            </div>
            {disruption ? (
                <div className={s.disruption}>
                    <div>
                        <i className={`fas fa-exclamation-triangle ${s.disruptionIcon}`} />
                    </div>
                    <div>
                        <strong>No service between The Hawthorns and Grand Central</strong><br></br>
                        Due to damage to overhead wires, expected to continue until
                        end of service. <strong>Plan ahead</strong>
                    </div>
                </div>
            ) : null}
            <span className={s.favContainer}>
                Save this service to my homepage
                <i className={isFav ? `fas fa-star` : `far fa-star`} onClick={() => {}} />
            </span>
        </Fragment>
    )
}

SelectedResult.propTypes = {
    disruption: PropTypes.bool,
};

SelectedResult.defaultProps = { 
    disruption: false,
};

const mapStateToProps = state => {
    const { search } = state || {};
    const { searchResult, modeToCheck } = search;
    return {
        searchResult: searchResult || {},
        modeToCheck: modeToCheck
    }
};

const mapDispatchToProps = dispatch => {
    const { DeselectResult } = a || {};
    return {
        DeselectResult: data => dispatch(DeselectResult(data))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectedResult);