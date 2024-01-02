import React from "react";
import { useFetch } from "../useFetch";

import { MapContainer, TileLayer, Polyline, useMap } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import '../styles/map.css'

import { polylineCreator } from '../trafficStatus'

const MapView = () => {
    const polyline = polylineCreator()
    console.log(polyline)
    const limeOptions = { color: 'lime' }
    return (
        <div>
            <MapContainer center={[39.46746287691412,-0.3778836267835896]} zoom={13} className="mapa">
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                <Polyline pathOptions={limeOptions} positions={polyline} />
            </MapContainer>            
        </div>
    )
}

export default MapView