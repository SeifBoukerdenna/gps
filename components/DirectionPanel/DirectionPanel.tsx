import React, { useEffect, useState } from 'react'
import { useMapContext } from '../Map/MapContext'
import styles from './DirectionPanel.module.css'
import Draggable from 'react-draggable'
import { useCustomPlacesAutocomplete } from '../../utils/Hooks/PlacesAutoCompleteHook'
import convertCoordinatesToAddress from '../../utils/CoordToName'
import { getGeocode, getLatLng } from 'use-places-autocomplete'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import useOnclickOutside from 'react-cool-onclickoutside'

import {
    faCar,
    faBus,
    faWalking,
    faPlane,
    faMap,
    faCompass,
    faMapMarkedAlt,
    faUser,
} from '@fortawesome/free-solid-svg-icons'

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
        selectedIcons,
        setSelectedIcons,
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
                    console.log('New Departure Address:', newPosition)
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
        ready: departureReady,
        value: departureValue,
        setValue: setDepartureValue,
        suggestions: { status: departureStatus, data: departureData },
        clearSuggestions: clearDepartureSuggestions,
    } = useCustomPlacesAutocomplete()

    const {
        ready: arrivalReady,
        value: arrivalValue,
        setValue: setArrivalValue,
        suggestions: { status: arrivalStatus, data: arrivalData },
        clearSuggestions: clearArrivalSuggestions,
    } = useCustomPlacesAutocomplete()

    const handleSelectDeparture = async (address: string) => {
        setDepartureValue(address, false)
        setDepartureAddressName(address)
        clearDepartureSuggestions()

        const results = await getGeocode({ address: address })
        const { lat, lng } = await getLatLng(results[0])
        setDepartureAddress({ lat, lng })
    }

    const handleSelectArrival = async (address: string) => {
        setArrivalValue(address, false)
        setDestinationName(address)
        clearArrivalSuggestions()

        const results = await getGeocode({ address: address })
        const { lat, lng } = await getLatLng(results[0])
        setDestination({ lat, lng })
    }

    const handleKeyDownDeparture = (e: {
        key: string
        preventDefault: () => void
    }) => {
        if (e.key === 'Tab') {
            console.log('tab')
            e.preventDefault()
            setDepartureValue(departureAddressName as string)
            setDepartureAddressName(departureAddressName as string)
        }
    }

    const handleKeyDownArrival = (e: {
        key: string
        preventDefault: () => void
    }) => {
        if (e.key === 'Tab') {
            console.log('tab')
            e.preventDefault()
            setArrivalValue(destinationName as string)
            setDestinationName(destinationName as string)
        }
    }

    const handleIconClick = (icon: IconDefinition) => {
        if (
            selectedIcons.some(
                (selectedIcon) => selectedIcon.iconName === icon.iconName
            )
        ) {
            setSelectedIcons(
                selectedIcons.filter(
                    (selectedIcon) => selectedIcon.iconName !== icon.iconName
                )
            )
        } else {
            setSelectedIcons([
                ...selectedIcons,
                { ...icon, iconName: icon.iconName },
            ])
        }
    }

    const refDeparture = useOnclickOutside(() => {
        clearDepartureSuggestions()
    })

    const refArrival = useOnclickOutside(() => {
        clearArrivalSuggestions()
    })

    useEffect(() => {
        setArrivalValue(destinationName as string)
    }, [destinationName, setArrivalValue])

    useEffect(() => {
        setDepartureValue(departureAddressName as string)
    }, [departureAddressName, setDepartureValue])

    const swapInfo = () => {
        const tempDepartureData = {
            address: departureAddress,
            addressName: departureAddressName,
            addressValue: departureValue,
        }
        const tempArrivalData = {
            address: destination,
            addressName: destinationName,
            addressValue: arrivalValue,
        }
        setDepartureAddress(tempArrivalData.address)
        setDepartureAddressName(tempArrivalData.addressName)

        setDestination(tempDepartureData.address)
        setDestinationName(tempDepartureData.addressName)
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
                        <div className={styles.groupTop}>
                            <button className={styles.button}>
                                <FontAwesomeIcon
                                    icon={faUser}
                                    className={styles.icon}
                                />
                            </button>

                            <div className={styles.groupIcons}>
                                <button
                                    className={styles.iconButton}
                                    onClick={() => handleIconClick(faBus)}
                                >
                                    <FontAwesomeIcon
                                        icon={faBus}
                                        className={`${styles.icon} ${
                                            selectedIcons.includes(faBus)
                                                ? styles.selectedIcon
                                                : ''
                                        }`}
                                    />
                                </button>
                                <button
                                    className={styles.iconButton}
                                    onClick={() => handleIconClick(faCar)}
                                >
                                    <FontAwesomeIcon
                                        icon={faCar}
                                        className={`${styles.icon} ${
                                            selectedIcons.includes(faCar)
                                                ? styles.selectedIcon
                                                : ''
                                        }`}
                                    />
                                </button>
                                <button
                                    className={styles.iconButton}
                                    onClick={() => handleIconClick(faPlane)}
                                >
                                    <FontAwesomeIcon
                                        icon={faPlane}
                                        className={`${styles.icon} ${
                                            selectedIcons.includes(faPlane)
                                                ? styles.selectedIcon
                                                : ''
                                        }`}
                                    />
                                </button>
                            </div>

                            <button
                                className={`${styles.button} ${styles.dismissButton}`}
                                onClick={handleDismiss}
                            >
                                &#8230;
                            </button>
                        </div>

                        <div className={styles.inputContainer}>
                            <div
                                ref={refDeparture}
                                className={styles.searchFormContainer}
                            >
                                <input
                                    type="text"
                                    placeholder={
                                        departureAddressName
                                            ? departureAddressName.toString()
                                            : 'Enter a departure'
                                    }
                                    className={styles.input}
                                    value={departureValue || ''}
                                    onChange={(e) => {
                                        setDepartureValue(e.target.value)
                                        setDepartureAddressName(e.target.value)
                                    }}
                                    onKeyDown={handleKeyDownDeparture}
                                    disabled={!departureReady}
                                />
                                {departureStatus === 'OK' && (
                                    <ul className={styles.suggestionContainer}>
                                        {departureData.map(
                                            ({ place_id, description }) => (
                                                <li
                                                    key={place_id}
                                                    className={
                                                        styles.suggestionItem
                                                    }
                                                    onClick={() => {
                                                        handleSelectDeparture(
                                                            description
                                                        )
                                                    }}
                                                >
                                                    {description}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                )}
                            </div>

                            <div
                                ref={refArrival}
                                className={styles.searchFormContainer}
                            >
                                <input
                                    type="text"
                                    placeholder={
                                        destinationName
                                            ? destinationName.toString()
                                            : 'Search your destination'
                                    }
                                    className={styles.input}
                                    value={arrivalValue || ''}
                                    onChange={(e) => {
                                        setArrivalValue(e.target.value)
                                        setDestinationName(e.target.value)
                                    }}
                                    onKeyDown={handleKeyDownArrival}
                                    disabled={!arrivalReady}
                                />
                                {arrivalStatus === 'OK' && (
                                    <ul className={styles.suggestionContainer}>
                                        {arrivalData.map(
                                            ({ place_id, description }) => (
                                                <li
                                                    key={place_id}
                                                    className={
                                                        styles.suggestionItem
                                                    }
                                                    onClick={() => {
                                                        handleSelectArrival(
                                                            description
                                                        )
                                                    }}
                                                >
                                                    {description}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                )}
                            </div>

                            <button
                                className={`${styles.button} ${styles.swapButton}`}
                                onClick={swapInfo}
                            >
                                &#8593;&#8595;
                            </button>
                        </div>

                        <button
                            className={`${styles.button} ${styles.getUserLocation}`}
                            onClick={handleLocateUser}
                        >
                            <FontAwesomeIcon
                                icon={faCompass}
                                className={styles.icon}
                            />
                            Use My Location
                        </button>
                        <button
                            className={`${styles.button} ${styles.setCourseButton}`}
                            onClick={() => {
                                console.log('Hello world')
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faMapMarkedAlt}
                                className={styles.icon}
                            />
                            Find the best way to your destination
                        </button>
                    </>
                )}
                {isDismissed && (
                    <button
                        className={`${styles.button} ${styles.expandButton}`}
                        onClick={handleExpand}
                    >
                        <FontAwesomeIcon
                            icon={faMapMarkedAlt}
                            className={styles.icon}
                        />
                    </button>
                )}
            </div>
        </Draggable>
    )
}

export default DirectionPanel
