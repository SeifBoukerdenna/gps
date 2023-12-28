import React, { useState } from 'react'
import { useMapContext } from '../Map/MapContext'
import styles from './DirectionPanel.module.css'
import Draggable from 'react-draggable'
import { useCustomPlacesAutocomplete } from '../../utils/Hooks/PlacesAutoCompleteHook'
import convertCoordinatesToAddress from '../../utils/CoordToName'
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from '@reach/combobox'
import '@reach/combobox/styles.css'
import { getGeocode, getLatLng } from 'use-places-autocomplete'

const DirectionPanel: React.FC = () => {
    const {
        center,
        setCenter,
        destination,
        destinationName,
        setDestination,
        setDestinationName,
        setDepartureAddressName,
        setDepartureAddress,
        departureAddressName,
        departureAddress,
    } = useMapContext()

    const handleLocateUser = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const newPosition = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    }

                    const nameAddressUser = await convertCoordinatesToAddress(
                        newPosition
                    )
                    setCenter(newPosition)
                    setDepartureAddress(newPosition)
                    setDepartureAddressName(nameAddressUser)
                },
                () => {
                    console.log('Geolocation permission denied or unavailable.')
                }
            )
        } else {
            console.log('Geolocation is not supported by your browser.')
        }
    }

    const [isDismissed, setIsDismissed] = useState(false)
    const handleDismiss = () => {
        setIsDismissed(true)
    }
    const handleExpand = () => {
        setIsDismissed(false)
    }

    const nodeRef = React.useRef(null)

    const {
        ready,
        value,
        setValue, // Now you can use setValue in this component
        suggestions: { status, data },
        clearSuggestions,
    } = useCustomPlacesAutocomplete()

    const handleSelect = async (address: string) => {
        setValue(address, false)
        clearSuggestions()

        const results = await getGeocode({ address: address })
        const { lat, lng } = await getLatLng(results[0])
        setDepartureAddress({ lat, lng })
    }

    const handleSelectDeparture = async (address: string) => {
        setDepartureAddressName(address)
        // clearSuggestions()
    }

    const handleKeyDown = (e: { key: string; preventDefault: () => void }) => {
        if (e.key === 'Tab') {
            console.log('tab')
            e.preventDefault()
            setValue(destinationName as string)
            setDepartureAddressName(destinationName as string)
        }
    }

    return (
        <Draggable nodeRef={nodeRef}>
            <div
                ref={nodeRef}
                className={`${styles.panel} ${
                    isDismissed ? styles.dismissed : ''
                }`}
            >
                {!isDismissed && (
                    <>
                        <button
                         className={`${styles.button} ${styles.dismissButton}`}
                         onClick={handleDismiss}
                        >
                        {/* Use the Unicode character for minimize icon */}
                         &#8230;
                        </button>


                        <div className={styles.searchFormContainer}>
                            <input
                                type="text"
                                placeholder={
                                    departureAddressName
                                        ? departureAddressName.toString()
                                        : 'Enter a departure'
                                }
                                className={styles.input}
                                value={value}
                                onChange={(e) => {
                                    setValue(e.target.value)
                                    setDepartureAddressName(e.target.value)
                                }}
                                onKeyDown={handleKeyDown}
                                // disabled={!ready}
                            />
                            {status === 'OK' && (
                                <ul className={styles.suggestionContainer}>
                                    {data.map(({ place_id, description }) => (
                                        <li
                                            key={place_id}
                                            className={styles.suggestionItem}
                                            onClick={() =>
                                                handleSelect(description)
                                            }
                                        >
                                            {description}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className={styles.searchFormContainer}>
                            <input
                                type="text"
                                placeholder={
                                    destinationName
                                        ? destinationName.toString()
                                        : 'Search your destination'
                                }
                                className={styles.input}
                                // value={destinationName as string}
                                onChange={(e) => {
                                    // setValue(e.target.value)
                                    setDestinationName(e.target.value)
                                }}
                                onKeyDown={handleKeyDown}
                                // disabled={!ready}
                            />
                            {status === 'OK' && (
                                <ul className={styles.suggestionContainer}>
                                    {data.map(({ place_id, description }) => (
                                        <li
                                            key={place_id}
                                            className={styles.suggestionItem}
                                            onClick={() =>
                                                handleSelect(description)
                                            }
                                        >
                                            {description}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <button
                            className={`${styles.button} ${styles.swapButton}`}
                        >
                           &#8593;&#8595;
                        </button>
                        <button
                            className={`${styles.button} ${styles.setCourseButton}`}
                        >
                            Find the best way to your destination
                        </button>
                        <button
                            className={`${styles.button} ${styles.getUserLocation}`}
                            onClick={handleLocateUser}
                        >
                            Use My Location
                        </button>
                    </>
                )}
                {isDismissed && (
                    <button
                        className={`${styles.button} ${styles.expandButton}`}
                        onClick={handleExpand}
                    >
                        +
                    </button>
                )}
            </div>
        </Draggable>
    )
}

export default DirectionPanel
