import React, { useState } from 'react'
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
import styles from '../MainSearchForm/SearchForm.module.css'
import { useMapContext } from '../Map/MapContext'

const PlacesSearchBar = () => {
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete({})

    const { destination, destinationName, setDestination, setDestinationName } =
        useMapContext()

    const handleSelect = async (address: string) => {
        setValue(address, false)
        setDestinationName(address)
        clearSuggestions()

        const results = await getGeocode({ address: address })
        const { lat, lng } = await getLatLng(results[0])
        setDestination({ lat, lng })
    }

    return (
        <div>
            DESTINATION ADRESS NAME: {destinationName}
            <br />
            DESTINATION ADRESS: {JSON.stringify(destination)}
            <br />
            <Combobox onSelect={handleSelect}>
                <ComboboxInput
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value)
                        setDestinationName(e.target.value)
                    }}
                    disabled={!ready}
                    placeholder="Search for a location"
                />
                {status === 'OK' && (
                    <ComboboxPopover>
                        <ComboboxList>
                            {data.map(({ place_id, description }) => (
                                <ComboboxOption
                                    key={place_id}
                                    value={description}
                                    className={styles.suggestionItem}
                                />
                            ))}
                        </ComboboxList>
                    </ComboboxPopover>
                )}
            </Combobox>
        </div>
    )
}

export default PlacesSearchBar
