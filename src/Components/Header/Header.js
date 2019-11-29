import React, { Component } from 'react';
import MapListToggle from './MapListToggle/MapListToggle';

class Header extends Component {
    render() {
        return (
            <div>
                <h2>Distruptions</h2>
                <MapListToggle />
            </div>
        )
    }
}

export default Header
