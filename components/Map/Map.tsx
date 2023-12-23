// components/Map/Map.tsx
import React, { useMemo, useRef, useState } from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { useMapContext } from './MapContext'
import styles from './Map.module.css'
import { MapOptions } from '../../types'
import GoogleMapIds from '../../googleMapIds.json'

const containerStyle = {
    width: '100vw',
    height: '100vh',
}

const Map: React.FC = () => {
    const { center, setCenter, destination, setDestination } = useMapContext()
    const mapRef = useRef<google.maps.Map | null>(null)

    const handleMapClick = (e: google.maps.MapMouseEvent) => {
        const clickedLatlng = e.latLng?.toJSON() // Convert to LatLngLiteral
        if (clickedLatlng) {
            setDestination(clickedLatlng) // Set the new destination
            mapRef.current?.panTo(clickedLatlng) // Pan the map to the clicked location
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
                {/* Marker for the clicked (destination) position */}
                {destination && <Marker position={destination} />}
            </GoogleMap>
        </div>
    )
}

export default React.memo(Map)
