import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import dompurify from 'dompurify';
// Import contexts
import { AutoCompleteContext, FetchDisruptionsContext, ModeContext } from 'globalState';
// Import Helper functions
import { setSearchParam } from 'globalState/helpers/URLSearchParams'; // (used to sync state with URL)
// Imported components
import Button from 'components/shared/Button/Button';
import Icon from 'components/shared/Icon/Icon';
import ShareButtons from './ShareButtons/ShareButtons';
// Import styles
import s from './DisruptionInfo.module.scss';

const { sanitize } = dompurify;

const DisruptionInfo = ({ disruption }) => {
  const [, autoCompleteDispatch] = useContext(AutoCompleteContext); // Get the dispatch of autocomplete
  const [modeState] = useContext(ModeContext); // Get the dispatch of autocomplete
  const [fetchDisruptionsState, setFetchDisruptionsState] = useContext(FetchDisruptionsContext); // Get the state and dispatch of disruptions (contains isMapVisible)
  const { isMapVisible } = fetchDisruptionsState;

  const handleViewOnMapBtn = () => {
    // Reset stored autocomplete data
    autoCompleteDispatch({
      type: 'RESET_SELECTED_SERVICES',
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

  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const createDateString = (rawDate) => {
    const date = new Date(rawDate);
    return `${date.toLocaleDateString(undefined, dateOptions)}`;
  };

  // Promoter organisation
  const showPromoterOrganisation =
    disruption.description &&
    modeState.mode === 'roads' &&
    disruption.id.charAt(0).toLowerCase() === 'p';

  return (
    <>
      {/* Disruption description */}

      {disruption.description && !showPromoterOrganisation && (
        <div
          className="wmnds-m-b-lg wmnds-col-1"
          dangerouslySetInnerHTML={{
            // Remove 'style' attributes from any descriptions
            __html: sanitize(disruption.description, { FORBID_ATTR: ['style'] }),
          }}
        />
      )}

      {/* Carried out by (only for roads) */}
      {showPromoterOrganisation && (
        <div className="wmnds-m-b-lg wmnds-col-1">
          <strong>Carried out by</strong>
          <p className={`${s.promoterOrganisation} wmnds-m-b-none`}>
            {disruption.description.toLowerCase()}
          </p>
        </div>
      )}

      {/* When (only for roads) */}
      {modeState.mode === 'roads' && disruption.disruptionTimeWindow && (
        <div className="wmnds-col-1">
          <p>
            <strong>When?</strong>
            <br />
            {createDateString(disruption.disruptionTimeWindow.start)} to{' '}
            {createDateString(disruption.disruptionTimeWindow.end)}
          </p>
        </div>
      )}

      {/* Replan button */}
      <span className={`wmnds-col-1 ${isMapVisible ? s.mapBtn : `${s.listBtn} wmnds-col-sm-1-2`}`}>
        <a
          className="wmnds-btn wmnds-btn--start wmnds-col-1"
          href="https://journeyplanner.tfwm.org.uk"
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
};

export default DisruptionInfo;
