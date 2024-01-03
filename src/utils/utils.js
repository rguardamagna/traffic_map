// Invertir coordenadas

export function invertirCoordenadas(element)
  {
    let aux=[]
    aux.push(element)
    aux['0']=element['1']
    aux['1']=element['0'] 
    return aux
  }