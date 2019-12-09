// Import packages
import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MainHeader from '../MainHeader/MainHeader';


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
           <Fragment>
            <MainHeader />
      

        <div className={`pure-g gutters ${s.container}`}>                
                    <h1 className={s.title}>{TITLE}</h1>
                             
                <div className={`${s.btnContainer}`}>
                    <Button
                        type="secondary"
                        onClick={() => ToggleViewMode()}
                    >                  
                    
                        {listView ? BTN_MAP : BTN_LIST}
                        <svg className={`wmnds-btn__icon wmnds-btn__icon--right`}>
                            <use xlinkHref="https://wmnetwork.netlify.com/img/svg-sprite.min.svg#wmnds-general-chevron-right" href="https://wmnetwork.netlify.com/img/svg-sprite.min.svg#wmnds-general-chevron-right"></use>
                        </svg>
               
                    </Button>
                </div>
          </div>
          </Fragment> 
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
