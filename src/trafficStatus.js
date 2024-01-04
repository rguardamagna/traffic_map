import { useFetch } from "./useFetch"

const urls = [
    'https://valencia.opendatasoft.com/api/explore/v2.1/catalog/datasets/estat-transit-temps-real-estado-trafico-tiempo-real/records?where=idtramo%3C100&limit=-1',
    'https://valencia.opendatasoft.com/api/explore/v2.1/catalog/datasets/estat-transit-temps-real-estado-trafico-tiempo-real/records?where=idtramo%3E%3D100%20and%20idtramo%3C200&limit=-1',
    'https://valencia.opendatasoft.com/api/explore/v2.1/catalog/datasets/estat-transit-temps-real-estado-trafico-tiempo-real/records?where=idtramo%3E%3D200%20and%20idtramo%3C300&limit=-1',
    'https://valencia.opendatasoft.com/api/explore/v2.1/catalog/datasets/estat-transit-temps-real-estado-trafico-tiempo-real/records?where=idtramo%3E%3D300%20and%20idtramo%3C400&limit=-1',
    'https://valencia.opendatasoft.com/api/explore/v2.1/catalog/datasets/estat-transit-temps-real-estado-trafico-tiempo-real/records?where=idtramo%3E%3D400%20and%20idtramo%3C500&limit=-1'
    ]

export function polylineCreator() {
    
    let polylineToDraw=[]
    
    const {data} = useFetch(urls)
    
    if (data != null)    
        {
            data.forEach(element => {
                let newFeature = {
                    'lines':element.geo_shape.geometry.coordinates,
                    'status':element.estado,
                    'id':element.idtramo,
                    'address':element.denominacion
                }
                polylineToDraw.push(newFeature)
            
            });          

            return polylineToDraw
        }
    else return []
}
