import React from 'react'
import ThemeContext from './theme-context'
import { ZeitUIThemes } from '../themes/index'

const useTheme = (): ZeitUIThemes => React.useContext<ZeitUIThemes>(ThemeContext)

export default useTheme
