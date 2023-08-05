import { SettingsContext, SettingsContextValue } from '@/context/settingsContext'
import { useContext } from 'react'
// import { SettingsContext, SettingsContextValue } from 'src/@core/context/settingsContext'

export const useSettings = (): SettingsContextValue => useContext(SettingsContext)
