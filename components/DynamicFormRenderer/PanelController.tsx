import React from 'react'
import DirectionPanel from '../DirectionPanel/DirectionPanel'
import ComparaisonPanel from '../ComparaisonPanel/ComparaisonPanel'
import { useDirectionContext } from '../../Contexts/DirectionContext'

const PanelController = () => {
    const { isComparaisonPanel, setIsComparaisonPanel } = useDirectionContext()

    const shouldRenderComparaisonPanel = isComparaisonPanel

    console.log('isComparaisonPanel ', isComparaisonPanel)

    return shouldRenderComparaisonPanel ? <ComparaisonPanel /> : <div></div>
}

export default PanelController
