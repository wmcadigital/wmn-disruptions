import React, { useContext } from 'react';
import Icon from 'components/shared/Icon/Icon';
import { AutoCompleteContext, FetchDisruptionsContext } from 'globalState';

const DraggableResults = () => {
  const [fetchDisruptionsState] = useContext(FetchDisruptionsContext);
  const [autoCompleteState] = useContext(AutoCompleteContext);

  // The below will check all disruptions and will return any disruption where the mode is bus and the id the user clicked in the autocomplete is within the servicesAffected array
  const selectedData = fetchDisruptionsState.data.filter(disrItem => {
    return disrItem.mode === 'bus' && disrItem.servicesAffected.some(el => el.id === autoCompleteState.id);
  });

  console.log(selectedData);

  return (
    <div className="wmnds-grid">
      <div className="wmnds-col-1">
        <span className="wmnds-disruption-indicator-small">
          <svg className="wmnds-disruption-indicator-small__icon">
            <Icon iconName="modes-isolated-roads" iconClass="modes-isolated-roads" />
          </svg>

          <svg className="wmnds-disruption-indicator-small__icon">
            <Icon iconName="general-warning-circle" iconClass="general-warning-circle" />
          </svg>
        </span>
        <h3>Broken Down Van at M20 </h3>
        <h3>Road(s) affected:</h3>
        <div className="wmnds-disruption-indicator-large wmnds-disruption-indicator-large--warning">
          <div className="wmnds-disruption-indicator-large__left-wrapper">
            <span className="wmnds-disruption-indicator-large__left-icon-wrapper">
              <svg className="wmnds-disruption-indicator-large__icon">
                <Icon iconName="modes-isolated-roads" iconClass="modes-isolated-roads" />
              </svg>
              <br />
              Roads
            </span>

            <span className="wmnds-disruption-indicator-large__text">
              <strong>Minor disruption</strong>
              <br />
              A38
            </span>
          </div>
          <svg className="wmnds-disruption-indicator-large__icon wmnds-disruption-indicator-large__icon--right">
            <Icon iconName="general-star" iconClass="general-star" />
          </svg>
        </div>
        <h5>Expect to continue until</h5>
        <p>Friday 19th October 2020 at 5:00am</p>
        <h5>Whats Happened</h5>
        <p>Broken down van. Traffic Officers and Free Recovery are headed towards. Approach with caution. </p>
        <h5>Travel Advice</h5>
        <p>Lorem Ipsum is the root of goodness. Dummy test is printing and typesetting industry. </p>
        <h5>Latest updates (#HashTag on Twitter)</h5>
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
};

export default DraggableResults;
