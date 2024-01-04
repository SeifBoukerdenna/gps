import React, { createContext, useContext, useState } from 'react'

interface SettingsContextProps {
    isSettingsVisible: boolean
    setIsSettingsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const SettingsContext = createContext<SettingsContextProps | undefined>(
    undefined
)

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isSettingsVisible, setIsSettingsVisible] = useState(false)

    return (
        <SettingsContext.Provider
            value={{ isSettingsVisible, setIsSettingsVisible }}
        >
            {children}
        </SettingsContext.Provider>
    )
}

export const useSettingsContext = () => {
    const context = useContext(SettingsContext)
    if (!context) {
        throw new Error(
            'useSettingsContext must be used within a SettingsProvider'
        )
    }
    return context
}
