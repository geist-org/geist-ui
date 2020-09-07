import React from 'react'
import ThemeContext from './theme-context'
import { CfxUIThemes } from '../themes/index'

const useTheme = (): CfxUIThemes => React.useContext<CfxUIThemes>(ThemeContext)

export default useTheme
