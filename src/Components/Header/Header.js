// Import packages
import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MainHeader from '../MainHeader/MainHeader';

// Import components
import Button from '../Button/Button';

// New List View
import NewListView from '../ListView/NewListView';

// Import actions
import * as a from '../../redux/actions';

// Import consts
import { TITLE } from './data';

// Import style
import s from './Header.module.scss';

// Define consts
const MAP_VIEW = 'map view';
const LIST_VIEW = 'list view';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.NewToggleView = this.NewToggleView.bind(this);

    this.state = {
      visibility: false
    };
  }

  NewToggleView() {
    this.setState(prevState => {
      return {
        visibility: !prevState.visibility
      };
    });
  }

  render() {
    const { state } = this;

    return (
      <>
        <MainHeader />

        <div className={`wmnds-grid ${s.container} wmnds-grid--justify-between wmnds-grid--justify-center`}>
          <h1 className={`${s.title} wmnds-col-1 wmnds-col-sm-auto`}>{TITLE}</h1>

          <div className={`${s.btnContainer} wmnds-col-1 wmnds-col-sm-auto`}>
            <Button
              btnClass="wmnds-btn--secondary wmnds-float--right"
              onClick={this.NewToggleView}
              iconRight="general-chevron-right"
            >
              {this.visibility ? LIST_VIEW : MAP_VIEW}
            </Button>
          </div>
        </div>
        {state.visibility && (
          <div>
            <NewListView />
          </div>
        )}
      </>
    );
  }
}

// Header.propTypes = {
//   viewMode: PropTypes.string,
//   SetViewMode: PropTypes.func
// };

Header.defaultProps = {
  viewMode: MAP_VIEW,
  SetViewMode: () => {}
};

const mapStateToProps = state => {
  const { app } = state || {};
  const { viewMode } = app || {};

  return {
    viewMode: viewMode || ''
  };
};

const mapDispatchToProps = dispatch => {
  const { SetViewMode } = a || {};
  return {
    SetViewMode: data => dispatch(SetViewMode(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
