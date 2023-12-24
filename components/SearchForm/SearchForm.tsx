// SearchForm.tsx
import React, { useState } from 'react'
import usePlacesAutocomplete from 'use-places-autocomplete'
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

const SearchForm = () => {
    const [address, setAddress] = useState('')

    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
    } = usePlacesAutocomplete({
        debounce: 300,
        requestOptions: {
            types: ['geocode'],
        },
    })

    const handleSelect = (address: string) => {
        setValue(address, false)
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
                        placeholder="Enter an address"
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
