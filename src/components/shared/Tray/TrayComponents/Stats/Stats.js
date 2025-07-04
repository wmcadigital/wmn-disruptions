import React from 'react';
// CustomHooks
import useResetState from 'customHooks/useResetState';
import useFilterLogic from 'customHooks/useFilterLogic';
// Import components
import { useDisruptionCoordinates } from 'globalState/DisruptionCoordinatesContext';

function Stats() {
  const { modeState } = useResetState();
  const { setDisruptionCoordinates } = useDisruptionCoordinates();

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

  if (disruptionsCount === 0) return null;

  return (
    <div className="wmnds-grid wmnds-m-t-lg">
      <div className="wmnds-col-1">
        <p>
          There {disruptionsCount === 1 ? 'is' : 'are'} <strong>{disruptionsCount}</strong> {mode}{' '}
          disruption
          {disruptionsCount === 1 ? '' : 's'}
        </p>
        <p>
          There {disruptionCoordinates === 1 ? 'is' : 'are'}{' '}
          <strong>{disruptionCoordinates}</strong> disruption point
          {disruptionCoordinates === 1 ? '' : 's'} on the map.
        </p>
        {disruptionCoordinates === 0 && (
          <div className="wmnds-msg-summary wmnds-msg-summary--info ">
            <div className="wmnds-msg-summary__header">
              <svg className="wmnds-msg-summary__icon">
                <use xlinkHref="#wmnds-general-info" href="#wmnds-general-info" />
              </svg>
              <h3 className="wmnds-msg-summary__title">No disruptions on map view</h3>
            </div>
            <div className="wmnds-msg-summary__info">
              There are no disruptions to show on this Map view but there{' '}
              {disruptionsCount === 1 ? 'is' : 'are'} <strong>{disruptionsCount}</strong> {mode}{' '}
              disruption
              {disruptionsCount === 1 ? '' : 's'} on the List view.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Stats;
