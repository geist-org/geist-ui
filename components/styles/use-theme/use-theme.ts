import React from 'react'
import ThemeContext from './theme-context'
import { GeistUIThemes } from '../themes/index'

const useTheme = (): GeistUIThemes => React.useContext<GeistUIThemes>(ThemeContext)

export default useTheme
