import { useEffect, useState } from 'react'
import { useDirectionContext } from '../../Contexts/DirectionContext'
import { useMapContext } from '../../Contexts/MapContext'
import styles from './ComparaisonPanel.module.css'
import { calculateRoutes, RouteInfo } from './CreateRoute'
import { mpgToLPer100km } from '../../utils/fuelConverter'
import {
    faClock,
    faMoneyBillAlt,
    faRoad,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSettingsContext } from '../../Contexts/SettingsContext'
import { fetchGasPrice } from '../../utils/fetchGazPrices'

const ComparaisonPanel = () => {
    const [gasPrice, setGasPrice] = useState<number | null>(null)

    const { setIsComparaisonPanel } = useDirectionContext()

    const { carInfoUser } = useSettingsContext()

    const { destination, departureAddress, setDirections, directions } =
        useMapContext()

    const [routesInfo, setRoutesInfo] = useState<RouteInfo[]>([])
    const [directionsResults, setDirectionsResults] = useState<
        google.maps.DirectionsResult[]
    >([])

    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const result = await calculateRoutes(
                    departureAddress!,
                    destination!,
                    google.maps.TravelMode.DRIVING
                )
                if (result) {
                    console.log('resultsss  ', result)
                    setRoutesInfo(result.routesInfo)
                    setDirectionsResults(result.result)
                }
            } catch (error) {
                console.error('Error fetching routes:', error)
            }
        }

        fetchRoutes()
    }, [departureAddress, destination])

    if (routesInfo[0]) {
        {
            Number(
                (
                    (mpgToLPer100km(carInfoUser?.combination_mpg || 10) / 100) *
                    parseFloat(routesInfo[0].distance) *
                    (gasPrice || 1.5)
                ).toFixed(2)
            )
        }

        console.log(
            (mpgToLPer100km(carInfoUser?.combination_mpg || 10) / 100) *
                parseFloat(routesInfo[0].distance.replace(/,/g, ''))
        )
        console.log('distance is ', routesInfo[0].distance)
    }

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
                                setDirections(directionsResults[0].routes[0])
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
                                <div className={styles.info}>
                                    <FontAwesomeIcon
                                        icon={faMoneyBillAlt}
                                        className={styles.icon}
                                    />
                                    Money:
                                    {Number(
                                        (
                                            (mpgToLPer100km(
                                                carInfoUser?.combination_mpg ||
                                                    10
                                            ) /
                                                100) *
                                            parseFloat(
                                                routesInfo[0].distance.replace(
                                                    /,/g,
                                                    ''
                                                )
                                            ) *
                                            (gasPrice || 1.5)
                                        ).toFixed(2)
                                    )}
                                    $
                                </div>
                            </div>
                        </div>

                        <div className={styles.separator}></div>
                        {routesInfo.length > 1 && (
                            <div
                                className={styles.rightColumn}
                                onClick={() => {
                                    setDirections(
                                        directionsResults[0].routes[1]
                                    )
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
                                    <div className={styles.info}>
                                        <FontAwesomeIcon
                                            icon={faMoneyBillAlt}
                                            className={styles.icon}
                                        />
                                        Money:
                                        {Number(
                                            (
                                                (mpgToLPer100km(
                                                    carInfoUser?.combination_mpg ||
                                                        10
                                                ) /
                                                    100) *
                                                parseFloat(
                                                    routesInfo[0].distance.replace(
                                                        /,/g,
                                                        ''
                                                    )
                                                ) *
                                                (gasPrice || 1.5)
                                            ).toFixed(2)
                                        )}
                                        $
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
