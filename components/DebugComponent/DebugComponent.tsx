// components/DebugComponent/DebugComponent.tsx
import React from 'react'
import { useMapContext } from '../Map/MapContext'
import styles from './DebugComponent.module.css'

const DebugComponent: React.FC = () => {
    const {
        center,
        destination,
        destinationName,
        initialSearch,
        departureAddressName,
        departureAddress,
        selectedIcons,
    } = useMapContext()

    return (
        <div className={styles.debugContainer}>
            <h2>Debug Information</h2>
            <div className={styles.debugItem}>
                <span>Center:</span>
                <pre>{JSON.stringify(center)}</pre>
            </div>
            <div className={styles.debugItem}>
                <span>Destination:</span>
                <pre>{JSON.stringify(destination)}</pre>
            </div>
            <div className={styles.debugItem}>
                <span>Destination Name:</span>
                <pre>{destinationName}</pre>
            </div>
            <div className={styles.debugItem}>
                <span>Initial Search:</span>
                <pre>{initialSearch.toString()}</pre>
            </div>
            <div className={styles.debugItem}>
                <span>Departure Address Name:</span>
                <pre>{departureAddressName}</pre>
            </div>
            <div className={styles.debugItem}>
                <span>Departure Address:</span>
                <pre>{JSON.stringify(departureAddress)}</pre>
            </div>
            <div className={styles.debugItem}>
                <span>Selected Mode</span>
                <ul>
                    {selectedIcons.map((icon, index) => (
                        <li key={index}>{icon.iconName}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default DebugComponent
