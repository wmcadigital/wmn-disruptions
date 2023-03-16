import { React } from 'react';
// Import styles
import styles from './DisruptionLinesGrouping.module.scss';

const DisruptionLinesGrouping = (servicesAffected) => {
  const servicesAff = Object.values(servicesAffected);

  const groupedLineList = servicesAff.reduce((accumulator, operator) => {
    operator.routeDescriptions.forEach((r) => {
      // if the route has not been added to the dictionary yet then add a new entry for it, initialise it to be an empty array
      if (!accumulator[r.description]) {
        accumulator[r.description] = [];
      }
      // add the operator name to the route
      accumulator[r.description].push(operator.operatorName);
    });
    return accumulator;
  }, {});

  // create an empty array to hold the JSX elements for the affected routes
  const affectedRoutes = [];

  // iterate over the keys of the groupedLineList dictionary
  Object.keys(groupedLineList).forEach((route) => {
    // create a list of operators for the current route
    const operators = groupedLineList[route].map((operator) => <li>{operator}</li>);
    // create a div element for the current route with the operators list as a child
    const routeDiv = (
      <div className={`${styles.affectedRoute}`}>
        {route}
        <ul>{operators}</ul>
      </div>
    );
    // add the div element to the affectedRoutes array
    affectedRoutes.push(routeDiv);
  });

  // create an empty array to hold the JSX elements for the affected operators
  const affectedOperators = [];

  // iterate over the operators in servicesAffected
  servicesAff.forEach((operator) => {
    // create a list of routes for the current operator
    const routes = operator.routeDescriptions.map((route) => <li>{route.description}</li>);
    // create a div element for the current operator with the routes list as a child
    const operatorDiv = (
      <div className={`${styles.affectedOperator}`}>
        {operator.operatorName}
        <ul className={`${styles.affectedOperators}`}>{routes}</ul>
      </div>
    );
    // add the div element to the affectedOperators array
    affectedOperators.push(operatorDiv);
  });

  // return the array of affected routes and operators
  return (
    <>
      <div className={`${styles.affectedOperators}`}>{affectedOperators}</div>
    </>
  );
};

export default DisruptionLinesGrouping;
