import React from 'react'
import { useLoadScript } from '@react-google-maps/api'
import { MapProvider } from '../components/Map/MapContext'

import DynamicFormRenderer from '../components/DynamicFormRenderer/DynamicFormRenderer'
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner'
import Map from '../components/Map/Map'
import SearchBarDepature from '../components/SearchBar/SearchBarDeparture'
import Parent from '../components/SearchBar/SearchBarParentTest'

export default function Home() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        libraries: ['places'],
    })

    if (!isLoaded) return <LoadingSpinner />

    return (
        <MapProvider>
            {/* <Map /> */}
            {/* <DynamicFormRenderer /> */}
            {/* <SearchBarDepature /> */}
            <Parent />
        </MapProvider>
    )
}
