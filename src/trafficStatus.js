import { useFetch } from "./useFetch";
import { obtenerDatosBcn } from "./utils/utils";



const urls =['https://geoportal.valencia.es/server/rest/services/OPENDATA/Trafico/MapServer/192/query?where=idtramo%3E%3D0&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=geojson']
//const urls =['https://opendata-ajuntament.barcelona.cat/data/api/action/datastore_search?resource_id=1d6c814c-70ef-4147-aa16-a49ddb952f72']

export function usePolylineCreator() {
    
    let polylineToDraw=[]
    
    const { data } = useFetch(urls)
    
    if (data != null)    
        {
            data.forEach(element => {
                let newFeature = {
                    'lines':element.geometry.coordinates,
                    'status':element.properties.estado,
                    'id':element.properties.idtramo,
                    'address': element.properties.denominacion,
                    /*'lines':element.Descripció,
                    'status':1,
                    'id':element.Tram,
                    'address': element.Coordenades,*/
                }
                polylineToDraw.push(newFeature)
            });          

            return polylineToDraw
        }
    else return []
}


