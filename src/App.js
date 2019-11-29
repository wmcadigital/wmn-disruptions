import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Tray from './Components/Tray/Tray';
import Map from './Components/Map/Map';

function App() {
  return (
    <div className="App">
        <Map />
        <Header />
        <Tray />
    </div>
  );
}

export default App;
