import pandas as pd

tramos_relacion = pd.read_csv('python/ML/models/transit_relacio_trams.csv')
estat_traffic = pd.read_csv('python/ML/models/transit_relacio_trams.csv')


def convertir_coordenadas(coordenadas):
    # Dividir las coordenadas en conjuntos
    conjuntos = coordenadas.split(',')

    # Verificar que haya un número par de coordenadas
    if len(conjuntos) % 2 != 0:
        raise ValueError("La cantidad de coordenadas debe ser un número par")

    # Dividir los conjuntos en pares de latitud y longitud
    pares = [conjuntos[i:i + 2] for i in range(0, len(conjuntos), 2)]

    # Convertir a pares de latitud y longitud
    coordenadas_convertidas = [(float(latitud), float(longitud)) for latitud, longitud in pares]

    return coordenadas_convertidas

def cargar_datos():

        # Decodificación del JSON
        data = tramos_relacion
        
        tramos=[]
        for dato in data:
            tramos.append({                    
                    'lines':dato['Coordenades'],
                    'status':1,
                    'id':dato['Tram'],
                    'address': dato['Descripció']
                    })
        return tramos
