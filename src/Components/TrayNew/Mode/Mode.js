import React from 'react';

// Import components
import Button from '../../Button/Button';

const Mode = () => {
  return (
    <>
      <div className="wmnds-col-1">
        <h4>Select a mode of travel</h4>
      </div>
      {/* Bus mode button */}
      <Button
        btnClass="wmnds-btn--small wmnds-btn--mode wmnds-col-auto wmnds-m-r-sm wmnds-m-b-sm"
        // onClick={''}
        iconLeft="modes-isolated-bus"
        text="Bus"
      />
      {/* Train mode button */}
      <Button
        btnClass="wmnds-btn--small wmnds-btn--mode wmnds-col-auto wmnds-m-r-sm wmnds-m-b-sm"
        // onClick={''}
        iconLeft="modes-isolated-rail"
        text="Train"
      />
      {/* Tram mode button */}
      <Button
        btnClass="wmnds-btn--small wmnds-btn--mode wmnds-col-auto wmnds-m-r-sm wmnds-m-b-sm"
        // onClick={''}
        iconLeft="modes-isolated-metro"
        text="Tram"
      />
      {/* Roads mode button */}
      <Button
        btnClass="wmnds-btn--small wmnds-btn--mode wmnds-col-auto wmnds-m-b-sm"
        // onClick={''}
        iconLeft="modes-isolated-roads"
        text="Roads"
      />
    </>
  );
};

export default Mode;
