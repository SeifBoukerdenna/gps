// src/App.tsx
import React, { useState, useEffect } from 'react';
import { UserSettings, RouteInfoType } from './types/types';
import { Map } from './components/Map';
import { SearchBar } from './components/SearchBar';
import { StartPointInput } from './components/StartPointInput';
import { SettingsWidget } from './components/SettingsWidget';
import { AboutWidget } from './components/AboutWidget';
import { RouteInfo } from './components/RouteInfo';
import { ToggleButton } from './components/ToggleButton';
import { Info, Settings, MapPin, RotateCcw, MousePointer } from 'lucide-react';

// Default settings
const DEFAULT_SETTINGS: UserSettings = {
  car: { model: 'Toyota Corolla', fuelConsumption: 7.1 },
  homeAddress: 'Montreal, QC',
  favoriteAddresses: [],
  fuelPrice: 1.50,
  darkMode: true
};

// Local storage key
const STORAGE_KEY = 'gps_app_settings';

const App: React.FC = () => {
  // Load settings from localStorage if available
  const loadSavedSettings = (): UserSettings => {
    try {
      const savedSettings = localStorage.getItem(STORAGE_KEY);
      if (savedSettings) {
        return JSON.parse(savedSettings);
      }
    } catch (error) {
      console.error('Error loading settings from localStorage:', error);
    }
    return DEFAULT_SETTINGS;
  };

  const [settings, setSettings] = useState<UserSettings>(loadSavedSettings());

  const [startPoint, setStartPoint] = useState<google.maps.LatLng | null>(null);
  const [startAddress, setStartAddress] = useState<string>(settings.homeAddress);

  const [destination, setDestination] = useState<google.maps.LatLng | null>(null);
  const [destinationAddress, setDestinationAddress] = useState<string>("");

  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [routeInfo, setRouteInfo] = useState<RouteInfoType | null>(null);

  const [showSettings, setShowSettings] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showRouteInfo, setShowRouteInfo] = useState(false);
  const [alternativeRoutes, setAlternativeRoutes] = useState<RouteInfoType[]>([]);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);

  // New state for map click mode
  const [mapClickMode, setMapClickMode] = useState(false);
  const [clickUsedForDestination, setClickUsedForDestination] = useState(false);

  // Apply dark mode
  useEffect(() => {
    if (settings.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [settings.darkMode]);

  // Update starting point when settings change
  useEffect(() => {
    setStartAddress(settings.homeAddress);
    // Geocode the new home address
    if (settings.homeAddress) {
      geocodeAddress(settings.homeAddress).then(location => {
        if (location) {
          setStartPoint(location);
        }
      });
    }
  }, [settings.homeAddress]);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings to localStorage:', error);
    }
  }, [settings]);

  // Geocode an address to coordinates
  const geocodeAddress = async (address: string): Promise<google.maps.LatLng | null> => {
    if (!window.google) {
      console.error('Google Maps API not loaded');
      return null;
    }

    try {
      const geocoder = new window.google.maps.Geocoder();
      const geocodeResult = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
        geocoder.geocode({ address }, (results, status) => {
          if (status === 'OK' && results) {
            resolve(results);
          } else {
            reject(new Error(`Geocode was not successful: ${status}`));
          }
        });
      });

      if (geocodeResult.length > 0) {
        return geocodeResult[0].geometry.location;
      }
    } catch (error) {
      console.error('Error geocoding address:', error);
    }

    return null;
  };

  // Handle destination selection from search bar
  const handleDestinationSelect = async (address: string) => {
    setDestinationAddress(address);
    const location = await geocodeAddress(address);

    if (location) {
      setDestination(location);
      calculateRoute(startAddress, address);
    }
  };

  // Handle start point selection
  const handleStartPointSelect = async (address: string) => {
    setStartAddress(address);
    const location = await geocodeAddress(address);

    if (location) {
      setStartPoint(location);

      // If we have a destination, recalculate the route
      if (destinationAddress) {
        calculateRoute(address, destinationAddress);
      }
    }
  };

  // Handle map click
  const handleMapClick = async (location: google.maps.LatLng, address: string) => {
    if (clickUsedForDestination) {
      // If we already used a click for destination, use this one for start point
      setStartAddress(address);
      setStartPoint(location);
      setClickUsedForDestination(false);

      // Calculate route if we have both points
      if (destinationAddress) {
        calculateRoute(address, destinationAddress);
      }
    } else {
      // Use this click for destination
      setDestinationAddress(address);
      setDestination(location);
      setClickUsedForDestination(true);

      // Calculate route if we have a start point
      if (startAddress) {
        calculateRoute(startAddress, address);
      }
    }
  };

  // Calculate route between two addresses
  const calculateRoute = async (start: string, end: string) => {
    if (!window.google) {
      console.error('Google Maps API not loaded');
      return;
    }

    try {
      // Calculate route
      const directionsService = new window.google.maps.DirectionsService();

      const result = await directionsService.route({
        origin: start,
        destination: end,
        travelMode: window.google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true
      });

      setDirections(result);

      // Process main and alternative routes
      const routes: RouteInfoType[] = result.routes.map(route => {
        const distance = route.legs[0].distance?.value || 0;
        const duration = route.legs[0].duration?.text || '';

        const fuelCost = (distance / 1000) * (settings.car.fuelConsumption / 100) * settings.fuelPrice;

        return {
          distance,
          duration,
          fuelCost,
          route: result
        };
      });

      setAlternativeRoutes(routes);
      setRouteInfo(routes[0]);
      setSelectedRouteIndex(0);
      setShowRouteInfo(true);
    } catch (error) {
      console.error('Error calculating route:', error);
    }
  };

  // Select an alternative route
  const selectRoute = (index: number) => {
    if (alternativeRoutes[index]) {
      setRouteInfo(alternativeRoutes[index]);
      setSelectedRouteIndex(index);

      // Update the directions to show this route
      if (directions) {
        const newDirections = { ...directions };
        // Set the selected route as the first one to be displayed
        if (newDirections.routes.length > index) {
          const selectedRoute = newDirections.routes[index];
          newDirections.routes = [selectedRoute, ...newDirections.routes.filter((_, i) => i !== index)];
          setDirections(newDirections);
        }
      }
    }
  };

  // Reset app to initial state
  const resetApp = () => {
    setSettings(DEFAULT_SETTINGS);
    setStartPoint(null);
    setStartAddress(DEFAULT_SETTINGS.homeAddress);
    setDestination(null);
    setDestinationAddress("");
    setDirections(null);
    setRouteInfo(null);
    setShowRouteInfo(false);
    setAlternativeRoutes([]);
    setSelectedRouteIndex(0);
    setMapClickMode(false);
    setClickUsedForDestination(false);
    document.body.classList.remove('dark-mode');
    localStorage.removeItem(STORAGE_KEY);
  };

  // Toggle map click mode
  const toggleMapClickMode = () => {
    setMapClickMode(!mapClickMode);

    // Reset click state when turning off
    if (mapClickMode) {
      setClickUsedForDestination(false);
    }
  };

  return (
    <div className={settings.darkMode ? 'dark-mode' : ''}>
      <Map
        directions={directions}
        destination={destination}
        startPoint={startPoint}
        darkMode={settings.darkMode}
        mapClickMode={mapClickMode}
        onMapClick={handleMapClick}
      />

      {/* Reordered input fields - starting point first, then destination */}
      <StartPointInput
        initialValue={startAddress}
        onSelect={handleStartPointSelect}
      />

      <SearchBar
        value={destinationAddress}
        onSelect={handleDestinationSelect}
      />

      {/* Reordered buttons - Map, then Info, then Settings */}
      <div className="controls">
        <ToggleButton
          onClick={toggleMapClickMode}
          icon={<MapPin size={24} />}
          label="Map Click Mode"
          className={mapClickMode ? 'active' : ''}
        />
        <ToggleButton
          onClick={() => setShowAbout(!showAbout)}
          icon={<Info size={24} />}
          label="About"
        />
        <ToggleButton
          onClick={() => setShowSettings(!showSettings)}
          icon={<Settings size={24} />}
          label="Settings"
        />
      </div>

      <button onClick={resetApp} className="reset-button">
        <RotateCcw size={18} />
        Reset App
      </button>

      {mapClickMode && (
        <div className={`map-click-instructions ${mapClickMode ? 'active' : ''}`}>
          <MousePointer size={16} style={{ marginRight: '8px' }} />
          {clickUsedForDestination
            ? "Click on map to set the starting point"
            : "Click on map to set the destination"}
        </div>
      )}

      <SettingsWidget
        settings={settings}
        onUpdate={setSettings}
        visible={showSettings}
        onClose={() => setShowSettings(false)}
      />

      <AboutWidget
        visible={showAbout}
        onClose={() => setShowAbout(false)}
      />

      {routeInfo && (
        <RouteInfo
          route={routeInfo}
          car={settings.car}
          visible={showRouteInfo}
          onClose={() => setShowRouteInfo(false)}
          alternativeRoutes={alternativeRoutes}
          selectedRouteIndex={selectedRouteIndex}
          onSelectRoute={selectRoute}
        />
      )}
    </div>
  );
};

export default App;