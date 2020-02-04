import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DisruptionItem from './DisruptionItem/DisruptionItem';


const DisruptionList = () => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    axios
      .get('https://trasnport-api-isruptions-v2.azure-api.net/Disruption/v2', {
        headers: {
          'Ocp-Apim-Subscription-Key': '55060e2bfbf743c5829b9eef583506f7'
        }
      })
      .then(response => {
        setdata(response.data);
      });
  }, [])

return(
  <>
    {
      data.map(disruption => (
        <DisruptionItem disruption={disruption} />
      ))
    }
  </>
)
}

export default DisruptionList
