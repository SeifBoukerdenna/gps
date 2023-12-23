// components/DirectionPanel/DirectionPanel.tsx

import React, { useState } from 'react'
import { useMapContext } from '../Map/MapContext'
import styles from './DirectionPanel.module.css'
import Draggable from 'react-draggable'

const DirectionPanel: React.FC = () => {
    const { center, setCenter, destination } = useMapContext()

    const handleLocateUser = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const newPosition = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    }
                    setCenter(newPosition)
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
    const [isExpanded, setIsExpanded] = useState(false)
    const handleDismiss = () => {
        setIsDismissed(true)
    }
    const handleExpand = () => {
        setIsDismissed(false)
    }

    const nodeRef = React.useRef(null)

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
                            Dismiss
                        </button>
                        <input
                            type="text"
                            placeholder="Departure Address"
                            className={styles.input}
                            // value={
                            //     center.lat.toString() +
                            //     '  ' +
                            //     center.lng.toString()
                            // }
                            // onChange={(e) => setDepartureAddress(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Arrival Address"
                            className={styles.input}
                            // value={}
                            // onChange={(e) => setArrivalAddress(e.target.value)}
                        />
                        <button
                            className={`${styles.button} ${styles.swapButton}`}
                        >
                            Swap
                        </button>
                        <button
                            className={`${styles.button} ${styles.setCourseButton}`}
                        >
                            Set Course
                        </button>
                        <button
                            className={`${styles.button} ${styles.getUserLocation}`}
                            onClick={handleLocateUser}
                        >
                            Get location
                        </button>
                        <div>{JSON.stringify(center)}</div>
                        <div>{JSON.stringify(destination)}</div>
                    </>
                )}
                {isDismissed && (
                    <button
                        className={`${styles.button} ${styles.expandButton}`}
                        onClick={handleExpand}
                    >
                        Expand
                    </button>
                )}
            </div>
        </Draggable>
    )
}

export default DirectionPanel
