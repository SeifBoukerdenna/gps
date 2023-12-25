// SearchForm.tsx
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
import styles from './SearchForm.module.css'
import Draggable from 'react-draggable'
import { useMapContext } from '../Map/MapContext'
import convertCoordinatesToAddress from '../../utils/CoordToName'

const SearchForm = () => {
    const [address, setAddress] = useState('')
    const {
        center,
        setCenter,
        destination,
        destinationName,
        setInitialSearch,
    } = useMapContext()

    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete({
        // requestOptions: {
        //     // types: ['address', 'establishment', 'geocode'],
        //     // componentRestrictions: {
        //     //     country: 'ca',
        //     // },
        // },
    })

    const handleSelect = async (address: string) => {
        setValue(address, false)
        clearSuggestions()

        const results = await getGeocode({ address: address })
        const { lat, lng } = await getLatLng(results[0])
        setCenter({ lat, lng })

        console.log(address)
        console.log({ lat, lng })

        setInitialSearch(true)

        // Additional actions when an address is selected
        // For example, you may want to fetch additional details about the selected place.
    }

    const nodeRef = React.useRef(null)

    return (
        <Draggable nodeRef={nodeRef}>
            <div ref={nodeRef} className={styles.searchFormContainer}>
                <Combobox onSelect={handleSelect}>
                    <ComboboxInput
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value)
                            setAddress(e.target.value)
                        }}
                        disabled={!ready}
                        placeholder={
                            destinationName
                                ? destinationName.toString()
                                : 'Search your destination'
                        }
                        className={styles.inputField} // Apply the input field style
                    />
                    <ComboboxPopover className={styles.suggestionContainer}>
                        <ComboboxList
                            style={{
                                listStyle: 'none',
                                padding: '0',
                                margin: '0',
                            }}
                        >
                            {status === 'OK' &&
                                data.map(({ place_id, description }) => (
                                    <ComboboxOption
                                        key={place_id}
                                        value={description}
                                        className={styles.suggestionItem} // Apply the suggestion item style
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
