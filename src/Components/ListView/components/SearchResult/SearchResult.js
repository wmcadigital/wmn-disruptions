// Import packages
import React from 'react';
import PropTypes, { oneOfType } from 'prop-types';

// Import components
import SearchResultView from './view';

// Import styles
import s from './SearchResult.module.scss';

// Import consts
import {
    BUS,
    TRAIN,
    TRAM,
    ROADS,
    MINOR,
    MAJOR,
    GOOD
} from './data';

class SearchResult extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false
        }

        this.ToggleExpand = this.ToggleExpand.bind(this);
    }

    ToggleExpand() {
        const { state } = this;
        const { expanded } = state || {};
        this.setState({ expanded: !expanded });
    }

    render() {
        const {
            state,
            props,
            ToggleExpand
        } = this;
        const {
            searchResult,
            expectedDetails,
            whatDetails,
            severity
        } = props || {};
        const {
            mode
        } = searchResult || {};
        const { expanded }  = state || {};
        let modeType;

        switch(mode) {
            case BUS:
                modeType = 'http://via.placeholder.com/24x24';
                break;
            case TRAIN:
                modeType = 'http://via.placeholder.com/24x24';
                break;
            case TRAM:
                modeType = 'http://via.placeholder.com/24x24';
                break;
            case ROADS:
                modeType = 'http://via.placeholder.com/24x24';
                break;
            default: (
                modeType = ''
            )
        }

        let iconType;
        let iconBg;

        switch(severity) {
            case MINOR:
                iconBg = s.minor;
                iconType = 'fas fa-exclamation-circle';
                break;
            case MAJOR:
                iconBg = s.major;
                iconType = 'fas fa-exclamation-triangle';
                break;
            case GOOD:
                iconBg = s.good;
                iconType = 'fas fa-check-circle';
                break;
            default: 
                iconBg = null;
                iconType = null;
        }

        const icon = (
            <div className={`${s.iconBg} ${iconBg}`}>
                <img src={modeType} alt="" />
                &nbsp;
                <i className={iconType} />
            </div>
        );
    
        return (
            <SearchResultView
                icon={icon}
                searchResult={searchResult}
                whatDetails={whatDetails}
                expectedDetails={expectedDetails}
                toggleExpand={ToggleExpand}
                expanded={expanded}
            />
        )
    }
}

SearchResult.propTypes = {
    searchResult: PropTypes.objectOf(
        oneOfType([
            PropTypes.string,
            PropTypes.bool,
            PropTypes.number
        ])
    ),
    expectedDetails: PropTypes.string,
    whatDetails: PropTypes.string,
    severity: PropTypes.string,
};

SearchResult.defaultProps = {
    searchResult: {},
    expectedDetails: 'Thursday 17th October at 4:00 PM',
    whatDetails: 'Long Lane is closed in a southbound direction from the junction with Archer Way to allow for gas main repair works.',
    severity: undefined,
};

export default SearchResult;