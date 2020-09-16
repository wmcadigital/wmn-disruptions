import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import dompurify from 'dompurify';
// Import contexts
import { AutoCompleteContext, FetchDisruptionsContext } from 'globalState';
// Import Helper functions
import { setSearchParam } from 'globalState/helpers/URLSearchParams'; // (used to sync state with URL)
// Imported components
import FavBusButton from 'components/shared/FavButtons/FavBusButton/FavBusButton';
import Button from 'components/shared/Button/Button';
import Icon from 'components/shared/Icon/Icon';
import ShareButtons from './ShareButtons/ShareButtons';
// Import styles
import s from './DisruptionInfo.module.scss';

const { sanitize } = dompurify;

const DisruptionInfo = ({ disruption, listView }) => {
  const [, autoCompleteDispatch] = useContext(AutoCompleteContext); // Get the dispatch of autocomplete
  const [fetchDisruptionsState, setFetchDisruptionsState] = useContext(FetchDisruptionsContext); // Get the state and dispatch of disruptions (contains isMapVisible)
  const { isMapVisible } = fetchDisruptionsState;

  const handleViewOnMapBtn = () => {
    // Reset stored autocomplete data
    autoCompleteDispatch({
      type: 'RESET_SELECTED_SERVICE',
    });
    // Update API for selected API
    autoCompleteDispatch({
      type: 'UDPATE_SELECTED_ITEM',
      payload: { id: disruption.id, selectedByMap: true },
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
            <strong>Affected {disruption.mode !== 'tram' ? 'Services' : 'Stops'}:</strong>
          </div>
          <div className="wmnds-col-1">
            {disruption.servicesAffected &&
              disruption.mode === 'bus' &&
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
                    mode={disruption.mode}
                    key={affected.id}
                  />
                ))}

            {disruption.servicesAffected &&
              disruption.mode === 'tram' &&
              disruption.stopsAffected
                .sort((a, b) => a.name.replace(/\D/g, '') - b.name.replace(/\D/g, ''))
                .map((affected) => (
                  <FavBusButton
                    id={affected.atcoCode}
                    severity={disruption.disruptionSeverity}
                    text={affected.name}
                    title={`${disruption.servicesAffected[0].routeDescriptions[0].description} (${disruption.servicesAffected[0].operatorName})`}
                    mode={disruption.mode}
                    key={affected.atcoCode}
                  />
                ))}
          </div>
        </>
      )}

      {/* Disruption description */}

      {disruption.mode !== 'tram' ? (
        <div
          className="wmnds-m-b-lg wmnds-col-1"
          dangerouslySetInnerHTML={{
            __html: sanitize(disruption.description),
          }}
        />
      ) : (
        <div className="wmnds-m-b-lg wmnds-col-1">
          {disruption.subtitle}
          <br />
          <br />
          <a
            href={disruption.description}
            className="wmnds-link wmnds-col-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read more about this disruption on twitter
          </a>
        </div>
      )}

      {/* Replan button */}
      <span className={`wmnds-col-1 ${isMapVisible ? s.mapBtn : `${s.listBtn} wmnds-col-sm-1-2`}`}>
        <a
          className="wmnds-btn wmnds-btn--start wmnds-col-1"
          href="https://journeyplanner.networkwestmidlands.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Replan journey
          <Icon
            iconName="general-chevron-right"
            iconClass="wmnds-btn__icon wmnds-btn__icon--right"
          />
        </a>
      </span>

      {/* Share button */}
      <ShareButtons isMapVisible={isMapVisible} disruption={disruption} />

      {/* View on map button */}
      {!isMapVisible && (
        <Button
          btnClass="wmnds-btn--secondary wmnds-col-1"
          text="View on map"
          onClick={handleViewOnMapBtn}
        />
      )}
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
