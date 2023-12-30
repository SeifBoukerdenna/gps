// components/Map/Map.tsx
import React, { useMemo, useRef, useState } from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { useMapContext } from './MapContext'
import styles from './Map.module.css'
import { MapOptions } from '../../types'
import GoogleMapIds from '../../googleMapIds.json'
import convertCoordinatesToAddress from '../../utils/CoordToName'
import { useCustomPlacesAutocomplete } from '../../utils/Hooks/PlacesAutoCompleteHook'

const containerStyle = {
    width: '100vw',
    height: '100vh',
}

const Map: React.FC = () => {
    const {
        center,
        destination,
        setDestination,
        setDestinationName,
        departureAddress,
        departureAddressName,
        setDepartureAddress,
        setDepartureAddressName,
    } = useMapContext()

    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = useCustomPlacesAutocomplete()

    const mapRef = useRef<google.maps.Map | null>(null)

    const handleMapClick = async (e: google.maps.MapMouseEvent) => {
        const clickedLatlng = e.latLng?.toJSON() // Convert to LatLngLiteral
        if (clickedLatlng) {
            const namedAdress = await convertCoordinatesToAddress(
                e.latLng?.toJSON() as google.maps.LatLngLiteral
            )
            setDestination(clickedLatlng)
            setDestinationName(namedAdress)

            mapRef.current?.panTo(clickedLatlng)
        }
    }

    const options = useMemo<MapOptions>(
        () => ({
            mapId: GoogleMapIds['darkMode'],
            disableDefaultUI: true,
            clickableIcons: false,
        }),
        []
    )

    const onLoad = (mapInstance: google.maps.Map) => {
        mapRef.current = mapInstance
    }

    return (
        <div className={styles.mapContainer}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={13}
                onClick={handleMapClick}
                onLoad={onLoad}
                options={options}
            >
                {departureAddress && (
                    <Marker
                        position={departureAddress}
                        icon={{
                            path: google.maps.SymbolPath.CIRCLE,
                            scale: 10,
                            fillColor: '#4285F4',
                            fillOpacity: 1,
                            strokeColor: 'white',
                            strokeWeight: 2,
                        }}
                    />
                )}
                {destination && <Marker position={destination} />}
            </GoogleMap>
        </div>
    )
}

export default React.memo(Map)
