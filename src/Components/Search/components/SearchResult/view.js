// Import packages
import React from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import { connect } from 'react-redux';

// Import components
import ResultIcon from '../../../ResultIcon/ResultIcon';

// Import styles
import s from './SearchResult.module.scss';

// Import consts
import {
  FAV_CLASS,
  BUS,
  TRAIN,
  TRAM
  // ROADS,
  // DISRUPTION
} from '../../data';

const SearchResultView = props => {
  const { toggleFav, searchResult, favourites, SelectResult, modeToCheck } = props || {};
  const { id } = searchResult;
  let details;

  switch (modeToCheck) {
    case BUS:
      const { routeDesc, serviceNumber } = searchResult || {};

      details = (
        <div className={s.detailsWrapper}>
          <span>
            <strong>{serviceNumber}</strong>
          </span>
          &nbsp;
          <span>{routeDesc}</span>
        </div>
      );
      break;
    case TRAIN:
      const { stationName } = searchResult || {};

      details = (
        <div className={s.detailsWrapper}>
          <span>
            <strong>{stationName}</strong>
          </span>
        </div>
      );
      break;
    case TRAM:
      const { stopName, routeDesc: rd } = searchResult || {};

      details = (
        <div className={s.detailsWrapper}>
          <span>
            <strong>{stopName}</strong>
          </span>
          &nbsp;
          <span>{rd}</span>
        </div>
      );
      break;
    default:
      break;
  }
  const isFav = favourites.indexOf(id) > -1;

  return (
    <div className={s.container} onClick={SelectResult}>
      <div className={s.iconWrapper}>
        <ResultIcon searchResult={searchResult} />
      </div>
      {details}
      <div className={s.favWrapper}>
        <i className={`${isFav ? `fas fa-star` : `far fa-star`} ${FAV_CLASS}`} onClick={toggleFav} />
      </div>
    </div>
  );
};

SearchResultView.propTypes = {
  searchResult: PropTypes.objectOf(oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number])),
  favourites: PropTypes.arrayOf(PropTypes.objectOf(oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number])))
};

SearchResultView.defaultProps = {
  searchResult: {}
};

const mapStateToProps = state => {
  const { search, mode } = state || {};
  const { favourites } = search || {};
  const { modeToCheck } = mode || {};

  return {
    favourites: favourites || {},
    modeToCheck: modeToCheck || ''
  };
};

export default connect(mapStateToProps)(SearchResultView);
