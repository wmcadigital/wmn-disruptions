import React, { useContext } from 'react';
// Import contexts
import { FetchDisruptionsContext, ModeContext } from 'globalState';
// CustomHooks
// import useResetState from 'customHooks/useResetState';
import useFilterLogic from 'customHooks/useFilterLogic';
// Import Helper functions
import { setSearchParam } from 'globalState/helpers/URLSearchParams'; // (used to sync state with URL)
// Import components
import { useDisruptionCoordinates } from 'globalState/DisruptionCoordinatesContext';
import { WhenContext } from 'globalState/WhenContext';
import Button from 'components/shared/Button/Button';

// Import styling
import s from './Stats.module.scss';

function Stats() {
  // Remove setFetchDisruptionsState from useDisruptionCoordinates
  const { setDisruptionCoordinates } = useDisruptionCoordinates();
  // Get setFetchDisruptionsState from FetchDisruptionsContext
  const [fetchDisruptionState, setFetchDisruptionsState] = useContext(FetchDisruptionsContext);
  const [whenState] = useContext(WhenContext);
  const [modeState] = useContext(ModeContext); // Get the state of modeButtons from modeContext

  const handleClick = () => {
    let isMapVisible;
    // Update the state of the isMapVisible to opposite of what it was
    setFetchDisruptionsState((prevState) => {
      isMapVisible = !prevState.isMapVisible;
      return {
        ...prevState,
        isMapVisible,
      };
    });
    // Update URL param to opposite of what it was
    setSearchParam('isMapVisible', isMapVisible);
    // Set the preference in localStorage
    const storageData = JSON.stringify({ isMapVisible });
    localStorage.setItem('disruptionsApp', storageData);
  };

  // Call useFilterLogic only once
  const filteredDisruptions = useFilterLogic();

  // Memoize disruptionsWithLat to avoid unnecessary updates
  const disruptionsWithLat = React.useMemo(
    () => filteredDisruptions.filter((item) => item.lat !== 0),
    [filteredDisruptions],
  );

  // Only update global state if disruptionsWithLat actually changes
  const prevDisruptionsRef = React.useRef([]);
  React.useEffect(() => {
    const prev = prevDisruptionsRef.current;
    const curr = disruptionsWithLat;
    // Compare lengths and stringified content for shallow equality
    if (prev.length !== curr.length || JSON.stringify(prev) !== JSON.stringify(curr)) {
      setDisruptionCoordinates(curr);
      prevDisruptionsRef.current = curr;
    }
  }, [disruptionsWithLat, setDisruptionCoordinates]);

  const disruptionsCount = filteredDisruptions.length;
  const disruptionCoordinates = disruptionsWithLat.length;
  const { mode } = modeState;

  // Only show if disruptionsCount - disruptionCoordinates !== 0
  if (disruptionsCount - disruptionCoordinates === 0) return null;

  return (
    <>
      {disruptionCoordinates === 0 && (
        <div className="wmnds-grid wmnds-m-t-lg">
          <div className="wmnds-col-1">
            <div className="wmnds-msg-summary wmnds-msg-summary--info">
              <div className="wmnds-msg-summary__header">
                <svg className="wmnds-msg-summary__icon">
                  <use xlinkHref="#wmnds-general-info" href="#wmnds-general-info" />
                </svg>
                <h3 className="wmnds-msg-summary__title">
                  No disruptions available to display on the map.
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
      {disruptionCoordinates === 0 && (
        <div className="wmnds-grid wmnds-m-t-lg">
          <div className="wmnds-col-1">
            {/* <p>{disruptionCoordinates} disruptions with coordinates</p>
            <p>{disruptionsCount} disruptions in total</p> */}
            <div className="wmnds-msg-summary wmnds-msg-summary--info">
              <div className="wmnds-msg-summary__header">
                <svg className="wmnds-msg-summary__icon">
                  <use xlinkHref="#wmnds-general-info" href="#wmnds-general-info" />
                </svg>
                <h3 className="wmnds-msg-summary__title">
                  {disruptionsCount} {disruptionsCount <= 1 ? 'disruption' : 'disruptions'}{' '}
                  {whenState.when === 'now' ? 'now' : ''}{' '}
                  {whenState.when === 'tomorrow' ? 'tomorrow' : ''}
                </h3>
              </div>
              <div className="wmnds-msg-summary__info">
                {fetchDisruptionState.isMapVisible && (
                  <>
                    There {disruptionCoordinates === 1 ? 'is' : 'are'}{' '}
                    <strong>{disruptionCoordinates}</strong> {mode} disruption
                    {disruptionCoordinates === 1 ? '' : 's'} available on the map view
                    {disruptionsCount - disruptionCoordinates > 0 && (
                      <>
                        {' and '}
                        <strong>{disruptionsCount - disruptionCoordinates}</strong> disruptions
                        available on the{' '}
                        <Button
                          btnClass={`wmnds-btn wmnds-btn--link ${s.wmndsbtninline}`}
                          onClick={handleClick}
                          aria-label={
                            fetchDisruptionState.isMapVisible
                              ? 'Change to list view'
                              : 'Change to Map View'
                          }
                          text={fetchDisruptionState.isMapVisible ? 'List View' : 'Map View'}
                        />
                        .
                      </>
                    )}
                  </>
                )}
                {!fetchDisruptionState.isMapVisible && (
                  <>
                    There {disruptionsCount - disruptionCoordinates === 1 ? 'is' : 'are'}{' '}
                    <strong>
                      <strong>{disruptionsCount}</strong>
                    </strong>{' '}
                    {mode} disruption
                    {disruptionCoordinates === 1 ? '' : 's'} available on the list view
                    {disruptionsCount - disruptionCoordinates > 0 && (
                      <>
                        {' and '}
                        <strong>{disruptionCoordinates}</strong> disruptions available on the{' '}
                        <Button
                          btnClass={`wmnds-btn wmnds-btn--link ${s.wmndsbtninline}`}
                          onClick={handleClick}
                          aria-label={
                            fetchDisruptionState.isMapVisible
                              ? 'Change to list view'
                              : 'Change to Map View'
                          }
                          text={fetchDisruptionState.isMapVisible ? 'List View' : 'Map View'}
                        />
                        .
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Stats;
