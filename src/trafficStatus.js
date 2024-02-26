import { useFetch } from "./useFetch";


const urls =['https://geoportal.valencia.es/server/rest/services/OPENDATA/Trafico/MapServer/192/query?where=idtramo%3E%3D0&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=geojson']


export function usePolylineCreator() {
    
    let polylineToDraw=[]
    
    const {data} = useFetch(urls)
    
    if (data != null)    
        {
            data.forEach(element => {
                let newFeature = {
                    'lines':element.geometry.coordinates,
                    'status':element.properties.estado,
                    'id':element.properties.idtramo,
                    'address': element.properties.denominacion,
                    'predictions':4
                }
                polylineToDraw.push(newFeature)
            
            });          

            return polylineToDraw
        }
    else return []
}
