import { useFetch } from "./useFetch"

const url = 'https://valencia.opendatasoft.com/api/explore/v2.1/catalog/datasets/intensitat-transit-trams-intensidad-trafico-tramos/records?limit=-1'

export function polylineCreator() {
    
    const {data} = useFetch(url)
    let polylineToDraw = data
    if (data != null)    
        polylineToDraw = data.results[0].geo_shape.geometry.coordinates[0]
             
        
    return {polylineToDraw}
}