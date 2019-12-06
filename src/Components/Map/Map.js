import React from 'react';
import { Map as MapView } from '@esri/react-arcgis';
import './Map.scss';

const MapContainer = () => {
    return (
        <MapView
            style={{ width: '100vw', height: '100vh' }}
        
            viewProperties={{
                center: [-1.89, 52.45],
                zoom: 10
            }}
        />
    )
}

export default MapContainer;
