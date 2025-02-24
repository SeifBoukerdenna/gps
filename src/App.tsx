import React, { useState, useEffect } from 'react';
import { UserSettings, RouteInfoType } from './types/types';
import { Map } from './components/Map';
import { SearchBar } from './components/SearchBar';
import { StartPointInput } from './components/StartPointInput';
import { SettingsWidget } from './components/SettingsWidget';
import { AboutWidget } from './components/AboutWidget';
import { RouteInfo } from './components/RouteInfo';
import { ToggleButton } from './components/ToggleButton';
import { TipBanner } from './components/TipBanner';
import { WelcomeSplash } from './components/WelcomeSplash';
import { KeyboardShortcuts } from './components/KeyboardShortcuts';
import {
  Info,
  Settings,
  MapPin,
  RotateCcw,
  MousePointer,
  Keyboard,
  Sun,
  Moon
} from 'lucide-react';

// Emissions & route calculation utilities
import {
  calculateCO2Emissions,
  calculateTreeEquivalent,
  getEnvironmentalImpactRating
} from './utils/emissionsUtils';

import "./components/KeyboardShortcuts.css";
import "./components/EmissionsInfo.css";

const DEFAULT_SETTINGS: UserSettings = {
  car: {
    model: 'Toyota Corolla',
    fuelConsumption: 7.1, // L/100km or kWh/100km
    fuelType: 'gasoline'
  },
  homeAddress: 'Montreal, QC',
  favoriteAddresses: [],
  fuelPrice: 1.5,
  darkMode: false,
  showEmissions: true
};

const STORAGE_KEY = 'gps_app_settings';
const WELCOME_SHOWN_KEY = 'gps_welcome_shown';
const TIPS_DISMISSED_KEY = 'routewise_tips_dismissed';

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

  const [directionsError, setDirectionsError] = useState<string | null>(null);

  const [settings, setSettings] = useState<UserSettings>(loadSavedSettings());

  // Check if welcome screen has been shown before
  const [showWelcome, setShowWelcome] = useState(() => {
    return !localStorage.getItem(WELCOME_SHOWN_KEY);
  });

  // Tips visibility
  const [showTip, setShowTip] = useState(() => {
    return !localStorage.getItem(TIPS_DISMISSED_KEY);
  });

  const [startPoint, setStartPoint] = useState<google.maps.LatLng | null>(null);
  const [startAddress, setStartAddress] = useState<string>(settings.homeAddress);

  const [destination, setDestination] = useState<google.maps.LatLng | null>(null);
  const [destinationAddress, setDestinationAddress] = useState<string>('');

  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [routeInfo, setRouteInfo] = useState<RouteInfoType | null>(null);

  const [showSettings, setShowSettings] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showRouteInfo, setShowRouteInfo] = useState(false);
  const [alternativeRoutes, setAlternativeRoutes] = useState<RouteInfoType[]>([]);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);

  // Map click mode
  const [mapClickMode, setMapClickMode] = useState(false);
  const [clickUsedForDestination, setClickUsedForDestination] = useState(false);

  // Keyboard shortcuts panel
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);

  // Dark mode
  useEffect(() => {
    if (settings.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [settings.darkMode]);

  // Geocode the user's home address (start point) whenever settings.homeAddress changes
  useEffect(() => {
    setStartAddress(settings.homeAddress);
    if (settings.homeAddress) {
      geocodeAddress(settings.homeAddress).then((location) => {
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

  // If we have an existing route, recalculate it when settings change (like consumption or fuelType)
  // so that route widget auto-updates.
  const handleSettingsUpdate = (newSettings: UserSettings) => {
    setSettings(newSettings);
    // If we already have a route displayed, recalc
    if (startAddress && destinationAddress) {
      calculateRoute(startAddress, destinationAddress);
    }
  };

  // Handle welcome screen close
  const handleWelcomeClose = () => {
    setShowWelcome(false);
    localStorage.setItem(WELCOME_SHOWN_KEY, 'true');
  };

  // Toggle tips
  const toggleTips = () => {
    const newVal = !showTip;
    setShowTip(newVal);
    if (!newVal) {
      localStorage.setItem(TIPS_DISMISSED_KEY, 'true');
    } else {
      localStorage.removeItem(TIPS_DISMISSED_KEY);
    }
  };

  // Geocode a given address
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

  // Destination selection
  const handleDestinationSelect = async (address: string) => {
    setDestinationAddress(address);
    const location = await geocodeAddress(address);
    if (location) {
      setDestination(location);
      calculateRoute(startAddress, address);
    }
  };

  // Start point selection
  const handleStartPointSelect = async (address: string) => {
    setStartAddress(address);
    const location = await geocodeAddress(address);
    if (location) {
      setStartPoint(location);
      if (destinationAddress) {
        calculateRoute(address, destinationAddress);
      }
    }
  };

  // Set home as starting point
  const setHomeAsStart = () => {
    setStartAddress(settings.homeAddress);
    geocodeAddress(settings.homeAddress).then((location) => {
      if (location) {
        setStartPoint(location);
        if (destinationAddress) {
          calculateRoute(settings.homeAddress, destinationAddress);
        }
      }
    });
  };

  // Calculate route
  const calculateRoute = async (
    start: string | null,
    end: string | null
  ) => {
    if (!window.google) {
      console.error('Google Maps API not loaded');
      return;
    }
    if (!start || !end) return;

    try {
      const directionsService = new window.google.maps.DirectionsService();
      const result = await directionsService.route({
        origin: start,
        destination: end,
        travelMode: window.google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true
      });

      // Check if no route or an empty array
      if (!result.routes || result.routes.length === 0) {
        setDirectionsError('No possible road route could be found. Please check your addresses or try another mode.');
        // Clear existing data
        setDirections(null);
        setRouteInfo(null);
        setAlternativeRoutes([]);
        return;
      }

      // If we got here, we do have routes
      setDirectionsError(null); // clear any previous error
      setDirections(result);

      // Then build your RouteInfoType array as before
      const routes: RouteInfoType[] = result.routes.map((r) => {
        const distance = r.legs[0].distance?.value || 0;
        const duration = r.legs[0].duration?.text || '';

        const fuelCost =
          (distance / 1000) *
          (settings.car.fuelConsumption / 100) *
          settings.fuelPrice;

        const co2Emissions = calculateCO2Emissions(
          distance,
          settings.car.fuelConsumption,
          settings.car.fuelType
        );
        const emissionRating = getEnvironmentalImpactRating(co2Emissions);
        const treeEquivalent = calculateTreeEquivalent(co2Emissions);

        return {
          distance,
          duration,
          fuelCost,
          co2Emissions,
          emissionRating,
          treeEquivalent,
          route: result
        };
      });

      setAlternativeRoutes(routes);
      setRouteInfo(routes[0]);
      setSelectedRouteIndex(0);
      setShowRouteInfo(true);

    } catch (error) {
      console.error('Error calculating route:', error);
      setDirectionsError('Oops! Something went wrong retrieving the route.');
      // Clear any route data
      setDirections(null);
      setAlternativeRoutes([]);
      setRouteInfo(null);
    }
  };

  // Force route calculation from user clicking "Get Route" near the search bar
  const handleGetRouteClick = () => {
    calculateRoute(startAddress, destinationAddress);
  };

  // Select alternative route
  const selectRoute = (index: number) => {
    if (alternativeRoutes[index]) {
      setRouteInfo(alternativeRoutes[index]);
      setSelectedRouteIndex(index);

      // reorder directions so selected route is the primary
      if (directions) {
        const newDirections = { ...directions };
        if (newDirections.routes.length > index) {
          const selected = newDirections.routes[index];
          newDirections.routes = [
            selected,
            ...newDirections.routes.filter((_, i) => i !== index)
          ];
          setDirections(newDirections);
        }
      }
    }
  };

  // Reset everything
  const resetApp = () => {
    setSettings(DEFAULT_SETTINGS);
    setStartPoint(null);
    setStartAddress(DEFAULT_SETTINGS.homeAddress);
    setDestination(null);
    setDestinationAddress('');
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
    if (mapClickMode) {
      setClickUsedForDestination(false);
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setSettings({ ...settings, darkMode: !settings.darkMode });
  };

  // Toggle settings widget
  const toggleSettings = () => {
    setShowSettings(!showSettings);
    if (showAbout) setShowAbout(false);
    if (showKeyboardShortcuts) setShowKeyboardShortcuts(false);
  };

  // Toggle about widget
  const toggleAbout = () => {
    setShowAbout(!showAbout);
    if (showSettings) setShowSettings(false);
    if (showKeyboardShortcuts) setShowKeyboardShortcuts(false);
  };

  // Toggle route info
  const toggleRouteInfo = () => {
    if (routeInfo) {
      setShowRouteInfo(!showRouteInfo);
    }
  };

  // Toggle keyboard shortcuts
  const toggleKeyboardShortcuts = () => {
    setShowKeyboardShortcuts(!showKeyboardShortcuts);
    if (showSettings) setShowSettings(false);
    if (showAbout) setShowAbout(false);
  };

  // Close all panels
  const closeAllPanels = () => {
    if (showSettings) setShowSettings(false);
    if (showAbout) setShowAbout(false);
    if (showKeyboardShortcuts) setShowKeyboardShortcuts(false);
    if (showRouteInfo) setShowRouteInfo(false);
  };

  // Focus search
  const focusDestinationSearch = () => {
    const destInput = document.querySelector('.search-bar input') as HTMLInputElement;
    if (destInput) destInput.focus();
  };
  const focusStartPointSearch = () => {
    const startInput = document.querySelector('.start-point-input input') as HTMLInputElement;
    if (startInput) startInput.focus();
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don’t trigger if typing in input/textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      const key = e.key.toLowerCase();
      switch (key) {
        case 's':
          toggleSettings();
          break;
        case 'a':
          toggleAbout();
          break;
        case 'm':
          toggleMapClickMode();
          break;
        case 'd':
          toggleDarkMode();
          break;
        case 'h':
          setHomeAsStart();
          break;
        case 'r':
          resetApp();
          break;
        case 'escape':
          closeAllPanels();
          break;
        case '?':
          toggleKeyboardShortcuts();
          break;
        case 'f':
          if (e.shiftKey) {
            focusStartPointSearch();
          } else {
            focusDestinationSearch();
          }
          break;
        case '1':
        case '2':
        case '3':
          {
            const routeIndex = parseInt(key, 10) - 1;
            if (alternativeRoutes.length > routeIndex) {
              selectRoute(routeIndex);
            }
          }
          break;
        case 'c':
          // “Calculate route” keyboard shortcut
          if (startAddress && destinationAddress) {
            calculateRoute(startAddress, destinationAddress);
          }
          break;
        case 'i':
          toggleRouteInfo();
          break;
        case 't':
          toggleTips();
          break;
        // NEW: Toggle showEmissions with 'e'
        case 'e':
          setSettings({ ...settings, showEmissions: !settings.showEmissions });
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    toggleSettings,
    toggleAbout,
    toggleMapClickMode,
    toggleDarkMode,
    setHomeAsStart,
    resetApp,
    closeAllPanels,
    toggleKeyboardShortcuts,
    focusDestinationSearch,
    focusStartPointSearch,
    alternativeRoutes,
    toggleRouteInfo,
    toggleTips,
    startAddress,
    destinationAddress,
    settings
  ]);

  return (
    <div className={settings.darkMode ? 'dark-mode' : ''}>
      {showWelcome && <WelcomeSplash onClose={handleWelcomeClose} />}

      <Map
        directions={directions}
        destination={destination}
        startPoint={startPoint}
        darkMode={settings.darkMode}
        mapClickMode={mapClickMode}
        onMapClick={(loc, addr) => {
          if (clickUsedForDestination) {
            setStartAddress(addr);
            setStartPoint(loc);
            setClickUsedForDestination(false);
            if (destinationAddress) {
              calculateRoute(addr, destinationAddress);
            }
          } else {
            setDestinationAddress(addr);
            setDestination(loc);
            setClickUsedForDestination(true);
            if (startAddress) {
              calculateRoute(startAddress, addr);
            }
          }
        }}
      />

      {/* show an error banner or overlay if directionsError is not null */}
      {directionsError && (
        <div className="map-error" style={{ zIndex: 2 }}>
          <div
            style={{
              padding: '20px 30px',
              borderRadius: '12px',
              background: 'rgba(255, 0, 0, 0.1)',
              color: '#ff0033',
              fontWeight: 600,
              boxShadow: '0 6px 20px rgba(255, 0, 0, 0.2)'
            }}
          >
            {"Oops! Something went wrong. It looks like you tried to drive across the ocean! 🚗💨🌊 Maybe try a boat next time? 🛥️🐟"}
          </div>
        </div>
      )}

      <div
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 10
        }}
      >
        <StartPointInput
          initialValue={startAddress}
          onSelect={handleStartPointSelect}
        />

        <SearchBar
          value={destinationAddress}
          onSelect={handleDestinationSelect}
        />

        <button
          onClick={handleGetRouteClick}
          style={{
            position: "absolute",
            top: 20,
            left: 400,
            padding: '12px 16px',
            borderRadius: '10px',
            border: 'none',
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(5px)',
            cursor: 'pointer',
            fontWeight: 600,
            boxShadow: '0 15px 40px rgba(128, 90, 213, 0.15)',
            transition: 'transform 0.2s, box-shadow 0.2s, background 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
            e.currentTarget.style.background = 'rgba(240,240,240,0.9)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            e.currentTarget.style.background = 'rgba(255,255,255,0.9)';
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'scale(0.95)';
            e.currentTarget.style.background = 'rgba(220,220,220,0.9)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.background = 'rgba(240,240,240,0.9)';
          }}
        >
          Get Route
        </button>
      </div>

      {showTip && <TipBanner />}

      {/* Controls */}
      <div className="controls">
        <ToggleButton
          onClick={toggleMapClickMode}
          icon={<MapPin size={24} />}
          label="Map Click Mode"
          className={mapClickMode ? 'active' : ''}
        />
        <ToggleButton
          onClick={toggleAbout}
          icon={<Info size={24} />}
          label="About"
          className={showAbout ? 'active' : ''}
        />
        <ToggleButton
          onClick={toggleSettings}
          icon={<Settings size={24} />}
          label="Settings"
          className={showSettings ? 'active' : ''}
        />
        <ToggleButton
          onClick={toggleDarkMode}
          icon={settings.darkMode ? <Sun size={24} /> : <Moon size={24} />}
          label={settings.darkMode ? 'Light Mode' : 'Dark Mode'}
        />
        <ToggleButton
          onClick={toggleKeyboardShortcuts}
          icon={<Keyboard size={24} />}
          label="Keyboard Shortcuts"
          className={showKeyboardShortcuts ? 'active' : ''}
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
            ? 'Click on map to set the starting point'
            : 'Click on map to set the destination'}
        </div>
      )}

      {/* Widgets */}
      <SettingsWidget
        settings={settings}
        onUpdate={handleSettingsUpdate}
        visible={showSettings}
        onClose={() => setShowSettings(false)}
      />

      <AboutWidget
        visible={showAbout}
        onClose={() => setShowAbout(false)}
        onShowKeyboardShortcuts={toggleKeyboardShortcuts}
      />

      <KeyboardShortcuts
        visible={showKeyboardShortcuts}
        onClose={() => setShowKeyboardShortcuts(false)}
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
          showEmissions={settings.showEmissions}
          toggleEmissions={() =>
            setSettings({ ...settings, showEmissions: !settings.showEmissions })
          }
        />
      )}
    </div>
  );
};

export default App;
