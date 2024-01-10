import React, { useEffect, useState } from 'react'
import { useLoadScript } from '@react-google-maps/api'
import { MapProvider } from '../Contexts/MapContext'
import { SettingsProvider } from '../Contexts/SettingsContext'
import {
    DirectionContextProvider,
    useDirectionContext,
} from '../Contexts/DirectionContext'
import DynamicFormRenderer from '../components/DynamicFormRenderer/DynamicFormRenderer'
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner'
import Map from '../components/Map/Map'
import DebugComponent from '../components/DebugComponent/DebugComponent'
import { calculateRoutes } from '../components/ComparaisonPanel/CreateRoute'
import ComparaisonPanel from '../components/ComparaisonPanel/ComparaisonPanel'
import PanelController from '../components/DynamicFormRenderer/PanelController'
export default function Home() {
    const { isLoaded, loadError } = useLoadScript({
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

    // useEffect(() => {
    //     if (isLoaded && !loadError) {
    //         // Code that uses the google object
    //         calculateRoutes(
    //             { lat: 45.5477287, lng: -73.7290324 },
    //             { lat: 45.55014781726532, lng: -73.75486371401367 },
    //             google.maps.TravelMode.DRIVING
    //         )
    //     }
    // }, [isLoaded, loadError])

    if (!isLoaded) return <LoadingSpinner />

    return (
        <MapProvider>
            <DirectionContextProvider>
                <Map />
                <SettingsProvider>
                    <DynamicFormRenderer />
                    <PanelController />
                    {showDebug && <DebugComponent />}
                </SettingsProvider>
            </DirectionContextProvider>
        </MapProvider>
    )
}
