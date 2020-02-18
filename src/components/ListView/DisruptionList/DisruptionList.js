import React, { useContext } from 'react';
import Icon from 'components/shared/Icon/Icon';

// Import contexts
import { ModeContext } from 'globalState';
import useFilterLogic from 'customHooks/useFilterLogic';
import DisruptionItem from './DisruptionItem/DisruptionItem';

const DisruptionList = () => {
  const [modeState] = useContext(ModeContext); // Get the state of whenButtons from WhenContext

  const filteredData = useFilterLogic(); // Use filter logic based on tray selections

  return (
    <>
      {filteredData.length ? (
        filteredData.map(disruption => (
          <DisruptionItem disruption={disruption} key={disruption.id} />
        ))
      ) : (
        <div className="wmnds-msg-summary wmnds-msg-summary--success wmnds-col-1">
          <div className="wmnds-msg-summary__header">
            <Icon iconName="general-success" iconClass="wmnds-msg-summary__icon" />
            <h3 className="wmnds-msg-summary__title">Good service</h3>
          </div>

          <div className="wmnds-msg-summary__info">
            {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
            No incidents reported on {modeState.mode ? modeState.mode : 'bus, train, tram or roads'}
            .
          </div>
        </div>
      )}
    </>
  );
};

export default DisruptionList;
