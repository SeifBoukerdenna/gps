import { useEffect, useState } from 'react'
import { useDirectionContext } from '../../Contexts/DirectionContext'
import { useMapContext } from '../../Contexts/MapContext'
import styles from './ComparaisonPanel.module.css'
import { calculateRoutes, RouteInfo } from './CreateRoute'
import {
    faClock,
    faMoneyBillAlt,
    faRoad,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ComparaisonPanel = () => {
    const { setIsComparaisonPanel } = useDirectionContext()

    const { destination, departureAddress, setDirections, directions } =
        useMapContext()

    const [routesInfo, setRoutesInfo] = useState<RouteInfo[] | undefined>(
        undefined
    )
    const [directionsResults, setDirectionsResults] = useState<
        google.maps.DirectionsResult[] | undefined
    >(undefined)

    let arrayDestination: google.maps.DirectionsResult[]

    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const result = await calculateRoutes(
                    departureAddress!,
                    destination!,
                    google.maps.TravelMode.DRIVING
                )
                if (result) {
                    console.log('results:: ', result)
                    setRoutesInfo(result.routesInfo || [])
                    setDirectionsResults(result.result || [])
                    setDirections(result.result)
                }
            } catch (error) {
                console.error('Error calculating routes:', error)
            }
        }

        fetchRoutes()
    }, [destination, departureAddress])

    return (
        <>
            <>
                {routesInfo && routesInfo.length > 0 && directionsResults && (
                    <div className={styles.container}>
                        <button
                            className={styles.closeButton}
                            onClick={() => setIsComparaisonPanel(false)}
                        >
                            &times;
                        </button>
                        <div
                            className={styles.leftColumn}
                            onClick={() => {
                                console.log('LEFTCOLUMN')
                                setDirections(
                                    directionsResults[0] as google.maps.DirectionsResult
                                )
                                // console.log(directionsResults)
                                console.log('directions ', typeof directions)
                            }}
                        >
                            <div className={styles.column}>
                                <div className={styles.columnTitle}>
                                    Option 1
                                </div>
                                <div className={styles.info}>
                                    <FontAwesomeIcon
                                        icon={faClock}
                                        className={styles.icon}
                                    />
                                    Time: {routesInfo[0].duration}
                                </div>
                                <div className={styles.info}>
                                    <FontAwesomeIcon
                                        icon={faRoad}
                                        className={styles.icon}
                                    />
                                    Distance: {routesInfo[0].distance}
                                </div>
                                {/* {routesInfo[0].steps &&
                                    routesInfo[0].steps.length > 0 && (
                                        <div className={styles.info}>
                                            Steps:{' '}
                                            {routesInfo[0].steps.join(', ')}
                                        </div>
                                    )} */}
                                <div className={styles.info}>
                                    <FontAwesomeIcon
                                        icon={faMoneyBillAlt}
                                        className={styles.icon}
                                    />
                                    Money: $10
                                </div>
                            </div>
                        </div>

                        <div className={styles.separator}></div>
                        {routesInfo.length > 1 && (
                            <div
                                className={styles.rightColumn}
                                onClick={() => {
                                    console.log('right columnnn')
                                }}
                            >
                                <div className={styles.column}>
                                    <div className={styles.columnTitle}>
                                        Option 2
                                    </div>
                                    <div className={styles.info}>
                                        <FontAwesomeIcon
                                            icon={faClock}
                                            className={styles.icon}
                                        />
                                        Time: {routesInfo[1].duration}
                                    </div>
                                    <div className={styles.info}>
                                        <FontAwesomeIcon
                                            icon={faRoad}
                                            className={styles.icon}
                                        />
                                        Distance: {routesInfo[1].distance}
                                    </div>
                                    {/* {routesInfo[1].steps &&
                                        routesInfo[1].steps.length > 0 && (
                                            <div className={styles.info}>
                                                Steps:{' '}
                                                {routesInfo[1].steps.join(', ')}
                                            </div>
                                        )} */}
                                    <div className={styles.info}>
                                        <FontAwesomeIcon
                                            icon={faMoneyBillAlt}
                                            className={styles.icon}
                                        />
                                        Money: $15
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </>
        </>
    )
}

export default ComparaisonPanel
