import { useFetch } from "./useFetch"

const url = 'https://valencia.opendatasoft.com/api/explore/v2.1/catalog/datasets/intensitat-transit-trams-intensidad-trafico-tramos/records?limit=-1    '

export function polylineCreator() {
    
    const {data} = useFetch(url)
    let polylineToDraw=[]
    if (data != null)    
        {
            data.results.forEach(element => {
                let newFeature = {
                    'lines':element.geo_shape.geometry.coordinates,
                    'status':element.estado
                }
                polylineToDraw.push(newFeature)
            
            });          

            return polylineToDraw
        }
    else return []
}
