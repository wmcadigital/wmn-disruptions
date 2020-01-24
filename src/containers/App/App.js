// Import packages
import React from 'react';
// import PropTypes from 'prop-types'; // Commented out, as with the viewMode propType below
import { connect } from 'react-redux';

// Import components
import MainHeader from '../../Components/MainHeader/MainHeader';
import WebMapView from '../../Components/Map/Map';
import TrayNew from '../../Components/TrayNew/TrayNew';
import Breadcrumbs from '../../Components/Breadcrumbs/Breadcrumbs';

import NewListView from '../../Components/NewListViews/NewListView';
// Import components
import Button from '../../Components/Button/Button';

// Import actions
import * as a from '../../redux/actions';

// Import styles
import s from './App.scss';

// Define consts
const MAP_VIEW = 'map view';

class App extends React.Component {
  static IsMobileDevice() {
    return typeof window.orientation !== 'undefined' || navigator.userAgent.indexOf('IEMobile') !== -1;
  }

  constructor(props) {
    super(props);

    this.setWhen = this.setWhen.bind(this);
    this.NewToggleView = this.NewToggleView.bind(this);

    this.state = {
      visibility: false,
      when: '',
      mode: ''
    };
  }

  componentDidMount() {
    const { props } = this;
    const { SetViewMode } = props || {};

    App.IsMobileDevice();

    SetViewMode(MAP_VIEW);
  }

  setWhen(val) {
    console.log(val);
    this.setState({
      when: val
    });
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
      <div className={`{s.app} header`}>
        <MainHeader />
        <Breadcrumbs />
        <div className={`wmnds-grid wmnds-grid--justify-between ${s.container}`}>
          <h1 className={`${s.title} wmnds-col-1 wmnds-col-sm-auto`}>Disruptions</h1>

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

        {!state.visibility && (
          <div>
            <WebMapView />
          </div>
        )}

        <TrayNew when={state.when} mode={state.mode} setWhen={this.setWhen} />
      </div>
    );
  }
}

// Commented out as viewMode isn't being used (yet)
// App.propTypes = {
//   viewMode: PropTypes.string
// };

// App.defaultProps = {
//   viewMode: MAP_VIEW
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
