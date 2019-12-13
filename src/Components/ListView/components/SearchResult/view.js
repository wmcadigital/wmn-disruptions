// Import packages
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// Import components
import Button from '../../../Button/Button';
import ResultIcon from '../../../ResultIcon/ResultIcon';

// Import styles
import s from './SearchResult.module.scss';

// Import consts
import {
    TITLE_DIVERSION,
    TITLE_EXPECTED,
    TITLE_WHAT,
    BTN_REPLAN,
    BTN_SHARE,
} from './data';

const SearchResultView = (props) => {
    const {
        searchResult,
        expectedDetails,
        whatDetails,
        expanded,
        icon,
        toggleExpand,
    } = props || {};
    const {
        disruption,
        issue,
        area,
        route,
        affectedServices
    } = searchResult || {};

    let aServices;


    if (affectedServices !== undefined && affectedServices.length > 0) {
        aServices = (affectedServices.map(i => {
            return (
                <ResultIcon
                    key={`service-${i}`}
                    searchResult={affectedServices[i]}
                />
            )
        }))
    }

    return (
        <div className={s.container}>
            <div className={`${s.topContainer} ${disruption ? s.disruption : null}`}>
                <div className={s.iconWrapper}>
                    {icon}
                </div>
                <div className={s.detailsWrapper}>
                    <span><strong>{issue} {area}</strong></span><br/>
                    <span>{route}</span>
                </div>
                <div className={s.expandWrapper}>
                    <i className={!expanded ? `fas fa-plus` : `fas fa-minus`} onClick={toggleExpand} />
                </div>
            </div>
            {disruption ? (
                <div className={s.affectedServices}>
                    <span className={s.as}>Affected service(s):</span>
                    {aServices}
                </div>
            ) : null}
            {expanded ? (
                <Fragment>
                    <hr />
                    <div className={s.moreInfoContainer}>
                        <strong>{TITLE_EXPECTED}</strong>
                        <p>{expectedDetails}</p>
                        <strong>{TITLE_WHAT}</strong>
                        <p>{whatDetails}</p>
                        <strong>{TITLE_DIVERSION}</strong>

                        <div className="wmnds-grid">
                            <div className="wmnds-col-1-2">
                                <Button
                                    type="start"
                                    isBlock
                                >
                                    {BTN_REPLAN}
                                </Button>
                            </div>
                            <div className="wmnds-col-1-2">
                                <Button
                                    type="cta"
                                    isBlock
                                >
                                    {BTN_SHARE}
                                </Button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            ) : null}
        </div>
    )
}

SearchResultView.propTypes = {
    // searchResult: PropTypes.objectOf(
    //     oneOfType([
    //         PropTypes.string,
    //         PropTypes.bool,
    //         PropTypes.number,
    //         PropTypes.arrayOf(PropTypes.any)
    //     ])
    // ),
    expectedDetails: PropTypes.string,
    whatDetails: PropTypes.string,
    severity: PropTypes.string,
    icon: PropTypes.string
};

SearchResultView.defaultProps = {

};

export default SearchResultView;