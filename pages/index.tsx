// pages/index.tsx
import React from 'react'
import { useLoadScript } from '@react-google-maps/api'
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner'
import Map from '../components/Map/Map'
import DirectionPanel from '../components/DirectionPanel/DirectionPanel'
import SearchForm from '../components/SearchBar/SearchForm'
import { MapProvider } from '../components/Map/MapContext'

export const libraries = String(['places'])

export default function Home() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyDsPIUYokmkqE_gJRfHzsYDcyM3ib679bw',
        [libraries]: libraries,
    })

    if (!isLoaded) return <LoadingSpinner />

    return (
        <MapProvider>
            <Map />
            <SearchForm />
            <DirectionPanel />
        </MapProvider>
    )
}
