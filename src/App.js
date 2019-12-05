// Import styles
import './styles/wmn.scss';

import React from 'react';
import './App.css';
import MainHeader from './Components/MainHeader/MainHeader';
import Header from './Components/Header/Header';
import Tray from './Components/Tray/Tray';
import Map from './Components/Map/Map';

function App() {
  return (
    <div className="App wmnds-grid-5-5">
        <MainHeader />
        
        <Header />

        
        <Tray />
        <Map />
    </div>
  );
}

export default App;
