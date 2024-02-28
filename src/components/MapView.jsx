import { MapContainer, TileLayer, Polyline, Tooltip, LayersControl, LayerGroup} from 'react-leaflet';
import { useState, useEffect } from "react";

import 'leaflet/dist/leaflet.css';
import '../styles/map.css';

import { usePolylineCreator } from '../trafficStatus';
import {classifyStatus, classifyPrediction, realizarPrediccion} from "../utils/utils";


const MapView = () => {
    const [trafficFluido, setTrafficFluido] = useState([]);
    const [trafficDenso, setTrafficDenso] = useState([]);
    const [trafficCongestionado, setTrafficCongestionado] = useState([]);
    const [trafficCortado, setTrafficCortado] = useState([]);
    const [trafficSinDatos, setTrafficSinDatos] = useState([]);

    const [predictionFluido, setPredictionFluido] = useState([]);
    const [predictionDenso, setPredictionDenso] = useState([]);
    const [predictionCongestionado, setPredictionCongestionado] = useState([]);
    const [predictionCortado, setPredictionCortado] = useState([]);
    const [predictionSinDatos, setPredictionSinDatos] = useState([]);

    const polyline = usePolylineCreator();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const predicciones = await realizarPrediccion(polyline);

                let tempTrafficFluido = [];
                let tempTrafficDenso = [];
                let tempTrafficCongestionado = [];
                let tempTrafficCortado = [];
                let tempTrafficSinDatos = [];

                let tempPredictionFluido = [];
                let tempPredictionDenso = [];
                let tempPredictionCongestionado = [];
                let tempPredictionCortado = [];
                let tempPredictionSinDatos = [];

                // Actualizar estados solo si ha habido cambios
                polyline.forEach(element => {
                    classifyStatus(element, tempTrafficFluido, tempTrafficDenso, tempTrafficCongestionado, tempTrafficCortado, tempTrafficSinDatos);
                });

                predicciones.forEach(element => {
                    classifyPrediction(element, tempPredictionFluido, tempPredictionDenso, tempPredictionCongestionado, tempPredictionCortado, tempPredictionSinDatos);
                });

                setTrafficFluido(tempTrafficFluido);
                setTrafficDenso(tempTrafficDenso);
                setTrafficCongestionado(tempTrafficCongestionado);
                setTrafficCortado(tempTrafficCortado);
                setTrafficSinDatos(tempTrafficSinDatos);

                setPredictionFluido(tempPredictionFluido);
                setPredictionDenso(tempPredictionDenso);
                setPredictionCongestionado(tempPredictionCongestionado);
                setPredictionCortado(tempPredictionCortado);
                setPredictionSinDatos(tempPredictionSinDatos);
            } catch (error) {
                console.error('Error al realizar la predicción:', error);
            }
        };

        fetchData();
    }, [polyline]);
    
    const limeOptions = { color: 'lime' }    
    const orangeOptions = { color: 'orange' }
    const redOptions = { color: 'red' }
    const blackOptions = { color: 'black' }
    const grayOptions = { color: 'gray' }
    
    //<MapContainer center={[39.46746287691412,-0.3778836267835896]} zoom={13} className="mapa">
    
    return (
        <div>
            <MapContainer center={[41.396424808239, 2.1568495062334496]} zoom={13} className="mapa">
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                <LayersControl position="topright">
                    <LayersControl.Overlay checked name="Estado actual del tráfico">
                        <LayerGroup>
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
                        </LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay name="Pedicción del tráfico">
                        <LayerGroup>
                            <Polyline pathOptions={limeOptions} positions={predictionFluido} >
                                <Tooltip sticky>Estado del tráfico: Fluido</Tooltip>
                            </Polyline>                  
                            <Polyline pathOptions={orangeOptions} positions={predictionDenso}>
                                <Tooltip sticky>Estado del tráfico: Denso</Tooltip>
                            </Polyline>
                            <Polyline pathOptions={redOptions} positions={predictionCongestionado}>
                                <Tooltip sticky>Estado del tráfico: Congestionado</Tooltip>
                            </Polyline>
                            <Polyline pathOptions={blackOptions} positions={trafficCortado}>
                                <Tooltip sticky>Estado del tráfico: Cortado</Tooltip>    
                            </Polyline>
                            <Polyline pathOptions={grayOptions} positions={trafficSinDatos}>
                                <Tooltip sticky>Estado del tráfico: Sin datos</Tooltip>
                            </Polyline>
                        </LayerGroup>
                    </LayersControl.Overlay>
                </LayersControl>
            </MapContainer>            
        </div>
    )
}

export default MapView