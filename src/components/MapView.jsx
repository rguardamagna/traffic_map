import React from "react";
import { MapContainer, TileLayer, Polyline, useMap } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import '../styles/map.css'

import { polylineCreator } from '../trafficStatus'
import { invertirCoordenadas } from "../utils/utils";



const MapView = () => {
    
    let trafficFluido = []
    let trafficDenso,trafficCongestionado,trafficCortado,trafficSinDatos = []
    
    let polyline = polylineCreator()  
 /*   
    let polylineToDraw = []
    
    polyline.forEach(element => {
        
        let auxlineToDraw = []
        
        element.lines.forEach(coords => {
            
            auxlineToDraw.push(invertirCoordenadas(coords))             
        });
        polylineToDraw.push(auxlineToDraw)       
    });
*/

    polyline.forEach(element => {
        
        let auxlineToDraw = []
        
        switch (element.status) {
            case "0":
                element.lines.forEach(coords => {            
                    auxlineToDraw.push(invertirCoordenadas(coords))       
                });
                console.log(auxlineToDraw)
                let trafficLine = {
                    'lines': auxlineToDraw.pop(),
                    'status': element.status
                };
                trafficFluido.push(trafficLine)
                break;
            case "1":
                break;
            case "2":
                break;            
            case "3":
                break;
            case "4":
                break;
            case "5":
                break;

            default:
                break;
        }                
    });
    console.log(trafficFluido)
    const limeOptions = { color: 'yellow' }
    //<Polyline pathOptions={limeOptions} positions={polylineToDraw} />
    return (
        <div>
            <MapContainer center={[39.46746287691412,-0.3778836267835896]} zoom={13} className="mapa">
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            </MapContainer>            
        </div>
    )
}

export default MapView