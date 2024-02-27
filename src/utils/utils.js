// Invertir coordenadas

export function invertirCoordenadas(element)
  {
    let aux=[]
    aux.push(element)
    aux['0']=element['1']
    aux['1']=element['0'] 
    return aux
}

// Usar la API del modelo de ML para obtener la predicción
import axios from 'axios';

export async function realizarPrediccion(trafficData) {
  try {
    const apiUrl = 'http://127.0.0.1:5000/predict';
    const response = await axios.post(apiUrl, { data: trafficData });
    return response.data;
  } catch (error) {
    console.error('Error al realizar la solicitud:', error.message);
    throw error;
  }
}


// Clasificar datos (trafico actual y predicciones)

export async function classifyStatus(json_data,fluido,denso,congestionado,cortado,sinDatos) {
        
  let auxLineToDraw=[]
  switch (json_data.status) {
      case 0:
          json_data.lines.forEach(coords => {
              auxLineToDraw.push(invertirCoordenadas(coords))
          });                
          fluido.push(auxLineToDraw)
          break;
      case 1:
          json_data.lines.forEach(coords => {
              auxLineToDraw.push(invertirCoordenadas(coords))
          });                
          denso.push(auxLineToDraw)
          break;
      case 2:
          json_data.lines.forEach(coords => {
              auxLineToDraw.push(invertirCoordenadas(coords))
          });                
          congestionado.push(auxLineToDraw)
          break;            
      case 3:
          json_data.lines.forEach(coords => {
              auxLineToDraw.push(invertirCoordenadas(coords))
          });                
          cortado.push(auxLineToDraw)
          break;           
      case 5:
          json_data.lines.forEach(coords => {
              auxLineToDraw.push(invertirCoordenadas(coords))
          });                
          fluido.push(auxLineToDraw)
          break;
      case 6:
          json_data.lines.forEach(coords => {
              auxLineToDraw.push(invertirCoordenadas(coords))
          });                
          denso.push(auxLineToDraw)
          break;
      case 7:
          json_data.lines.forEach(coords => {
              auxLineToDraw.push(invertirCoordenadas(coords))
          });                
          congestionado.push(auxLineToDraw)
          break;            
      case 8:
          json_data.lines.forEach(coords => {
              auxLineToDraw.push(invertirCoordenadas(coords))
          });                
          cortado.push(auxLineToDraw)
          break;
      
      default:
        json_data.lines.forEach(coords => {
              auxLineToDraw.push(invertirCoordenadas(coords))
          });                
          sinDatos.push(auxLineToDraw)
          break;            
  }

}

export async function classifyPrediction(json_data,fluido,denso,congestionado,cortado,sinDatos) {
        
  let auxLineToDraw=[]
  switch (json_data.prediction) {
      case 1:
          json_data.lines.forEach(coords => {
              auxLineToDraw.push(invertirCoordenadas(coords))
          });                
          fluido.push(auxLineToDraw)
          break;
      case 2:
          json_data.lines.forEach(coords => {
              auxLineToDraw.push(invertirCoordenadas(coords))
          });                
          fluido.push(auxLineToDraw)
          break;
      case 3:
          json_data.lines.forEach(coords => {
              auxLineToDraw.push(invertirCoordenadas(coords))
          });                
          denso.push(auxLineToDraw)
          break;            
      case 4:
          json_data.lines.forEach(coords => {
              auxLineToDraw.push(invertirCoordenadas(coords))
          });                
          congestionado.push(auxLineToDraw)
          break;           
      case 5:
          json_data.lines.forEach(coords => {
              auxLineToDraw.push(invertirCoordenadas(coords))
          });                
          congestionado.push(auxLineToDraw)
          break;
      default:
        json_data.lines.forEach(coords => {
              auxLineToDraw.push(invertirCoordenadas(coords))
          });                
          sinDatos.push(auxLineToDraw)
          break;            
  }

}