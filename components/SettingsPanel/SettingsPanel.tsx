import React, { useState, useEffect } from 'react'
import styles from './SettingsPanel.module.css'

import { useSettingsContext } from '../Contexts/SettingsContext'
import { useCustomPlacesAutocomplete } from '../../utils/Hooks/PlacesAutoCompleteHook'
import { useMapContext } from '../Contexts/MapContext'
import useOnclickOutside from 'react-cool-onclickoutside'

const SettingsPanel: React.FC = () => {
    const [favoriteCar, setFavoriteCar] = useState<string>('')
    const [homeAddress, setHomeAddress] = useState<string>('')
    const [favoriteAddress, setFavoriteAddress] = useState<string>('')
    const [publicTransportInfo, setPublicTransportInfo] = useState<string>('')

    useEffect(() => {
        setFavoriteCar(localStorage.getItem('favoriteCar') || '')
        setHomeAddress(localStorage.getItem('homeAddress') || '')
        setFavoriteAddress(localStorage.getItem('favoriteDestination') || '')
        setPublicTransportInfo(
            localStorage.getItem('publicTransportInfo') || ''
        )
    }, [])

    const { setIsSettingsVisible } = useSettingsContext()

    const {
        defaultDepartureAdressName,
        setDefaultDepartureAdressName,
        defaultArrivalAdressName,
        setDefaultArrivalAdressName,
    } = useMapContext()

    useEffect(() => {
        setHomeAddress(defaultDepartureAdressName as string),
            [
                setHomeAddress,
                defaultDepartureAdressName,
                setDefaultDepartureAdressName,
            ]
    })

    useEffect(() => {
        setFavoriteAddress(defaultArrivalAdressName as string),
            [
                setFavoriteAddress,
                defaultArrivalAdressName,
                setDefaultArrivalAdressName,
            ]
    })

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

    const {
        ready: defaultArrivalReady,
        value: defaultArrivalValue,
        setValue: setDefaultArrivalValue,
        suggestions: { status: defaultArrivalStatus, data: defaultArrivalData },
        clearSuggestions: defaultClearArrivalSuggestions,
    } = useCustomPlacesAutocomplete()

    const refDefaultDeparture = useOnclickOutside(() => {
        defaultClearDepartureSuggestions()
    })

    const [hasChangedDeparture, setHasChangedDeparture] = useState(false)
    const [hasChangedArrival, setHasChangedArrival] = useState(false)

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
                        value={
                            hasChangedDeparture
                                ? defaultDepartureAdressName || ''
                                : localStorage.getItem('homeAddress') ||
                                  defaultDepartureAdressName ||
                                  ''
                        }
                        onChange={(e) => {
                            setDefaultDepartureValue(e.target.value)
                            setDefaultDepartureAdressName(e.target.value)
                            setHasChangedDeparture(true)
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
                                            setDefaultDepartureValue(
                                                description,
                                                false
                                            )
                                            defaultClearDepartureSuggestions()
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
                    placeholder={'Enter a default arrival place'}
                    className={styles.input}
                    value={
                        hasChangedArrival
                            ? defaultArrivalAdressName || ''
                            : localStorage.getItem('favoriteDestination') ||
                              defaultArrivalAdressName ||
                              ''
                    }
                    onChange={(e) => {
                        setDefaultArrivalValue(e.target.value)
                        setDefaultArrivalAdressName(e.target.value)
                        setHasChangedArrival(true)
                    }}
                    disabled={!defaultArrivalReady}
                />
                {defaultArrivalStatus === 'OK' && (
                    <ul className={styles.suggestionContainer}>
                        {defaultArrivalData.map(({ place_id, description }) => (
                            <li
                                key={place_id}
                                className={styles.suggestionItem}
                                onClick={() => {
                                    setDefaultArrivalAdressName(description)
                                    setDefaultArrivalValue(description, false)
                                    defaultClearArrivalSuggestions()
                                }}
                            >
                                {description}
                            </li>
                        ))}
                    </ul>
                )}
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
                    localStorage.setItem('favoriteCar', 'BMW')
                    localStorage.setItem('homeAddress', homeAddress)
                    localStorage.setItem('favoriteDestination', favoriteAddress)
                    localStorage.setItem('publicTransportInfo', '')
                    setIsSettingsVisible(false)
                }}
            >
                Save
            </button>
        </div>
    )
}

export default SettingsPanel
