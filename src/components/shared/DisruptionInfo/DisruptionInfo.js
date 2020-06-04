import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import dompurify from 'dompurify';
// Import contexts
import { AutoCompleteContext, FetchDisruptionsContext } from 'globalState';
// Imported components
import FavBusButton from 'components/shared/FavButtons/FavBusButton/FavBusButton';
import Button from 'components/shared/Button/Button';
import Icon from 'components/shared/Icon/Icon';
// Import Helper functions
import { setSearchParam } from 'globalState/helpers/URLSearchParams'; // (used to sync state with URL)

const { sanitize } = dompurify;

const DisruptionInfo = ({ disruption, listView }) => {
  const [, autoCompleteDispatch] = useContext(AutoCompleteContext); // Get the dispatch of autocomplete
  const [fetchDisruptionsState, setFetchDisruptionsState] = useContext(FetchDisruptionsContext); // Get the state and dispatch of disruptions (contains isMapVisible)

  const handleViewOnMapBtn = () => {
    autoCompleteDispatch({
      type: 'UDPATE_SELECTED_MAP_DISRUPTION',
      selectedMapDisruption: disruption.id,
    });
    // Update the state of the isMapVisible to opposite of what it was
    setFetchDisruptionsState((prevState) => ({
      ...prevState,
      isMapVisible: true,
    }));
    // Update URL param to opposite of what it was
    setSearchParam('isMapVisible', true);
  };

  return (
    <>
      {/* If it's listView, then we don't want to show the affectedServices/favs as it's shown in accordion header */}
      {!listView && (
        <>
          {/* Affected Services */}
          <div className="wmnds-col-1 ">
            <strong>Affected Services:</strong>
          </div>
          <div className="wmnds-col-1">
            {disruption.servicesAffected &&
              disruption.servicesAffected
                .sort(
                  (a, b) => a.serviceNumber.replace(/\D/g, '') - b.serviceNumber.replace(/\D/g, '')
                )
                .map((affected) => (
                  <FavBusButton
                    id={affected.id}
                    severity={disruption.disruptionSeverity}
                    text={affected.serviceNumber}
                    title={`${affected.routeDescriptions[0].description} (${affected.operatorName})`}
                    key={affected.id}
                  />
                ))}
          </div>
        </>
      )}

      {/* View on map button */}
      {!fetchDisruptionsState.isMapVisible && (
        <Button
          btnClass="wmnds-btn--secondary wmnds-float-right"
          text="View on map"
          onClick={handleViewOnMapBtn}
        />
      )}

      {/* Disruption description */}
      <div
        className="wmnds-m-b-lg wmnds-col-1 wmnds-col-md-3-4"
        dangerouslySetInnerHTML={{
          __html: sanitize(disruption.description),
        }}
      />
      {/* Replan button */}
      <a
        className="wmnds-btn wmnds-btn--start wmnds-col-1 wmnds-m-b-md"
        href="https://journeyplanner.networkwestmidlands.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Replan your journey
        <Icon iconName="general-chevron-right" iconClass="wmnds-btn__icon wmnds-btn__icon--right" />
      </a>
      {/* Share button */}
      <Button btnClass="wmnds-col-1" text="Share disruption" iconRight="general-share" />
    </>
  );
};

// PropTypes
DisruptionInfo.propTypes = {
  disruption: PropTypes.objectOf(PropTypes.any).isRequired,
  listView: PropTypes.bool,
};

// Default props
DisruptionInfo.defaultProps = {
  listView: false,
};

export default DisruptionInfo;
