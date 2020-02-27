import React, { useContext } from 'react';
import { AutoCompleteContext, FetchDisruptionsContext } from 'globalState';

import DisruptionIndicatorMedium from 'components/shared/DisruptionIndicator/DisruptionIndicatorMedium';
import useFilterLogic from 'customHooks/useFilterLogic';
import CloseButton from 'components/shared/CloseButton/CloseButton';
import SelectedItem from './SelectedItem/SelectedItem';

import s from './SelectedService.module.scss';
import GoodServiceMessage from './GoodServiceMessage/GoodServiceMessage';

const SelectedService = () => {
  const [fetchDisruptionsState] = useContext(FetchDisruptionsContext);
  const [autoCompleteState, autoCompleteDispatch] = useContext(AutoCompleteContext);

  const { selectedService } = autoCompleteState;
  // The below will check all disruptions and will return any disruption where the mode is bus and the id the user clicked in the autocomplete is within the servicesAffected array
  const selectedData = useFilterLogic();

  return (
    <>
      {/* Close disruption box */}
      {!autoCompleteState.disruptionID && (
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

          <CloseButton onClick={() => autoCompleteDispatch({ type: 'RESET_SELECTED_SERVICE' })} />
        </div>
      )}

      {/* Save routes message */}
      <div className="wmnds-msg-help wmnds-col-1">
        Save routes to your homepage by pressing the star icon
      </div>

      {/* If no selectedData then it must be good service */}
      {!selectedData.length && <GoodServiceMessage />}

      {/* If there are selectedData then there must be disruptions, loop through */}
      {selectedData.length > 0 &&
        fetchDisruptionsState.isMapVisible &&
        selectedData.map(disruption => (
          <SelectedItem
            disruption={disruption}
            key={disruption.id}
            autoCompleteDispatch={() => autoCompleteDispatch({ type: 'RESET_SELECTED_SERVICE' })}
          />
        ))}
    </>
  );
};

export default SelectedService;
