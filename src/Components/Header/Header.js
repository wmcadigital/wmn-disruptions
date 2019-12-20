// Import packages
import React from 'react';
import { connect } from 'react-redux';
import MainHeader from '../MainHeader/MainHeader';

// Import components
import Button from '../Button/Button';

// New List View
import NewListView from '../NewListViews/NewListView';

// Import actions
import * as a from '../../redux/actions';

// Import consts
import { TITLE } from './data';

// Import style
import s from './Header.module.scss';

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
        <div className={`wmnds-grid wmnds-grid--justify-between ${s.container}`}>
          <h1 className={`${s.title} wmnds-col-1 wmnds-col-sm-auto`}>{TITLE}</h1>

          <div className={`${s.btnContainer} wmnds-col-1 wmnds-col-sm-auto`}>
            <Button
              btnClass="wmnds-btn--secondary wmnds-float--right"
              onClick={this.NewToggleView}
              iconRight="general-chevron-right"
              text={state.visibility ? 'Map View' : 'List View'}
            />
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
