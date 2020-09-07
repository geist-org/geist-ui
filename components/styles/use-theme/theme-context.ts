import React from 'react'
import { CfxUIThemes } from '../themes/index'
import defaultTheme from '../themes/default'

const ThemeContext: React.Context<CfxUIThemes> = React.createContext<CfxUIThemes>(defaultTheme)

export default ThemeContext
