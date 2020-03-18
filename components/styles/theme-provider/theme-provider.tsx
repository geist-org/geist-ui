import React, { PropsWithChildren } from 'react'
import useTheme from '../use-theme'
import darkTheme from '../themes/dark'
import lightTheme from '../themes/default'
import { ZeitUIThemes } from '../themes/index'
import ThemeContext from '../use-theme/theme-context'

type PartialTheme = Partial<ZeitUIThemes>
export type ThemeParam = PartialTheme | ((theme: PartialTheme) => PartialTheme) | undefined

export interface Props {
  theme?: ThemeParam
}

const mergeTheme = (current: ZeitUIThemes, custom: ThemeParam): ZeitUIThemes => {
  if (!custom) return current
  if (typeof custom === 'function') {
    const merged = custom(current)
    if (!merged || typeof merged !== 'object') {
      console.error('Zeit-UI: the theme function must return object value.')
    }
    return merged as ZeitUIThemes
  }
  return {...current, ...custom}
}

const switchTheme = (mergedTheme: ZeitUIThemes): ZeitUIThemes => {
  const themes: { [key in ZeitUIThemes['type']]: ZeitUIThemes } = {
    light: lightTheme,
    dark: darkTheme,
  }
  return {...mergedTheme, ...themes[mergedTheme.type]}
}

const ThemeProvider: React.FC<PropsWithChildren<Props>> = ({ children, theme }) => {
  const customTheme = theme
  const currentTheme = useTheme()
  const merged = mergeTheme(currentTheme, customTheme)
  const userTheme = currentTheme.type !== merged.type ? switchTheme(merged) : merged
  
  return (
    <ThemeContext.Provider value={userTheme}>{children}</ThemeContext.Provider>
  )
}

export default ThemeProvider
