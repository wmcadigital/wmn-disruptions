// Import packages
import React, { Component } from 'react';
import MainHeader from '../MainHeader/MainHeader';

// Import components
import Button from '../Button/Button';

// New List View
import NewListView from '../NewListViews/NewListView';

// Import style
import s from './Header.module.scss';

class Header extends Component {
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
      <div>
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
      </div>
    );
  }
}

export default Header;
