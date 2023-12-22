import React from "react";

import { MapContainer, TileLayer, useMap } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import '../styles/map.css'

const MapView = () => {
    return (
        <div>
            <MapContainer center={[39.46746287691412,-0.3778836267835896]} zoom={13} className="mapa">
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            </MapContainer>
            
        </div>
    )
}

export default MapView