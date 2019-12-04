import React, { Component } from 'react';
import MapListToggle from './MapListToggle/MapListToggle';
import AlphaWarning from './AlphaWarning/AlphaWarning';

class Header extends Component {
    render() {
        return (
            <div className="header">
                <h2>Distruptions</h2>
                <MapListToggle />
                <AlphaWarning />
            </div>
        )
    }
}

export default Header
