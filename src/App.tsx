// src/App.tsx
import React, { useState, useEffect } from 'react';
import { UserSettings, RouteInfoType } from './types/types';
import { Map } from './components/Map';
import { SearchBar } from './components/SearchBar';
import { SettingsWidget } from './components/SettingsWidget';
import { AboutWidget } from './components/AboutWidget';
import { RouteInfo } from './components/RouteInfo';
import { ToggleButton } from './components/ToggleButton';
import { Info, Settings } from 'lucide-react';

const App: React.FC = () => {
  const [settings, setSettings] = useState<UserSettings>({
    car: { model: 'Toyota Corolla', fuelConsumption: 7.1 },
    homeAddress: 'Montreal, QC',
    favoriteAddresses: [],
    fuelPrice: 1.50,
    darkMode: false
  });

  const [destination, setDestination] = useState<google.maps.LatLng | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [routeInfo, setRouteInfo] = useState<RouteInfoType | null>(null);

  const [showSettings, setShowSettings] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showRouteInfo, setShowRouteInfo] = useState(false);
  const [alternativeRoutes, setAlternativeRoutes] = useState<RouteInfoType[]>([]);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);

  // Apply dark mode
  useEffect(() => {
    if (settings.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [settings.darkMode]);

  const calculateRoute = async (address: string) => {
    if (!window.google) {
      console.error('Google Maps API not loaded');
      return;
    }

    try {
      // First, geocode the address to get coordinates
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
        const location = geocodeResult[0].geometry.location;
        setDestination(location);
      }

      // Then calculate route
      const directionsService = new window.google.maps.DirectionsService();

      const result = await directionsService.route({
        origin: settings.homeAddress || 'Montreal, QC',
        destination: address,
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

  return (
    <div className={settings.darkMode ? 'dark-mode' : ''}>
      <Map
        directions={directions}
        destination={destination}
        darkMode={settings.darkMode}
      />

      <SearchBar onSelect={calculateRoute} />

      <div className="controls">
        <ToggleButton
          onClick={() => setShowSettings(!showSettings)}
          icon={<Settings size={24} />}
          label="Settings"
        />
        <ToggleButton
          onClick={() => setShowAbout(!showAbout)}
          icon={<Info size={24} />}
          label="About"
        />
      </div>

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
        <>
          <RouteInfo
            route={routeInfo}
            car={settings.car}
            visible={showRouteInfo}
            onClose={() => setShowRouteInfo(false)}
          />

          {alternativeRoutes.length > 1 && (
            <div className="widget route-alternatives">
              <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>Alternative Routes:</p>
              <div className="route-buttons">
                {alternativeRoutes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => selectRoute(index)}
                    className={`route-button ${selectedRouteIndex === index ? 'selected' : ''}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;