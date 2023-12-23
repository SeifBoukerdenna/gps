// Your SearchForm component

import React from 'react'
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from 'use-places-autocomplete'
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from '@reach/combobox'
import '@reach/combobox/styles.css'
import Draggable from 'react-draggable'

import styles from './SearchForm.module.css' // Import your CSS file

const SearchForm = () => {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete()

    const handleSelect = async (address: string) => {
        setValue(address, false)
        clearSuggestions()

        try {
            const results = await getGeocode({ address })
            const { lat, lng } = await getLatLng(results[0])
            console.log('Latitude and Longitude:', { lat, lng })
            // Do something with the latitude and longitude
        } catch (error) {
            console.error('Error: ', error)
        }
    }

    return (
        <Draggable>
            <div className={styles.searchFormContainer}>
                <Combobox onSelect={handleSelect} className={styles.combobox}>
                    <ComboboxInput
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        disabled={!ready}
                        placeholder="Enter an address"
                        className={styles.comboboxInput}
                    />
                    <ComboboxPopover className={styles.comboboxPopover}>
                        <ComboboxList className={styles.comboboxList}>
                            {status === 'OK' &&
                                data.map(({ place_id, description }) => (
                                    <ComboboxOption
                                        key={place_id}
                                        value={description}
                                        className={styles.comboboxOption}
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
