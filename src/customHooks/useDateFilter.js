import { useContext } from 'react';
import { format } from 'fecha';
import { WhenContext } from 'globalState';

const useDateFilter = () => {
  const [whenState] = useContext(WhenContext); // Get the state of whenButtons from WhenContext

  const today = format(new Date(), 'YYYY-MM-DD'); // Set today
  let tomorrow = new Date(today);
  tomorrow = format(tomorrow.setDate(tomorrow.getDate() + 1), 'YYYY-MM-DD'); // set tomorrow

  let fromDate;
  let toDate;
  // Switch on when
  switch (whenState.when) {
    case 'now':
      fromDate = today;
      toDate = today;
      break;

    case 'tomorrow':
      fromDate = tomorrow;
      toDate = tomorrow;
      break;

    case 'customDate':
      fromDate = format(new Date(whenState.whenCustomDate), 'YYYY-MM-DD');
      toDate = format(new Date(whenState.whenCustomDate), 'YYYY-MM-DD');
      break;

    default:
      fromDate = today;
      toDate = today;
  }
  return { fromDate, toDate };
};

export default useDateFilter;
