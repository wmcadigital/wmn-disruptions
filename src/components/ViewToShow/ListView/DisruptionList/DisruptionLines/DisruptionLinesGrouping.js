import { React } from 'react';
// Import styles
import styles from './DisruptionLinesGrouping.module.scss';

const DisruptionLinesGrouping = (servicesAffected) => {
  const servicesAff = Object.values(servicesAffected);

  const groupedLineList = servicesAff.reduce((accumulator, operator) => {
    operator.routeDescriptions.forEach((r) => {
      // if the route has not been added to the dictionary yet then add a new entry for it, intialise it to be an empty array
      if (!accumulator[r.description]) {
        accumulator[r.description] = [];
      }
      // add the operator name to the route
      accumulator[r.description].push(operator.operatorName);
    });
    return accumulator;
  }, {});
  const res = [...new Set(Object.keys(groupedLineList))];
  console.log('res', res);
  return Object.keys(groupedLineList).map((route) => (
    <div className={`${styles.affectedRoute}`}>{route}</div>
  ));
};
export default DisruptionLinesGrouping;
