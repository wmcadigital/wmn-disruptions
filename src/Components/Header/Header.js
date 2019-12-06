import React, { Component } from 'react';
import MapListToggle from './MapListToggle/MapListToggle';

//import the css fix for the header
import './Header.scss';

class Header extends Component {
    render() {
        return (
            <div className="header">

            <div className="wmnds-header__vertical-align wmnds-col-1 wmnds-col-md-1-1">
                <h2>Distruptions</h2>
            </div>
            
            <div className="wmnds-header__vertical-align wmnds-col-1 wmnds-col-md-1-1">
                <MapListToggle />
            </div> 
            
            
            </div>
        )
    }
}

export default Header
