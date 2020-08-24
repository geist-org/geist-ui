import React from 'react'
import { GeistUIThemes } from '../themes/index'
import defaultTheme from '../themes/default'

const ThemeContext: React.Context<GeistUIThemes> = React.createContext<GeistUIThemes>(defaultTheme)

export default ThemeContext
