// Import packages
import React from 'react';
// import PropTypes from 'prop-types'; // Commented out, as with the viewMode propType below
import { connect } from 'react-redux';

// Import components
import Header from '../../Components/Header/Header';
import Map from '../../Components/Map/Map';
import Tray from '../../Components/Tray/Tray';

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

  componentDidMount() {
    const { props } = this;
    const { SetViewMode } = props || {};

    App.IsMobileDevice();

    SetViewMode(MAP_VIEW);
  }

  render() {
    return (
      <div className={s.app}>
        <Header />
        <Map />
        <Tray />
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
