import React from 'react';
import BusInfo from './BusInfo';
import NewSearch from '../../Search/NewSearch';

function Bus() {
  return (
    <div>
      <h6>Bus Info</h6>
      <NewSearch />
      <h6>API Loaded Data</h6>
      <BusInfo />
    </div>
  );
}

export default Bus;
