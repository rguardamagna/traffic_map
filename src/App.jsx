import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import MapView from './components/MapView'

import './App.css'

const url = 'https://valencia.opendatasoft.com/api/explore/v2.1/catalog/datasets/intensitat-transit-trams-intensidad-trafico-tramos/records?limit=-1'

function App() {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [])

  //<MapView/>

  return (
    <>
      <div> 
        {data?.map((results) => (
          results
        ))} 
      </div>
    </>
  )
}

export default App
