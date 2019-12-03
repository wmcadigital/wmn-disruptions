// Import styles
import './styles/wmn.scss';

import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Tray from './Components/Tray/Tray';
import Map from './Components/Map/Map';

function App() {
  return (
    <div className="App">
        
        <Header />
        <Tray />
        <Map />
    </div>
  );
}

export default App;
