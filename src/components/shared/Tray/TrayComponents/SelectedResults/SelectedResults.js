import React, { useContext } from 'react';
import { AutoCompleteContext, FetchDisruptionsContext } from 'globalState';

import Icon from 'components/shared/Icon/Icon';
import DisruptionIndicatorMedium from 'components/shared/DisruptionIndicator/DisruptionIndicatorMedium';
import SelectedItem from './SelectedItem/SelectedItem';

import s from './SelectedResults.module.scss';

const SelectedResults = () => {
  const [fetchDisruptionsState] = useContext(FetchDisruptionsContext);
  const [autoCompleteState, autoCompleteDispatch] = useContext(AutoCompleteContext);

  const { selectedService } = autoCompleteState;
  // The below will check all disruptions and will return any disruption where the mode is bus and the id the user clicked in the autocomplete is within the servicesAffected array
  const selectedData = fetchDisruptionsState.data.filter(disrItem => {
    return (
      disrItem.mode === 'bus' && disrItem.servicesAffected.some(el => el.id === selectedService.id)
    );
  });

  return (
    <>
      <div
        className={`wmnds-grid wmnds-grid--align-center wmnds-m-t-xs wmnds-m-b-md ${s.selectedItemBox}`}
      >
        <div className="wmnds-col-auto wmnds-m-r-md">
          <DisruptionIndicatorMedium
            severity={selectedService.severity}
            text={selectedService.serviceNumber}
          />
        </div>
        <div className={`wmnds-col-auto ${s.selectedSummary}`}>
          <strong>{selectedService.routeName}</strong>
        </div>
        <button
          type="button"
          className={`${s.cancelButton} wmnds-col-auto`}
          onClick={() => autoCompleteDispatch({ type: 'RESET_SELECTED_SERVICE' })}
        >
          <Icon iconName="general-cross" iconClass={`general-cross ${s.cancelIcon}`} />
        </button>
      </div>
      <div className="wmnds-msg-help wmnds-col-1">
        Save routes to your homepage by pressing the star icon
      </div>
      {/* If no selectedData then it must be good service */}
      {!selectedData.length && (
        <div className="wmnds-msg-summary wmnds-msg-summary--success wmnds-col-1">
          <div className="wmnds-msg-summary__header">
            <Icon iconName="general-success" iconClass="wmnds-msg-summary__icon" />
            <h3 className="wmnds-msg-summary__title">Good service</h3>
          </div>

          <div className="wmnds-msg-summary__info">No incidents reported.</div>
        </div>
      )}
      {/* If there are selectedData then there must be disruptions, loop through */}
      {selectedData.length > 0 &&
        selectedData.map(disruption => (
          <SelectedItem disruption={disruption} key={disruption.id} />
        ))}
    </>
  );
};

export default SelectedResults;
