import React, { Component } from 'react';
import { Map } from '@esri/react-arcgis';

class Maps extends Component {
    render() {
        return (
            <Map 
                
        
                viewProperties={{
                    center: [-1.89, 52.45],
                    zoom: 10
                }} />
        )
    }
}

export default Maps
