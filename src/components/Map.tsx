/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/Map.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { darkMapStyle, lightMapStyle } from '../styles/mapStyles';
import { LoadingSpinner } from './LoadingSpinner/LoadingSpinner';

const defaultCenter = { lat: 45.5017, lng: -73.5673 }; // Montreal coordinates
const API_KEY = "AIzaSyBq8xfUPRMt0k9w-8pBglhqHQ_xf4nZcLM"; // Replace with your actual API key

// Initialize Google Maps libraries
const libraries = ["places"];

interface MapProps {
    directions: google.maps.DirectionsResult | null;
    destination: google.maps.LatLng | null;
    startPoint: google.maps.LatLng | null;
    darkMode: boolean;
    mapClickMode: boolean;
    onMapClick: (location: google.maps.LatLng, address: string) => void;
}

export const Map: React.FC<MapProps> = ({
    directions,
    destination,
    startPoint,
    darkMode,
    mapClickMode,
    onMapClick
}) => {
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [clickMarker, setClickMarker] = useState<google.maps.LatLng | null>(null);
    const [mapStyle, setMapStyle] = useState<any[]>(darkMode ? darkMapStyle : lightMapStyle);

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: API_KEY,
        libraries: libraries as any,
        preventGoogleFontsLoading: false
    });

    // Update map style when dark mode changes with animation
    useEffect(() => {
        if (map) {
            // Add a slight delay for a smoother transition
            setTimeout(() => {
                setMapStyle(darkMode ? darkMapStyle : lightMapStyle);
            }, 300);
        }
    }, [darkMode, map]);

    // Apply map style when it changes
    useEffect(() => {
        if (map) {
            map.setOptions({ styles: mapStyle });
        }
    }, [mapStyle, map]);

    // Log when the Google Maps API is loaded
    useEffect(() => {
        if (isLoaded) {
            console.log("Google Maps API loaded successfully");
            window.googleMapsLoaded = true;
        }
    }, [isLoaded]);

    // Handle map click
    const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
        if (!mapClickMode || !e.latLng) return;

        setClickMarker(e.latLng);

        // Reverse geocode the clicked location
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: e.latLng }, (results, status) => {
            if (status === "OK" && results && results[0]) {
                const address = results[0].formatted_address;
                if (e.latLng) {
                    onMapClick(e.latLng, address);
                }
            } else {
                console.error("Geocoder failed due to: " + status);
            }
        });
    }, [mapClickMode, onMapClick]);

    // Handle map load
    const handleMapLoad = useCallback((mapInstance: google.maps.Map) => {
        setMap(mapInstance);
    }, []);

    // Handle loading errors
    if (loadError) {
        return (
            <div className="map-error">
                <div>Error loading Google Maps API: {loadError.message}</div>
            </div>
        );
    }

    // Show loading spinner
    if (!isLoaded) {
        return (
            <div className="map-loading">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="map-container">
            <GoogleMap
                mapContainerStyle={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
                }}
                center={defaultCenter}
                zoom={12}
                options={{
                    styles: mapStyle,
                    zoomControl: true,
                    mapTypeControl: false,
                    streetViewControl: false,
                    fullscreenControl: false,
                    gestureHandling: 'greedy',
                    disableDoubleClickZoom: mapClickMode
                }}
                onClick={handleMapClick}
                onLoad={handleMapLoad}
            >
                {directions && <DirectionsRenderer
                    directions={directions}
                    options={{
                        suppressMarkers: false,
                        polylineOptions: {
                            strokeColor: darkMode ? '#B794F4' : '#805AD5',
                            strokeWeight: 5,
                            strokeOpacity: 0.8
                        }
                    }}
                />}

                {destination && !directions && <Marker
                    position={destination}
                    animation={google.maps.Animation.DROP}
                    icon={{
                        url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                        scaledSize: new google.maps.Size(40, 40)
                    }}
                />}

                {startPoint && !directions && <Marker
                    position={startPoint}
                    animation={google.maps.Animation.DROP}
                    icon={{
                        url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
                        scaledSize: new google.maps.Size(40, 40)
                    }}
                />}

                {clickMarker && mapClickMode && <Marker
                    position={clickMarker}
                    animation={google.maps.Animation.BOUNCE}
                    icon={{
                        url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                        scaledSize: new google.maps.Size(40, 40)
                    }}
                />}
            </GoogleMap>
        </div>
    );
};

// Add the googleMapsLoaded property to the Window interface
declare global {
    interface Window {
        googleMapsLoaded?: boolean;
    }
}