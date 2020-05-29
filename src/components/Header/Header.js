import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// Import contexts
import { FetchDisruptionsContext } from 'globalState';
// Import components
import Button from 'components/shared/Button/Button';
// Import Helper functions
import { setSearchParam } from 'globalState/helpers/URLSearchParams'; // (used to sync state with URL)
// Import styles
import s from './Header.module.scss';

const Header = ({ isFetching, hasError }) => {
  const [fetchDisruptionState, setFetchDisruptionsState] = useContext(FetchDisruptionsContext);

  const handleClick = () => {
    // Update the state of the isMapVisible to opposite of what it was
    setFetchDisruptionsState((prevState) => ({
      ...prevState,
      isMapVisible: !prevState.isMapVisible,
    }));
    // Update URL param to opposite of what it was
    setSearchParam('isMapVisible', !fetchDisruptionState.isMapVisible);
  };

  return (
    <div className={`wmnds-container ${s.headerWrapper}`}>
      <nav aria-label="Breadcrumb" className="wmnds-breadcrumb wmnds-breadcrumb--mobile-app">
        <ol className="wmnds-breadcrumb__list">
          <li className="wmnds-breadcrumb__list-item">
            <a href="//wmnetwork.co.uk" className="wmnds-breadcrumb__link">
              Home
            </a>
          </li>
          <li className="wmnds-breadcrumb__list-item">
            <a
              href="/"
              className="wmnds-breadcrumb__link wmnds-breadcrumb__link--current"
              aria-current="page"
            >
              Disruptions
            </a>
          </li>
        </ol>
      </nav>
      <div className="wmnds-grid wmnds-grid--justify-between wmnds-grid--align-middle wmnds-p-b-sm wmnds-p-t-sm">
        <h1 className={`wmnds-col-auto wmnds-m-b-none ${s.h1}`}>Disruptions</h1>

        {/* Map/list view button should only show if no error and API has finished fetching */}
        {!isFetching && !hasError && (
          <div className="wmnds-col-auto">
            <Button
              btnClass={`wmnds-btn--secondary wmnds-float--right ${s.listMapBtn}`}
              onClick={handleClick}
              iconRight="general-chevron-right"
              text={fetchDisruptionState.isMapVisible ? 'List View' : 'Map View'}
            />
          </div>
        )}
      </div>
    </div>
  );
};

Header.propTypes = {
  hasError: PropTypes.bool,
  isFetching: PropTypes.bool.isRequired,
};

Header.defaultProps = {
  hasError: false,
};

export default Header;
