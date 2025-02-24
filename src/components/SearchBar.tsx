// src/components/SearchBar.tsx
import React, { useEffect, useState } from 'react';
import usePlacesAutocomplete from 'use-places-autocomplete';
import { Search } from 'lucide-react';

export const SearchBar: React.FC<{
    value?: string;
    onSelect: (address: string) => void
}> = ({ value = "", onSelect }) => {
    const [isPlacesApiReady, setIsPlacesApiReady] = useState(false);

    // Check if Google Maps Places API is loaded
    useEffect(() => {
        const checkGoogleMapsLoaded = () => {
            if (window.google && window.google.maps && window.google.maps.places) {
                console.log("Google Places API is loaded");
                setIsPlacesApiReady(true);
                return true;
            }
            return false;
        };

        if (checkGoogleMapsLoaded()) return;

        // If not loaded yet, set up a polling interval to check
        const interval = setInterval(() => {
            if (checkGoogleMapsLoaded()) {
                clearInterval(interval);
            }
        }, 500);

        return () => clearInterval(interval);
    }, []);

    // Only initialize usePlacesAutocomplete when the API is ready
    const placesProps = usePlacesAutocomplete({
        requestOptions: {},
        debounce: 300,
        cache: 24 * 60 * 60,
        initOnMount: isPlacesApiReady,
        defaultValue: value
    });

    const {
        value: inputValue,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = placesProps;

    // Update the value when the prop changes (from map click)
    useEffect(() => {
        if (value !== inputValue) {
            setValue(value, false);
        }
    }, [value, setValue]);

    const handleSelect = async (description: string) => {
        clearSuggestions();
        setValue(description, false);
        onSelect(description);
    };

    return (
        <div className="search-bar">
            <div className="input-wrapper">
                <div className="input-icon">
                    <Search size={18} color="#805AD5" />
                </div>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Enter destination..."
                    className="search-input"
                />
            </div>

            {status === "OK" && (
                <ul className="search-results">
                    {data.map((suggestion) => (
                        <li
                            key={suggestion.place_id}
                            onClick={() => handleSelect(suggestion.description)}
                            className="search-result-item"
                        >
                            {suggestion.description}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};