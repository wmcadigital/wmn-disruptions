import { React } from 'react';
// Import styles
import styles from './DisruptionOperatorsGrouping.module.scss';

const DisruptionOperatorsGrouping = (disruptionServicesAffected) => {
  const servicesAffected = disruptionServicesAffected.disruptionServicesAffected.map(
    (affected) => affected
  );

  const servicesAff = Object.values(servicesAffected);
  const groupedLineList = servicesAff.reduce((accumulator, operator) => {
    operator.routeDescriptions.forEach((r) => {
      // if the operator name has not been added to the dictionary yet then add a new entry for it, intialise it to be an empty array
      if (!accumulator[operator.operatorName]) {
        accumulator[operator.operatorName] = [];
      }
      // add the route description to the operator
      accumulator[operator.operatorName].push(r.description);
    });
    return accumulator;
  }, {});

  let key = 0;
  return Object.keys(groupedLineList).map((operatorName) => {
    key += 1; // Increment the key variable before returning the JSX element
    return (
      <div key={key}>
        <ul key={key} className={`${styles.operator}`}>
          <li key={key}>{operatorName}</li>
        </ul>
      </div>
    );
  });
};
export default DisruptionOperatorsGrouping;
