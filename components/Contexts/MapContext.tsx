// components/Map/MapContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

interface MapContextProps {
    center: google.maps.LatLngLiteral
    setCenter: React.Dispatch<React.SetStateAction<google.maps.LatLngLiteral>>
    destination: google.maps.LatLngLiteral | null
    setDestination: React.Dispatch<
        React.SetStateAction<google.maps.LatLngLiteral | null>
    >
    setDestinationName: React.Dispatch<React.SetStateAction<string | null>>
    destinationName: string | null
    setInitialSearch: React.Dispatch<React.SetStateAction<boolean>>
    initialSearch: boolean
    departureAddressName: string | null
    setDepartureAddressName: React.Dispatch<React.SetStateAction<string | null>>
    departureAddress: google.maps.LatLngLiteral | null
    setDepartureAddress: React.Dispatch<
        React.SetStateAction<google.maps.LatLngLiteral | null>
    >
    selectedIcons: IconDefinition[]
    setSelectedIcons: React.Dispatch<React.SetStateAction<IconDefinition[]>>

    isFocused: boolean
    setIsFocused: React.Dispatch<React.SetStateAction<boolean>>

    defaultDepartureAdressName: string | null
    setDefaultDepartureAdressName: React.Dispatch<
        React.SetStateAction<string | null>
    >
}

const MapContext = createContext<MapContextProps>({} as MapContextProps)

export const useMapContext = () => useContext(MapContext)

interface MapProviderProps {
    children: React.ReactNode
}

export const MapProvider: React.FC<MapProviderProps> = ({ children }) => {
    const [selectedIcons, setSelectedIcons] = useState<IconDefinition[]>([])

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

    const [destinationName, setDestinationName] = useState<string | null>(null)

    const [initialSearch, setInitialSearch] = useState<boolean>(false)

    const [departureAddressName, setDepartureAddressName] = useState<
        string | null
    >(null)

    const [departureAddress, setDepartureAddress] =
        useState<google.maps.LatLngLiteral | null>(null)

    useEffect(() => {
        localStorage.setItem('userLocation', JSON.stringify(center))
    }, [center])

    const [isFocused, setIsFocused] = useState(false)

    const [defaultDepartureAdressName, setDefaultDepartureAdressName] =
        useState<string | null>(null)

    return (
        <MapContext.Provider
            value={{
                center,
                setCenter,
                destination,
                setDestination,
                destinationName,
                setDestinationName,
                initialSearch,
                setInitialSearch,
                departureAddressName,
                setDepartureAddressName,
                departureAddress,
                setDepartureAddress,
                selectedIcons,
                setSelectedIcons,
                isFocused,
                setIsFocused,
                defaultDepartureAdressName,
                setDefaultDepartureAdressName,
            }}
        >
            {children}
        </MapContext.Provider>
    )
}
