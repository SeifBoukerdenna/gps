// SearchForm.tsx
import React, { useState } from 'react'
import { useCustomPlacesAutocomplete } from '../../utils/Hooks/PlacesAutoCompleteHook'
import { getGeocode, getLatLng } from 'use-places-autocomplete'
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from '@reach/combobox'
import '@reach/combobox/styles.css'
import styles from './SearchForm.module.css'
import Draggable from 'react-draggable'
import { useMapContext } from '../../Contexts/MapContext'
import convertCoordinatesToAddress from '../../utils/CoordToName'

const SearchForm = () => {
    const [address, setAddress] = useState('')
    const {
        center,
        setCenter,
        destination,
        setDestination,
        destinationName,
        setDestinationName,
        setInitialSearch,
    } = useMapContext()

    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = useCustomPlacesAutocomplete()

    const handleSelect = async (address: string) => {
        setValue(address, false)
        clearSuggestions()

        const results = await getGeocode({ address: address })
        const { lat, lng } = await getLatLng(results[0])
        setCenter({ lat, lng })
        setDestination({ lat, lng })

        setDestinationName(address)
        setInitialSearch(true)
    }

    const [isTyping, setIsTyping] = useState(false)

    return (
        <Draggable>
            <div
                className={`${styles.searchFormContainer} ${
                    isTyping ? styles.notShaking : ''
                }`}
            >
                <Combobox onSelect={handleSelect}>
                    <ComboboxInput
                        value={value.toString()}
                        onChange={(e) => {
                            setValue(e.target.value)
                            setAddress(e.target.value)
                            setIsTyping(true)
                        }}
                        onFocus={() => setIsTyping(true)}
                        onBlur={() => setIsTyping(false)}
                        disabled={!ready}
                        placeholder={
                            destinationName
                                ? destinationName.toString()
                                : 'Search your destination'
                        }
                        className={styles.inputField}
                    />
                    <ComboboxPopover className={styles.suggestionContainer}>
                        <ComboboxList>
                            {status === 'OK' &&
                                data.map(({ place_id, description }) => (
                                    <ComboboxOption
                                        key={place_id}
                                        value={description}
                                        className={styles.suggestionItem}
                                    />
                                ))}
                        </ComboboxList>
                    </ComboboxPopover>
                </Combobox>
            </div>
        </Draggable>
    )
}

export default SearchForm