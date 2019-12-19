// Import packages
import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MainHeader from '../MainHeader/MainHeader';

// Import components
import Button from '../Button/Button';

// Import actions
import * as a from '../../redux/actions';

// Import consts
import { TITLE, BTN_LIST, BTN_MAP } from './data';

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
      <>
        <MainHeader />

        <div className={`wmnds-grid ${s.container} wmnds-grid--justify-between wmnds-grid--justify-center`}>
          <h1 className={`${s.title} wmnds-col-1 wmnds-col-sm-auto`}>{TITLE}</h1>

          <div className={`${s.btnContainer} wmnds-col-1 wmnds-col-sm-auto`}>
            <Button
              btnClass="wmnds-btn--secondary"
              onClick={() => ToggleViewMode()}
              iconRight="general-chevron-right"
              text={listView ? BTN_MAP : BTN_LIST}
            />
          </div>
        </div>
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
