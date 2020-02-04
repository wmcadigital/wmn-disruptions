import React, { useEffect } from 'react';
import axios from 'axios';


const DisruptionList = () => {

  useEffect(() => {
    axios
      .get('https://trasnport-api-isruptions-v2.azure-api.net/Disruption/v2', {
        headers: {
          'Ocp-Apim-Subscription-Key': '55060e2bfbf743c5829b9eef583506f7'
        }
      })
      .then(response => {
        console.log(response.data);
      });
  }, [])

  return (
    <div>
      hello
    </div>
  )
}

export default DisruptionList
