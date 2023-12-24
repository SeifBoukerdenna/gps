import React from 'react'
import { useLoadScript } from '@react-google-maps/api'
import { MapProvider } from '../components/Map/MapContext'
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner'
import Map from '../components/Map/Map'
import DirectionPanel from '../components/DirectionPanel/DirectionPanel'
import SearchForm from '../components/SearchForm/SearchForm'

export const libraries = String(['places'])

export default function Home() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyDsPIUYokmkqE_gJRfHzsYDcyM3ib679bw',
        libraries: ['places'],
    })

    if (!isLoaded) return <LoadingSpinner />

    return (
        <MapProvider>
            <Map />
            {/* ADD THE AUTOCOMPLETE COMPONENET HERE */}
            <SearchForm />
            <DirectionPanel />
        </MapProvider>
    )
}
