import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { format } from 'fecha';

// Import contexts
import { ModeContext, WhenContext } from 'globalState';
import DisruptionItem from './DisruptionItem/DisruptionItem';

const DisruptionList = () => {
  const [whenState] = useContext(WhenContext); // Get the state of whenButtons from WhenContext
  const [modeState] = useContext(ModeContext); // Get the state of whenButtons from WhenContext
  const [data, setdata] = useState([]);
  const [isFetching, setisFetching] = useState(false);

  useEffect(() => {
    setisFetching(true);
    axios
      .get('https://trasnport-api-isruptions-v2.azure-api.net/Disruption/v2', {
        headers: {
          'Ocp-Apim-Subscription-Key': '55060e2bfbf743c5829b9eef583506f7'
        }
      })
      .then(response => {
        setdata(response.data.disruptions);
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      })
      .then(() => setisFetching(false));
  }, []);

  let filteredData = data;

  // When filtering
  if (whenState.when) {
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
        fromDate = format(whenState.whenCustomDate, 'YYYY-MM-DD');
        toDate = format(whenState.whenCustomDate, 'YYYY-MM-DD');
        break;

      default:
        fromDate = today;
        toDate = today;
    }

    // Filter results on date range
    filteredData = filteredData.filter(disrItem => {
      let returnitem;
      if (disrItem.mode === 'bus') {
        const disrStartDate = disrItem.disruptionTimeWindow.start;
        const disrEndDate = disrItem.disruptionTimeWindow.end;

        if (
          (disrStartDate >= fromDate && disrStartDate <= toDate) ||
          (disrEndDate >= fromDate && disrStartDate <= toDate)
        ) {
          returnitem = disrItem;
        }
      }
      return returnitem;
    });
    // End when filtering

    // Mode filtering
    if (modeState.mode) {
      filteredData = filteredData.filter(disrItem => disrItem.mode === modeState.mode);
    }
  }

  return (
    <>
      {!isFetching ? (
        filteredData.map(disruption => <DisruptionItem disruption={disruption} key={disruption.id} />)
      ) : (
        <div>
          <div className="wmnds-loader" />
        </div>
      )}
    </>
  );
};

export default DisruptionList;
