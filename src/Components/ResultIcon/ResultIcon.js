// Import packages
import React, { Fragment } from 'react';
import PropTypes, { oneOfType } from 'prop-types';

// Import styles
import s from './ResultIcon.module.scss';

// Import consts
import {
    BUS,
    TRAIN,
    TRAM,
    ROADS,
} from './data';

const ResultIcon = (props) => {
    const {
        searchResult,
    } = props || {};
    const {
        service,
        provider,
        mode,
        disruption: d,
    } = searchResult || {};
    let icon;
    const busIcon = (
        <span className={s.iconWrapper}>
            <span className={`${s.iconRouteTop} ${d ? s.disruption : null}`}>
                {service} <i className={`fas fa-${d ? `exclamation-circle` : `check-circle`}`} />
            </span>
            <span className={s.iconRouteBottom}>{provider}</span>
        </span>
    );
    const trainIcon = (
        <span className={`${s.iconWrapper} ${d ? s.disruption : null}`}>
            Train
        </span>
    );
    const tramIcon = (
        <span className={`${s.iconWrapper} ${s.tramIcon} ${d ? s.disruption : null}`}>
            <i className={`fas fa-${d ? `exclamation-triangle` : `check-circle`}`} />
        </span>
    );
    const roadsIcon = (
        <span className={`${s.iconWrapper} ${d ? s.disruption : null}`}>
            Roads
        </span>
    );

    switch(mode) {
        case BUS:
            icon = busIcon
            break;
        case TRAIN:
            icon = trainIcon
            break;
        case TRAM:
            icon = tramIcon
            break;
        case ROADS:
            icon = roadsIcon;
            break;
        default: (
            icon = ''
        )
    }

    return (
        <Fragment>{icon}</Fragment>
    )

}

ResultIcon.propTypes = {
    searchResult: PropTypes.objectOf(
        oneOfType([
            PropTypes.string,
            PropTypes.bool,
            PropTypes.number,
            PropTypes.arrayOf(PropTypes.any)
        ])
    ),
};

ResultIcon.defaultProps = {
    searchResult: {},
};

export default ResultIcon;
