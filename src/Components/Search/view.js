// Import packages
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import BusInfo from '../Bus/BusInfo';
import NewBusses from '../Bus/NewBusses';
import { connect } from 'react-redux';

// Import components
import AutoComplete from '../../../form/AutoComplete/AutoComplete';
import SelectedResult from './components/SelectedResult/SelectedResult';

// Import consts
import { SEARCH_PLACEHOLDER } from './data';
// Import consts
//import { BUS } from './data';

// Import styles
import s from './Search.module.scss';

// Define consts
const MAP_VIEW = 'list view';

const SearchView = props => {
  const { resultSelected, searchPhrase, results, isOpen, search, viewMode, modeToCheck } = props;

  const mapView = viewMode === MAP_VIEW;

  // const busActive = modeToCheck === BUS;

  // if (modeToCheck === BUS ) {
  //     console.log('Show Bus Info Now - New', );
  // }

  return (
    <div className={`wmnds-grid ${s.container}`}>
      <div className="wmnds-col-1">
        {!resultSelected ? (
          <>
            <AutoComplete
              onMouseDown={e => e.stopPropagation()}
              onChange={e => search(e)}
              placeholder={SEARCH_PLACEHOLDER}
              value={searchPhrase}
            />
            <div className={`${s.resultsContainer} ${isOpen && !mapView ? s.isOpen : null}`}>
              {!mapView ? results : null}
            </div>
          </>
        ) : (
          <SelectedResult />
        )}

        <NewBusses />

        <div className="transport-info">
          <BusInfo />
        </div>
      </div>
    </div>
  );
};

SearchView.propTypes = {
  resultSelected: PropTypes.string,
  searchPhrase: PropTypes.string,
  // results: PropTypes.objectOf(
  //     oneOfType([
  //         PropTypes.string,
  //         PropTypes.bool,
  //         PropTypes.number
  //     ])
  // ),
  isOpen: PropTypes.bool,
  search: PropTypes.func
};

SearchView.defaultProps = {
  resultSelected: '',
  searchPhrase: '',
  results: {},
  isOpen: false,
  search: () => {}
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

export default connect(mapStateToProps)(SearchView);
