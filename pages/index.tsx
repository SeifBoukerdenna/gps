import { useLoadScript } from '@react-google-maps/api'
import LoadingSpinner from '../components/LoadingSpinner'
import Map from '../components/Map'


export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDsPIUYokmkqE_gJRfHzsYDcyM3ib679bw',
    libraries: ['places'],
  })

  if (!isLoaded) return <LoadingSpinner />
  return <Map />
}
