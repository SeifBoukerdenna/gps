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
import { useMapContext } from '../../Contexts/MapContext'

const PlacesSearchBar = () => {
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete({})

    const {
        departureAddress,
        setDepartureAddress,
        departureAddressName,
        setDepartureAddressName,
    } = useMapContext()

    const handleSelect = async (address: string) => {
        setValue(address, false)
        setDepartureAddressName(address)
        clearSuggestions()

        const results = await getGeocode({ address: address })
        const { lat, lng } = getLatLng(results[0])
        setDepartureAddress({ lat, lng })
    }

    return (
        <div>
            DEPARTURE ADRESS NAME: {departureAddressName}
            <br />
            DEPARTURE ADRESS: {JSON.stringify(departureAddress)}
            <Combobox onSelect={handleSelect}>
                <ComboboxInput
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value)
                        setDepartureAddressName(e.target.value)
                    }}
                    disabled={!ready}
                    placeholder="Search for a location"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSelect(value)
                            console.log('HELLOO')
                        }
                    }}
                    // onSubmit={() => {
                    //     handleSelect(value)
                    //     console.log('HELLOO')
                    // }}
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
