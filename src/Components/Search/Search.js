// Import packages
import React from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import { connect } from 'react-redux';

// Import components
import SearchView from './view';
import SearchResult from './components/SearchResult/SearchResult';

// Import actions
import * as a from './actions';

// Import styles
import s from './Search.module.scss';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.HandleResultClick = this.HandleResultClick.bind(this);
    this.Search = this.Search.bind(this);
  }

  HandleResultClick(e) {
    const { props } = this;
    const { ChooseResult } = props || {};

    ChooseResult(e);
  }

  Search(e) {
    const { props } = this;
    const { modeToCheck, FetchResults } = props || {};
    let data = {
      results: [],
      modeToCheck,
      searchPhrase: e
    };

    FetchResults(data);
  }

  render() {
    const { props, HandleResultClick, Search } = this;
    const { searchPhrase, resultSelected, favourites, results } = props || {};
    const isOpen = searchPhrase.length >= 1 || resultSelected;
    let newResults;

    if (results !== undefined) {
      if (results.length > 0) {
        newResults = results.map((result, i) => {
          const { service } = result;
          const isFav = favourites.indexOf(service) > -1;

          return (
            <SearchResult key={`result-${i}`} searchResult={result} onClick={e => HandleResultClick(e)} isFav={isFav} />
          );
        });
      } else {
        newResults = (
          <span className={s.noResults}>
            <strong>Sorry, no results found</strong>
          </span>
        );
      }
    }

    return <SearchView isOpen={isOpen} results={newResults} search={Search} />;
  }
}

Search.propTypes = {
  Search: PropTypes.func,
  ChooseResult: PropTypes.func,
  results: PropTypes.arrayOf(
    PropTypes.objectOf(
      oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number, PropTypes.arrayOf(PropTypes.any)])
    )
  ),
  modeToCheck: PropTypes.string,
  timeToCheck: PropTypes.string
};

Search.defaultProps = {
  Search: () => {},
  ChooseResult: () => {},
  modeToCheck: '',
  timeToCheck: '',
  results: []
};

const mapStateToProps = state => {
  const { search, time, mode } = state || {};
  const { searchPhrase, results, resultSelected, favourites } = search || {};
  const { timeToCheck } = time || {};
  const { modeToCheck } = mode || {};
  return {
    searchPhrase: searchPhrase || '',
    results: results || {},
    resultSelected: resultSelected || false,
    favourites: favourites || {},
    modeToCheck: modeToCheck || '',
    timeToCheck: timeToCheck || ''
  };
};

const mapDispatchToProps = dispatch => {
  const { ChooseResult, FetchResults } = a || {};
  return {
    ChooseResult: data => dispatch(ChooseResult(data)),
    FetchResults: data => dispatch(FetchResults(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
