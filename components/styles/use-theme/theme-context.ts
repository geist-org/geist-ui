import React from 'react'
import { ZeitUIThemes } from '../themes/index'
import defaultTheme from '../themes/default'

const ThemeContext:React.Context<ZeitUIThemes> = React.createContext<ZeitUIThemes>(defaultTheme)

export default ThemeContext
