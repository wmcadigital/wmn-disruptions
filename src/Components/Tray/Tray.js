// Import packages
import React from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import { connect } from 'react-redux';

// Import components
import When from './When/When';
import Mode from './Mode/Mode';
// import Search from './Search/Search';
import AutoComplete from './AutoComplete/AutoComplete';
// import Bus from './Bus/Bus';
// import Train from './Train/Train';
// import SingleBus from './Bus/SingleBus';

// Import styles
import s from './Tray.module.scss';

// Define consts
const MAP_VIEW = 'map view';
const LIST_VIEW = 'list view';

const Tray = props => {
  const { searchPhrase, viewMode } = props || {};
  const w = window.innerWidth;
  const mobBreakpoint = 568;
  const isMob = w <= mobBreakpoint;
  const searchOpen = searchPhrase.length >= 1;
  const listView = viewMode === LIST_VIEW;
  const tray = (
    <div
      className={`
            ${s.tray}
            ${searchOpen && isMob ? s.searchOpen : s.searchClosed}
            ${listView ? s.listView : ''}`}
    >
      <div className="pure-g gutters">
        <div className="wmnds-col-1">
          <div className={s.bar} />
        </div>
      </div>
      <When />
      <Mode />

      <div className="autoCompleteNew">
        <AutoComplete />
      </div>
    </div>
  );
  const mobTray = (
    <Draggable axis="y" bounds={{ top: -150, bottom: 0 }}>
      {tray}
    </Draggable>
  );
  return <>{isMob ? mobTray : tray}</>;
};

Tray.propTypes = {
  searchPhrase: PropTypes.string,
  viewMode: PropTypes.string
};

Tray.defaultProps = {
  searchPhrase: undefined,
  viewMode: MAP_VIEW
};

const mapStateToProps = state => {
  const { search, app } = state || {};
  const { searchPhrase } = search || {};
  const { viewMode } = app || {};
  return {
    searchPhrase: searchPhrase || '',
    viewMode: viewMode || ''
  };
};

export default connect(mapStateToProps)(Tray);
