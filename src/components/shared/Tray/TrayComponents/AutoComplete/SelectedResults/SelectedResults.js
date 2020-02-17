import React, { useContext } from 'react';
import Icon from 'components/shared/Icon/Icon';
import { AutoCompleteContext, FetchDisruptionsContext } from 'globalState';
import dompurify from 'dompurify';

const { sanitize } = dompurify;

const SelectedResults = () => {
  const [fetchDisruptionsState] = useContext(FetchDisruptionsContext);
  const [autoCompleteState] = useContext(AutoCompleteContext);

  // The below will check all disruptions and will return any disruption where the mode is bus and the id the user clicked in the autocomplete is within the servicesAffected array
  const selectedData = fetchDisruptionsState.data.filter(disrItem => {
    return (
      disrItem.mode === 'bus' &&
      disrItem.servicesAffected.some(el => el.id === autoCompleteState.id)
    );
  });

  return (
    <>
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
        selectedData.map(disruption => {
          let iconName;
          let newClass;
          // Removed the if statement - Icon now showing.
          // Do a switch on the disruption severity, then map the type and iconName to the correct vars
          switch (disruption.disruptionSeverity) {
            // Minor disruption (normal)
            case 'normal':
              iconName = 'warning-circle';
              newClass = 'warning';
              break;
            // Major disruption (high)
            case 'high':
              iconName = 'warning-triangle';
              newClass = 'error';
              break;
            // Severe disruption (veryHigh)
            case 'veryHigh':
              iconName = 'warning-triangle';
              newClass = 'severe';
              break;
            // Major Disruption - Notice that the disruptionSeverity is capitalised in this case - Maybe ask Jon to make it lowercase?
            case 'Major':
              iconName = 'warning-triangle';
              newClass = 'error';
              break;
            // Good service (low)
            default:
              iconName = 'success';
              newClass = 'success';
              break;
          }

          return (
            <div className="wmnds-grid" key={disruption.id}>
              {/* Title */}
              <div className="wmnds-col-1 wmnds-m-b-lg wmnds-m-t-lg">
                <span className="wmnds-disruption-indicator-small wmnds-col-auto wmnds-m-r-md">
                  <svg className="wmnds-disruption-indicator-small__icon">
                    <Icon iconName="modes-isolated-bus" iconClass="modes-isolated-bus" />
                  </svg>

                  <svg className="wmnds-disruption-indicator-small__icon">
                    <Icon iconName="general-warning-circle" iconClass="general-warning-circle" />
                  </svg>
                </span>
                <h4 className="wmnds-col-auto wmnds-m-none">{disruption.title}</h4>
              </div>
              {/* Affected Services */}
              <strong className="wmnds-col-1">Affected service(s):</strong>
              <div className="wmnds-col-1">
                {/* Services Affected */}
                {disruption.servicesAffected &&
                  disruption.servicesAffected.map(affected => (
                    <div
                      key={affected.id}
                      className={`wmnds-disruption-indicator-medium wmnds-disruption-indicator-medium--with-icon wmnds-disruption-indicator-medium--${newClass} wmnds-disruption-indicator-medium--narrow wmnds-m-r-md wmnds-m-b-md wmnds-p-xs`}
                    >
                      {affected.serviceNumber}
                      <Icon
                        iconClass="wmnds-disruption-indicator-medium__icon wmnds-disruption-indicator-medium__icon--right wmnds-m-l-lg"
                        iconName={`general-${iconName}`}
                      />
                    </div>
                  ))}
              </div>

              <div className="wmnds-col-1">
                <div
                  className="wmnds-m-b-lg"
                  dangerouslySetInnerHTML={{ __html: sanitize(disruption.description) }}
                />
                <button className="wmnds-btn wmnds-btn--start" type="button">
                  Replan Your Journey
                  <svg className="wmnds-btn__icon wmnds-btn__icon--right">
                    <Icon iconName="general-chevron-right" iconClass="general-chevron-right" />
                  </svg>
                </button>
                <br />
                <br />

                <button className="wmnds-btn" type="button">
                  Share Disruption
                  <svg className="wmnds-btn__icon wmnds-btn__icon--right">
                    <Icon iconName="general-share" iconClass="general-share" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default SelectedResults;
