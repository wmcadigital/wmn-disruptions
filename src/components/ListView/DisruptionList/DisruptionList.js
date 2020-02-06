import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
// Import contexts
import { ModeContext } from 'globalState';
import DisruptionItem from './DisruptionItem/DisruptionItem';


const DisruptionList = () => {
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

// Mode filtering
  let filteredData = data;
  if(modeState.mode){
    filteredData = filteredData.filter(disrItem => disrItem.mode === modeState.mode);
  }

  return (
    <>
      {!isFetching ? (
        filteredData.map(disruption => <DisruptionItem disruption={disruption} />)
      ) : (
        <div>
          <div className="wmnds-loader" />
        </div>
      )}
    </>
  );
};

export default DisruptionList
