import React from 'react'
import { GeistUIThemes } from '../themes/presets/index'
import Themes from '../themes/themes'

const defaultTheme = Themes.getPresetStaticTheme()

export const ThemeContext: React.Context<GeistUIThemes> = React.createContext<GeistUIThemes>(
  defaultTheme,
)
export const useTheme = (): GeistUIThemes => React.useContext<GeistUIThemes>(ThemeContext)
