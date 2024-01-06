import React, { useEffect, useState } from 'react'
import { useLoadScript } from '@react-google-maps/api'
import { MapProvider } from '../components/Contexts/MapContext'
import { SettingsProvider } from '../components/Contexts/SettingsContext'

import DynamicFormRenderer from '../components/DynamicFormRenderer/DynamicFormRenderer'
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner'
import Map from '../components/Map/Map'
import DebugComponent from '../components/DebugComponent/DebugComponent'

export default function Home() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        libraries: ['places'],
    })

    const [showDebug, setShowDebug] = useState(false)

    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'Q') {
            setShowDebug((prev) => !prev)
        }
    }
    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress)
        return () => {
            window.removeEventListener('keydown', handleKeyPress)
        }
    }, [])

    if (!isLoaded) return <LoadingSpinner />

    return (
        <MapProvider>
            <Map />
            <SettingsProvider>
                <DynamicFormRenderer />
            </SettingsProvider>
            {showDebug && <DebugComponent />}
        </MapProvider>
    )
}

// Parent is for testing purposes only
