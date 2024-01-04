import React, { useState, useEffect } from 'react'
import styles from './SettingsPanel.module.css'

import { useSettingsContext } from '../Contexts/SettingsContext'
import { useCustomPlacesAutocomplete } from '../../utils/Hooks/PlacesAutoCompleteHook'
import { useMapContext } from '../Contexts/MapContext'
import useOnclickOutside from 'react-cool-onclickoutside'

const SettingsPanel: React.FC = () => {
    const [favoriteCar, setFavoriteCar] = useState<string>('')
    const [homeAddress, setHomeAddress] = useState<string>('')
    const [favoriteDestination, setFavoriteDestination] = useState<string>('')
    const [publicTransportInfo, setPublicTransportInfo] = useState<string>('')

    useEffect(() => {
        setFavoriteCar(localStorage.getItem('favoriteCar') || '')
        setHomeAddress(localStorage.getItem('homeAddress') || '')
        setFavoriteDestination(
            localStorage.getItem('favoriteDestination') || ''
        )
        setPublicTransportInfo(
            localStorage.getItem('publicTransportInfo') || ''
        )
    }, [])

    const { setIsSettingsVisible } = useSettingsContext()

    const { defaultDepartureAdressName, setDefaultDepartureAdressName } =
        useMapContext()

    const {
        ready: defaultDepartureReady,
        value: defaultDepartureValue,
        setValue: setDefaultDepartureValue,
        suggestions: {
            status: defaultDepartureStatus,
            data: defaultDepartureData,
        },
        clearSuggestions: defaultClearDepartureSuggestions,
    } = useCustomPlacesAutocomplete()

    const refDefaultDeparture = useOnclickOutside(() => {
        defaultClearDepartureSuggestions()
    })

    return (
        <div className={styles.SettingsPanel}>
            <h2>Settings</h2>

            <label>
                Favorite Car:
                <select
                    value={favoriteCar}
                    onChange={(e) => setFavoriteCar(e.target.value)}
                    className={styles.dropdown}
                >
                    <option value="">Select Car</option>
                    <option value="sedan">Sedan</option>
                    <option value="suv">SUV</option>
                    <option value="truck">Truck</option>
                </select>
            </label>

            <label>
                Home Address:
                <div
                    className={styles.searchFormContainer}
                    ref={refDefaultDeparture}
                >
                    <input
                        type="text"
                        placeholder={'Enter a default place'}
                        className={styles.input}
                        value={defaultDepartureValue || ''}
                        onChange={(e) => {
                            setDefaultDepartureValue(e.target.value)
                            setDefaultDepartureAdressName(e.target.value)
                        }}
                        disabled={!defaultDepartureReady}
                    />
                    {defaultDepartureStatus === 'OK' && (
                        <ul className={styles.suggestionContainer}>
                            {defaultDepartureData.map(
                                ({ place_id, description }) => (
                                    <li
                                        key={place_id}
                                        className={styles.suggestionItem}
                                        onClick={() => {
                                            setDefaultDepartureAdressName(
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
            </label>

            <label>
                Favorite Destination:
                <input
                    type="text"
                    value={favoriteDestination}
                    onChange={(e) => setFavoriteDestination(e.target.value)}
                />
            </label>

            <label>
                Public Transport Info:
                <input
                    type="text"
                    value={publicTransportInfo}
                    onChange={(e) => setPublicTransportInfo(e.target.value)}
                />
            </label>

            <button
                onClick={() => {
                    console.log('click save')
                    localStorage.setItem('favoriteCar', favoriteCar)
                    localStorage.setItem('homeAddress', homeAddress)
                    localStorage.setItem(
                        'favoriteDestination',
                        favoriteDestination
                    )
                    localStorage.setItem(
                        'publicTransportInfo',
                        publicTransportInfo
                    )
                    setIsSettingsVisible(false)
                }}
            >
                Save
            </button>
        </div>
    )
}

export default SettingsPanel
