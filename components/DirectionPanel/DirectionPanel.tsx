import React, { useState } from 'react'
import { useMapContext } from '../Map/MapContext'
import styles from './DirectionPanel.module.css'
import Draggable from 'react-draggable'
import { useCustomPlacesAutocomplete } from '../../utils/Hooks/PlacesAutoCompleteHook'
import convertCoordinatesToAddress from '../../utils/CoordToName'
import { getGeocode, getLatLng } from 'use-places-autocomplete'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import QuestionsPanel from "../QuestionsPanel/QuestionsPanel"

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

    const [selectedTransportationMode, setSelectedTransportationMode] = useState<string | null>(null);

    const [showQuestionsPanel, setShowQuestionsPanel] = useState(false);

    const handleShowQuestionsPanel = () => {
        setShowQuestionsPanel(true);
      };
   
      const handleQuestionsPanelClose = (selectedPriority: string | null) => {
        console.log('User selected priority:', selectedPriority);
        setShowQuestionsPanel(false);
    };

      

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

    const handleKeyDown = (e: { key: string; preventDefault: () => void }) => {
        if (e.key === 'Tab') {
            console.log('tab')
            e.preventDefault()
            setValue(destinationName as string)
            setDepartureAddressName(destinationName as string)
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
        setSelectedTransportationMode(icon.iconName);
    }

    let flagInput

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
                                        {data.map(
                                            ({ place_id, description }) => (
                                                <li
                                                    key={place_id}
                                                    className={
                                                        styles.suggestionItem
                                                    }
                                                    onClick={() =>
                                                        handleSelect(
                                                            description
                                                        )
                                                    }
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
                            >
                                &#8593;&#8595;
                            </button>

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
                                {status === 'OK' && false && (
                                    <ul className={styles.suggestionContainer}>
                                        {data.map(
                                            ({ place_id, description }) => (
                                                <li
                                                    key={place_id}
                                                    className={
                                                        styles.suggestionItem
                                                    }
                                                    onClick={() =>
                                                        handleSelect(
                                                            description
                                                        )
                                                    }
                                                >
                                                    {description}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                )}
                            </div>
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
                            className={`${styles.button} ${styles.setCourseButton}`} onClick={handleShowQuestionsPanel}
                        >
                            <FontAwesomeIcon
                                icon={faMapMarkedAlt}
                                className={styles.icon}
                            />
                            Find the best way to your destination
                        </button>
                        {showQuestionsPanel && (
                         <QuestionsPanel
                        onClose={handleQuestionsPanelClose}
                        selectedTransportationMode={selectedTransportationMode}
                        />
                        )}

                     
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