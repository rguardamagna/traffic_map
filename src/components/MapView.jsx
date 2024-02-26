import React from "react";
import { MapContainer, TileLayer, Polyline, Tooltip} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import '../styles/map.css';

import { usePolylineCreator } from '../trafficStatus';
//import { invertirCoordenadas } from "../utils/utils";
import {classifyStatus, realizarPrediccion} from "../utils/utils";


const MapView = () => {
    
    // Estado de trafico actual
    let trafficFluido = []
    let trafficDenso =[]
    let trafficCongestionado = []
    let trafficCortado =[]
    let trafficSinDatos =[]

    //Estado de tráfico predicción
    let predictionFluido = []
    let predictionDenso =[]
    let predictionCongestionado = []
    let predictionCortado =[]
    let predictionSinDatos =[]
    
    let polyline = usePolylineCreator()
    
    
    polyline.forEach(element => {
        // Asignar estado actual a cada array
        classifyStatus(element,trafficFluido,trafficDenso,trafficCongestionado,trafficCortado,trafficSinDatos)
    })

    console.log(polyline[0])

    polyline.forEach(element => {
        // Asignar estado actual a cada array
        classifyStatus(element,predictionFluido,predictionDenso,predictionCongestionado,predictionCortado,predictionSinDatos)
        console.log(polyline.prediction)
        element.prediction=realizarPrediccion(element)
        
    })
    
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