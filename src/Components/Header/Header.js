// Import packages
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


// Import components
import Button from '../../Components/Button/Button';

// Import actions
import * as a from '../../redux/actions';

// Import consts
import {
    TITLE,
    BTN_LIST,
    BTN_MAP
} from './data';

// Import style
import s from './Header.module.scss';

// Define consts
const MAP_VIEW = 'map view';
const LIST_VIEW = 'list view';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.ToggleViewMode = this.ToggleViewMode.bind(this);
    }

    ToggleViewMode() {
        const { props } = this;
        const { viewMode, SetViewMode } = props || {};

        if (viewMode === MAP_VIEW) {
            SetViewMode(LIST_VIEW);
        } else if (viewMode === LIST_VIEW) {
            SetViewMode(MAP_VIEW);
        }
    }

    render() {
        const { props, ToggleViewMode } = this;
        const { viewMode } = props || {};
        const listView = viewMode === LIST_VIEW;
        return (
      

        <div className={`pure-g gutters ${s.container}`}>                
                    <h1 className={s.title}>{TITLE}</h1>
                             
                <div className={`wmnds-col-1-1 ${s.btnContainer}`}>
                    <Button
                        type="secondary"
                        onClick={() => ToggleViewMode()}
                    >
                        <span>
                            {listView ? BTN_MAP : BTN_LIST}
                            <i className="wmnds-btn__icon--right fas fa-chevron-right"></i>
                        </span>
                        
                        
                    </Button>
                </div>
          </div>
        )   
    }
}

Header.propTypes = {
    viewMode: PropTypes.string,
    SetViewMode: PropTypes.func,
};

Header.defaultProps = {
    viewMode: MAP_VIEW,
    SetViewMode: () => {},
};

const mapStateToProps = state => {
    const { app } = state || {};
    const { viewMode } = app || {};

    return {
        viewMode: viewMode || '',
    }
}

const mapDispatchToProps = dispatch => {
    const { SetViewMode } = a || {};
    return {
        SetViewMode: data => dispatch(SetViewMode(data))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Header);
