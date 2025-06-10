import { useContext } from 'react';
import { format } from 'fecha';
import { WhenContext } from 'globalState';

const useDateFilter = () => {
  const [whenState] = useContext(WhenContext); // Get the state of whenButtons from WhenContext

  const today = format(new Date(), 'YYYY-MM-DDTHH:mm:ss.sssZ'); // Set today
  let tomorrow = new Date(today);
  tomorrow = format(tomorrow.setDate(tomorrow.getDate() + 1), 'YYYY-MM-DDTHH:mm:ss.sssZ'); // set tomorrow

  let fromDate;
  let toDate;
  let fromDateFull;
  let toDateFull;
  // Switch on when
  switch (whenState.when) {
    case 'now':
      fromDate = today;
      toDate = today;
      fromDateFull = today;
      toDateFull = today;
      break;

    case 'tomorrow':
      fromDate = tomorrow;
      toDate = tomorrow;
      fromDateFull = tomorrow;
      toDateFull = tomorrow;
      break;

    case 'customDate':
      fromDate = format(new Date(whenState.whenCustomDate), 'YYYY-MM-DD');
      toDate = format(new Date(whenState.whenCustomDate), 'YYYY-MM-DD');
      fromDateFull = format(new Date(whenState.whenCustomDate), 'YYYY-MM-DDTHH:mm:ss.sssZ');
      toDateFull = format(new Date(whenState.whenCustomDate), 'YYYY-MM-DDTHH:mm:ss.sssZ');
      break;

    default:
      fromDate = today;
      toDate = today;
  }
  return { fromDate, toDate, fromDateFull, toDateFull };
};

export default useDateFilter;
