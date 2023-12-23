// components/Map/MapContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react'

interface MapContextProps {
    center: google.maps.LatLngLiteral
    setCenter: React.Dispatch<React.SetStateAction<google.maps.LatLngLiteral>>
    destination: google.maps.LatLngLiteral | null
    setDestination: React.Dispatch<
        React.SetStateAction<google.maps.LatLngLiteral | null>
    >
}

const MapContext = createContext<MapContextProps>({} as MapContextProps)

export const useMapContext = () => useContext(MapContext)

interface MapProviderProps {
    children: React.ReactNode
}

export const MapProvider: React.FC<MapProviderProps> = ({ children }) => {
    const getSavedLocation = (): google.maps.LatLngLiteral => {
        const savedLocation = localStorage.getItem('userLocation')
        if (savedLocation) {
            return JSON.parse(savedLocation)
        }
        return { lat: -34.397, lng: 150.644 } // default location
    }

    const [center, setCenter] = useState<google.maps.LatLngLiteral>(
        getSavedLocation()
    )

    const [destination, setDestination] =
        useState<google.maps.LatLngLiteral | null>(null)

    useEffect(() => {
        localStorage.setItem('userLocation', JSON.stringify(center))
    }, [center])

    return (
        <MapContext.Provider
            value={{ center, setCenter, destination, setDestination }}
        >
            {children}
        </MapContext.Provider>
    )
}
