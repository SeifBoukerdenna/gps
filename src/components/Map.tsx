// src/components/Map.tsx
import React, { useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { darkMapStyle, lightMapStyle } from '../styles/mapStyles';

const defaultCenter = { lat: 45.5017, lng: -73.5673 }; // Montreal coordinates
const API_KEY = "AIzaSyBq8xfUPRMt0k9w-8pBglhqHQ_xf4nZcLM"; // Replace with your actual API key

// Initialize Google Maps libraries
const libraries = ["places"];

interface MapProps {
    directions: google.maps.DirectionsResult | null;
    destination: google.maps.LatLng | null;
    darkMode: boolean;
}

export const Map: React.FC<MapProps> = ({ directions, destination, darkMode }) => {
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: API_KEY,
        libraries: libraries as any,
        preventGoogleFontsLoading: false
    });

    // Log when the Google Maps API is loaded
    useEffect(() => {
        if (isLoaded) {
            console.log("Google Maps API loaded successfully");
            // Add a global flag to indicate Google Maps is loaded
            window.googleMapsLoaded = true;
        }
    }, [isLoaded]);

    // Handle loading errors
    if (loadError) {
        return (
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{ color: 'red' }}>
                    Error loading Google Maps API: {loadError.message}
                </div>
            </div>
        );
    }

    // Show loading spinner
    if (!isLoaded) {
        return (
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div className="loading-spinner"></div>
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
                    styles: darkMode ? darkMapStyle : lightMapStyle,
                    zoomControl: true,
                    mapTypeControl: false,
                    streetViewControl: false,
                    fullscreenControl: false,
                    gestureHandling: 'greedy' // Makes the map capture all pan and zoom gestures
                }}
            >
                {directions && <DirectionsRenderer directions={directions} />}
                {destination && <Marker position={destination} />}
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