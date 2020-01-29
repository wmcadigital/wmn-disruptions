// Import packages
import React from 'react';
import Draggable from 'react-draggable';
import { connect } from 'react-redux';

// Import components
import When from './When/When';
import ModeExtended from './Mode/ModeExtended';

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
      <div className="wmnds-grid gutters">
        <div className="wmnds-col-1">
          <div className={s.bar} />
        </div>
      </div>
      <When />

      <ModeExtended />
    </div>
  );
  const mobTray = (
    <Draggable axis="y" bounds={{ top: -150, bottom: 0 }} defaultPosition={{y:0}}>
      {tray}
    </Draggable>
  );
  return <>{isMob ? mobTray : tray}</>;
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
