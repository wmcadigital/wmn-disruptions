import React, { useContext } from 'react';
import Icon from 'components/shared/Icon/Icon';
import { AutoCompleteContext, FetchDisruptionsContext } from 'globalState';

import SelectedItem from './SelectedItem/SelectedItem';

const SelectedResults = () => {
  const [fetchDisruptionsState] = useContext(FetchDisruptionsContext);
  const [autoCompleteState] = useContext(AutoCompleteContext);

  // The below will check all disruptions and will return any disruption where the mode is bus and the id the user clicked in the autocomplete is within the servicesAffected array
  const selectedData = fetchDisruptionsState.data.filter(disrItem => {
    return (
      disrItem.mode === 'bus' &&
      disrItem.servicesAffected.some(el => el.id === autoCompleteState.selectedService.id)
    );
  });
  const selectedService = selectedData[0].servicesAffected.some(
    affected => affected.id === autoCompleteState.selectedService.id
  );

  return (
    <>
      <div className="wmnds-msg-summary wmnds-msg-summary--info">
        {selectedService.serviceNumber}
        {selectedService.routeDescription[0]}
        <Icon iconName="general-cross" iconClass="general-cross" />
      </div>
      <div className="wmnds-msg-help wmnds-col-1 wmnds-m-b-lg">
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
