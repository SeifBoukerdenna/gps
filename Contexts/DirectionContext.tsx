import React, { createContext, useContext, useState } from 'react'

interface DirectionContextProps {
    isComparaisonPanel: boolean
    setIsComparaisonPanel: React.Dispatch<React.SetStateAction<boolean>>
}

const DirectionContext = createContext<DirectionContextProps | undefined>(
    undefined
)

export const DirectionContextProvider: React.FC<{
    children: React.ReactNode
}> = ({ children }) => {
    const [isComparaisonPanel, setIsComparaisonPanel] = useState(false)

    return (
        <DirectionContext.Provider
            value={{ isComparaisonPanel, setIsComparaisonPanel }}
        >
            {children}
        </DirectionContext.Provider>
    )
}

export const useDirectionContext = () => {
    const context = useContext(DirectionContext)
    if (!context) {
        throw new Error(
            'useDirectionContext must be used within a DirectionProvider'
        )
    }
    return context
}
