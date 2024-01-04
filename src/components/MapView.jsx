import React from "react";
import { MapContainer, TileLayer, Polyline, Tooltip} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import '../styles/map.css'

import { polylineCreator } from '../trafficStatus'
import { invertirCoordenadas } from "../utils/utils";



const MapView = () => {
    
    let trafficFluido = []
    let trafficDenso =[]
    let trafficCongestionado = []
    let trafficCortado =[]
    let trafficSinDatos =[]      
    
    let polyline = polylineCreator()  
    
        
    polyline.forEach(element => {
        let auxLineToDraw=[]
        switch (element.status) {
            case 0:
                element.lines.forEach(coords => {
                    auxLineToDraw.push(invertirCoordenadas(coords))
                });                
                trafficFluido.push(auxLineToDraw)
                break;
            case 1:
                element.lines.forEach(coords => {
                    auxLineToDraw.push(invertirCoordenadas(coords))
                });                
                trafficDenso.push(auxLineToDraw)
                break;
            case 2:
                element.lines.forEach(coords => {
                    auxLineToDraw.push(invertirCoordenadas(coords))
                });                
                trafficCongestionado.push(auxLineToDraw)
                break;            
            case 3:
                element.lines.forEach(coords => {
                    auxLineToDraw.push(invertirCoordenadas(coords))
                });                
                trafficCortado.push(auxLineToDraw)
                break;           
            case 5:
                element.lines.forEach(coords => {
                    auxLineToDraw.push(invertirCoordenadas(coords))
                });                
                trafficFluido.push(auxLineToDraw)
                break;
            case 6:
                element.lines.forEach(coords => {
                    auxLineToDraw.push(invertirCoordenadas(coords))
                });                
                trafficDenso.push(auxLineToDraw)
                break;
            case 7:
                element.lines.forEach(coords => {
                    auxLineToDraw.push(invertirCoordenadas(coords))
                });                
                trafficCongestionado.push(auxLineToDraw)
                break;            
            case 8:
                element.lines.forEach(coords => {
                    auxLineToDraw.push(invertirCoordenadas(coords))
                });                
                trafficCortado.push(auxLineToDraw)
                break;
            
            default:
                element.lines.forEach(coords => {
                    auxLineToDraw.push(invertirCoordenadas(coords))
                });                
                trafficSinDatos.push(auxLineToDraw)
                break;            
        }                
    });
    
    const limeOptions = { color: 'lime' }    
    const orangeOptions = { color: 'orange' }
    const redOptions = { color: 'red' }
    const blackOptions = { color: 'black' }
    const grayOptions = { color: 'gray' }
    
    return (
        <div>
            <MapContainer center={[39.46746287691412,-0.3778836267835896]} zoom={13} className="mapa">
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                <Polyline pathOptions={limeOptions} positions={trafficFluido} >
                    <Tooltip sticky>Estado del tráfico: Fluido</Tooltip>
                </Polyline>                  
                <Polyline pathOptions={orangeOptions} positions={trafficDenso}>
                    <Tooltip sticky>Estado del tráfico: Denso</Tooltip>
                </Polyline>
                <Polyline pathOptions={redOptions} positions={trafficCongestionado}>
                    <Tooltip sticky>Estado del tráfico: Congestionado</Tooltip>
                </Polyline>
                <Polyline pathOptions={blackOptions} positions={trafficCortado}>
                    <Tooltip sticky>Estado del tráfico: Cortado</Tooltip>    
                </Polyline>
                <Polyline pathOptions={grayOptions} positions={trafficSinDatos}>
                    <Tooltip sticky>Estado del tráfico: Sin datos</Tooltip>
                </Polyline>
            </MapContainer>            
        </div>
    )
}

export default MapView