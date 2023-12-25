import React, { useState } from 'react'
import axios from 'axios'

const LocationConverter: React.FC = () => {
    const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 })
    const [address, setAddress] = useState('')

    const handleConvert = async () => {
        try {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.lat},${coordinates.lng}&key=AIzaSyDsPIUYokmkqE_gJRfHzsYDcyM3ib679bw`
            )

            const formattedAddress =
                response.data.results[0]?.formatted_address ||
                'Address not found'
            setAddress(formattedAddress)
        } catch (error) {
            console.error('Error fetching place details:', error)
        }
    }

    return (
        <div>
            <label>
                Latitude:
                <input
                    type="number"
                    value={coordinates.lat}
                    onChange={(e) =>
                        setCoordinates({
                            ...coordinates,
                            lat: parseFloat(e.target.value),
                        })
                    }
                />
            </label>
            <br />
            <label>
                Longitude:
                <input
                    type="number"
                    value={coordinates.lng}
                    onChange={(e) =>
                        setCoordinates({
                            ...coordinates,
                            lng: parseFloat(e.target.value),
                        })
                    }
                />
            </label>
            <br />
            <button onClick={handleConvert}>Convert Coordinates</button>
            {address && <p>Converted Address: {address}</p>}
        </div>
    )
}

export default LocationConverter
