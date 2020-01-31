import React from 'react';
import PropTypes from 'prop-types';

// Import components
import Button from 'Components/Button/Button';
// Import styles
import s from './Header.module.scss';

const Header = ({ isMapVisible, setIsMapVisible }) => {
  return (
    <div className="wmnds-container">
      <div className="wmnds-grid wmnds-grid--justify-between wmnds-grid--align-middle wmnds-p-b-sm wmnds-p-t-sm">
        <h1 className={`wmnds-col-auto wmnds-m-b-sm ${s.h1}`}>Disruptions</h1>

        <div className="wmnds-col-auto">
          <Button
            btnClass={`wmnds-btn--secondary wmnds-float--right ${s.listMapBtn}`}
            onClick={() => setIsMapVisible(!isMapVisible)}
            iconRight="general-chevron-right"
            text={isMapVisible ? 'List View' : 'Map View'}
          />
        </div>
      </div>
    </div>
  );
};

// Set props
Header.propTypes = {
  isMapVisible: PropTypes.bool.isRequired,
  setIsMapVisible: PropTypes.func.isRequired
};

export default Header;
