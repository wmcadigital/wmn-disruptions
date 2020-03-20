import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FetchDisruptionsContext } from 'globalState';
// Import components
import Button from 'components/shared/Button/Button';
// Import styles
import s from './Header.module.scss';

const Header = ({ isMapVisible }) => {
  const [fetchDisruptionState, setFetchDisruptionsState] = useContext(FetchDisruptionsContext);

  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className="wmnds-breadcrumb wmnds-breadcrumb--mobile-app wmnds-container"
      >
        <ol className="wmnds-breadcrumb__list">
          <li className="wmnds-breadcrumb__list-item">
            <a href="//wmnetwork.co.uk" className="wmnds-breadcrumb__link">
              Home
            </a>
          </li>
          <li className="wmnds-breadcrumb__list-item">
            <a
              href="/components/breadcrumb/"
              className="wmnds-breadcrumb__link wmnds-breadcrumb__link--current"
              aria-current="page"
            >
              Disruptions
            </a>
          </li>
        </ol>
      </nav>
      <div className="wmnds-container">
        <div className="wmnds-grid wmnds-grid--justify-between wmnds-grid--align-middle wmnds-p-b-sm wmnds-p-t-sm">
          <h1 className={`wmnds-col-auto wmnds-m-b-none ${s.h1}`}>Disruptions</h1>

          <div className="wmnds-col-auto">
            <Button
              btnClass={`wmnds-btn--secondary wmnds-float--right ${s.listMapBtn}`}
              onClick={() =>
                setFetchDisruptionsState(prevState => ({
                  ...prevState,
                  isMapVisible: !isMapVisible
                }))
              }
              iconRight="general-chevron-right"
              text={fetchDisruptionState.isMapVisible ? 'List View' : 'Map View'}
            />
          </div>
        </div>
      </div>
    </>
  );
};

// Set props
Header.propTypes = {
  isMapVisible: PropTypes.bool.isRequired
};

export default Header;
