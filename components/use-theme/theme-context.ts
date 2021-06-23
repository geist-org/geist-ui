import React from 'react'
import Themes from '../themes'
import { GeistUIThemes } from '../themes/presets'

const defaultTheme = Themes.getPresetStaticTheme()

export const ThemeContext: React.Context<GeistUIThemes> =
  React.createContext<GeistUIThemes>(defaultTheme)
export const useTheme = (): GeistUIThemes => React.useContext<GeistUIThemes>(ThemeContext)
