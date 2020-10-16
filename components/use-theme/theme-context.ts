import React from 'react'
import { GeistUIThemes } from '../styles/themes/index'
import defaultTheme from '../styles/themes/default'

const ThemeContext: React.Context<GeistUIThemes> = React.createContext<GeistUIThemes>(defaultTheme)

export default ThemeContext
