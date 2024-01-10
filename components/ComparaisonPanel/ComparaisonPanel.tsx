import { useDirectionContext } from '../../Contexts/DirectionContext'
import styles from './ComparaisonPanel.module.css'
import { calculateRoutes } from './CreateRoute'
import {
    faClock,
    faMoneyBillAlt,
    faRoad,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ComparaisonPanel = () => {
    // calculateRoutes(
    //     { lat: 45.5477287, lng: -73.7290324 },
    //     { lat: 45.55014781726532, lng: -73.75486371401367 },
    //     google.maps.TravelMode.DRIVING
    // )

    const { setIsComparaisonPanel } = useDirectionContext()

    return (
        <div className={styles.container}>
            <button
                className={styles.closeButton}
                onClick={() => setIsComparaisonPanel(false)}
            >
                &times;
            </button>
            <div className={styles.leftColumn}>
                {/* Elements for the left column */}
                <div className={styles.column}>
                    <div className={styles.columnTitle}>Option 1</div>
                    <div className={styles.info}>
                        <FontAwesomeIcon
                            icon={faClock}
                            className={styles.icon}
                        />
                        Time: 1 hour
                    </div>
                    <div className={styles.info}>
                        <FontAwesomeIcon
                            icon={faMoneyBillAlt}
                            className={styles.icon}
                        />
                        Money: $10
                    </div>
                    <div className={styles.info}>
                        <FontAwesomeIcon
                            icon={faRoad}
                            className={styles.icon}
                        />
                        Distance: 10 miles
                    </div>
                </div>
            </div>
            <div className={styles.separator}></div>
            <div className={styles.rightColumn}>
                {/* Elements for the right column */}
                <div className={styles.column}>
                    <div className={styles.columnTitle}>Option 2</div>
                    <div className={styles.info}>
                        <FontAwesomeIcon
                            icon={faClock}
                            className={styles.icon}
                        />
                        Time: 2 hours
                    </div>
                    <div className={styles.info}>
                        <FontAwesomeIcon
                            icon={faMoneyBillAlt}
                            className={styles.icon}
                        />
                        Money: $15
                    </div>
                    <div className={styles.info}>
                        <FontAwesomeIcon
                            icon={faRoad}
                            className={styles.icon}
                        />
                        Distance: 15 miles
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ComparaisonPanel
