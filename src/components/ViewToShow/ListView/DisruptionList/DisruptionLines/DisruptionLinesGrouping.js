import { React } from 'react';
// Import styles
import styles from './DisruptionLinesGrouping.module.scss';

const DisruptionLinesGrouping = (disruptionServicesAffected) => {
  console.log('disruptionServicesAffected', disruptionServicesAffected.disruptionServicesAffected);
  const doubledNumbers = disruptionServicesAffected.disruptionServicesAffected.map(
    (affected) => affected
  );

  const servicesAff = Object.values(doubledNumbers);
  console.log('servicesAff', servicesAff);
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
  return Object.keys(groupedLineList).map((route) => (
    <div className={`${styles.affectedRoute}`}>{route}</div>
  ));
};
export default DisruptionLinesGrouping;
