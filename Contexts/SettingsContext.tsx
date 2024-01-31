import React, { createContext, useContext, useState } from 'react'

interface CarInfo {
    model: string
    year: number
    make: string
    fuel_type: string
    combination_mpg: number
}

const defaultCarInfo: CarInfo = {
    model: 'n.a',
    year: NaN,
    make: 'n.a',
    fuel_type: 'normal',
    combination_mpg: 17,
}

interface SettingsContextProps {
    isSettingsVisible: boolean
    setIsSettingsVisible: React.Dispatch<React.SetStateAction<boolean>>
    carInfoUser: CarInfo | null
    setCarInfoUser: React.Dispatch<React.SetStateAction<CarInfo | null>>
}

const SettingsContext = createContext<SettingsContextProps | undefined>(
    undefined
)

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isSettingsVisible, setIsSettingsVisible] = useState(false)
    const [carInfoUser, setCarInfoUser] = useState<CarInfo | null>(
        defaultCarInfo
    )

    return (
        <SettingsContext.Provider
            value={{
                isSettingsVisible,
                setIsSettingsVisible,
                carInfoUser,
                setCarInfoUser,
            }}
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
