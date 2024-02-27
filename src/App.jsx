import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import MapView from './components/MapView'
import { useFetch } from './useFetch'
import './App.css'
import TitleContent from './components/Title'

function App() {    
  return (
    <>
      <div>
        <TitleContent/>
        <MapView/> 
      </div>
    </>
  )
}

export default App
