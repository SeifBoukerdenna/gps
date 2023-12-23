import { DirectionsRenderer, GoogleMap, Marker } from '@react-google-maps/api'
import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { LatLngLiteral, DirectionsResult, MapOptions } from '../types'
import { MapProvider, useMapContext } from './MapContext'
import {
    placeHardcoded,
    ArrivalHardcoded,
    optionsDirectionRenderer,
} from '../utils/constants'


export default function Map() {

    const mapRef = useRef<GoogleMap>()
    //@ts-ignore
    const onLoad = useCallback((map) => (mapRef.current = map), [])


    const [newDepartureAddress, setNewDepartureAddress] =
        useState<google.maps.LatLngLiteral | null>()
    const [newDeparturePlace, setNewDeparturePlace] = useState<string | null>(
        null
    )

    const [newArrivalAddress, setNewArrivalAddress] = useState<
        google.maps.LatLngLiteral | undefined
    >(undefined)
    const [newArrivalPlace, setNewArrivalPlace] = useState<string | null>()

    const [directions, setDirections] =
        useState<google.maps.DirectionsResult | null>()

    // useEffect(() => {
    //     if (newArrivalAddress) {
    //         setCenter(newArrivalAddress)
    //     }
    // }, [newArrivalAddress])
    // const { center } = useMapContext();

    // const [center, setCenter] = useState({
    //     lat: 45.54772,
    //     lng: -73.72899,
    // })
    const { center } = useMapContext();


    return (



        <div className="container">
            <MapProvider>
            <GoogleMap
                mapContainerClassName="map-container"
                center={center}
                zoom={10}
                onLoad={onLoad}

                >
            </GoogleMap>
            </MapProvider>
            </div>

    )

}




