import React from 'react';
import PropTypes from 'prop-types';

// Import components
import Button from 'Components/Button/Button';

const Header = ({ isMapVisible, setIsMapVisible }) => {
  return (
    <div className="wmnds-container">
      <div className="wmnds-grid wmnds-grid--justify-between wmnds-grid--align-middle">
        <div className="wmnds-col-sm-auto">
          <h1 className="wmnds-m-b-lg">Disruptions</h1>
        </div>
        <div className="wmnds-col-sm-auto">
          <Button
            btnClass="wmnds-btn--secondary wmnds-float--right"
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
