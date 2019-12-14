import React from 'react';
import TramSearch from '../../Search/TramSearch';
import TrainInfo from '../Train/TrainInfo';

function Tram() {
  return (
    <div>
      <h6>Bus Info</h6>
      <TramSearch />
      <h6>API Loaded Data</h6>
      <TrainInfo />
    </div>
  );
}

export default Tram;
