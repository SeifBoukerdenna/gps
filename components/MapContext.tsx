import React, { createContext, useContext, useState, useMemo } from 'react'
import { LatLngLiteral, DirectionsResult, MapOptions } from '../types'
import googleMapIds from '../googleMapIds.json'


const MapContext = createContext({} as {
  center: LatLngLiteral
  reloadKey: number
  darkMode: boolean
  toggleMapMode: () => void
  directions: DirectionsResult | undefined
})

// @ts-ignore
export const MapProvider = ({ children }) => {
    console.log("creating context")
  const [mapRef, setMapRef] = useState()
  const [center, setCenter] = useState({
    lat: 45.54772,
    lng: -73.72899,
  })
  const [reloadKey, setReloadKey] = useState(0)
  const [darkMode, setDarkMode] = useState(true)
  const [directions, setDirections] = useState()

  const toggleMapMode = () => {
    setDarkMode(!darkMode)
    setReloadKey(reloadKey + 1)
  }

    const options = useMemo<MapOptions>(
        () => ({
            mapId: darkMode
                ? googleMapIds['darkMode']
                : googleMapIds['lightMode'],
            disableDefaultUI: true,
            clickableIcons: true,
        }),
        [darkMode]
    )

  return (
    <MapContext.Provider
      value={{
        center,
        reloadKey,
        darkMode,
        toggleMapMode,
        directions,
      }}
    >
      {children}
    </MapContext.Provider>
  )
}

export const useMapContext = () => {
  return useContext(MapContext)
}
