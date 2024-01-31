import React, { useEffect, useMemo, useRef, useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useMapContext } from '../../Contexts/MapContext';
import styles from './Map.module.css';
import { MapOptions } from '../../types';
import GoogleMapIds from '../../googleMapIds.json';
import convertCoordinatesToAddress from '../../utils/CoordToName';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { useSettingsContext } from '../../Contexts/SettingsContext';
import Joyride from 'reactour';
import SettingsPanel from '../SettingsPanel/SettingsPanel';

const containerStyle = {
  width: '100vw',
  height: '100vh',
};

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
    directions,
  } = useMapContext();

  const mapRef = useRef<google.maps.Map | null>(null);

  const handleMapClick = async (e: google.maps.MapMouseEvent) => {
    const clickedLatlng = e.latLng?.toJSON(); // Convert to LatLngLiteral
    if (clickedLatlng) {
      const namedAdress = await convertCoordinatesToAddress(
        e.latLng?.toJSON() as google.maps.LatLngLiteral
      );
      setDestination(clickedLatlng);
      setDestinationName(namedAdress);

      mapRef.current?.panTo(clickedLatlng);
    }
  };

  const options = useMemo<MapOptions>(
    () => ({
      mapId: GoogleMapIds['darkMode'],
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  const onLoad = (mapInstance: google.maps.Map) => {
    mapRef.current = mapInstance;
  };

  const polylineRef = useRef<google.maps.Polyline | null>(null);

  useEffect(() => {
    if (polylineRef.current) {
      polylineRef.current.setMap(null);
    }
    if (directions) {
      const line = new google.maps.Polyline({
        path: directions.overview_path,
        strokeColor: '#151F6D',
        strokeOpacity: 1.1,
        strokeWeight: 3,
      });

      line.setMap(mapRef.current);
      polylineRef.current = line;
    }
  }, [directions]);

  useEffect(() => {
    if (polylineRef.current) {
      polylineRef.current.setMap(null);
    }
  }, [destination, departureAddress, departureAddressName]);

  const { setIsSettingsVisible, isSettingsVisible } = useSettingsContext();

  const [tourSteps, setTourSteps] = useState([
    {
      target: '.settings-button',
      content: 'Click here to open settings and select the car you want to use.',
      continuous: true,
      showSkipButton: true,
      run: isSettingsVisible,
    },
  ]);

  const handleTourEnd = () => {
    // You can perform any action when the tour ends
  };

  return (
    <div className={styles.mapContainer}>
      <Joyride steps={tourSteps} />
      <button
        className={`${styles.button} settings-button`}
        onClick={() => {
          setIsSettingsVisible(!isSettingsVisible);
        }}
      >
        <FontAwesomeIcon icon={faCog} className={styles.icon} />
      </button>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        onClick={handleMapClick}
        onLoad={onLoad}
        options={options}
      >
        {departureAddress && departureAddressName && (
          <Marker
            position={departureAddress}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 15,
              fillColor: 'red',
              fillOpacity: 1,
              strokeColor: 'white',
              strokeWeight: 2,
            }}
          />
        )}
        {destination && <Marker position={destination} />}
        {directions && <div>{directions.toString()}</div>}
      </GoogleMap>
      {isSettingsVisible && <SettingsPanel />}
    </div>
  );
};

export default React.memo(Map);
