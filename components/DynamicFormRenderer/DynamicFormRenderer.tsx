import React from 'react'
import DirectionPanel from '../DirectionPanel/DirectionPanel'
import SearchForm from '../MainSearchForm/SearchForm'
import { useMapContext } from '../Map/MapContext'

const ConditionalFormRenderer = () => {
    const { destination } = useMapContext()

    return destination ? <DirectionPanel /> : <SearchForm />
}

export default ConditionalFormRenderer
