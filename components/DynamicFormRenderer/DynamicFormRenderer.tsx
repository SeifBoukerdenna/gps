import React from 'react'
import DirectionPanel from '../DirectionPanel/DirectionPanel'
import SearchForm from '../MainSearchForm/SearchForm'
import { useMapContext } from '../../Contexts/MapContext'

const ConditionalFormRenderer = () => {
    const { destination, departureAddress } = useMapContext()

    const shouldRenderSearchForm = !destination && !departureAddress

    return shouldRenderSearchForm ? <SearchForm /> : <DirectionPanel />
}

export default ConditionalFormRenderer
