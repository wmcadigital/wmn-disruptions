// Import packages
import React from 'react';
import { Map as MapView } from '@esri/react-arcgis';

const MapContainer = () => {
    return (
        <MapView
            loaderOptions={{ css: true }}
            viewProperties={{
                center: [-1.89, 52.45],
                zoom: 10
            }}
        />
    )
}

export default MapContainer;
