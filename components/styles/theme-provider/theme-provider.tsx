import React, { PropsWithChildren } from 'react'
import useTheme from '../use-theme'
import darkTheme from '../themes/dark'
import lightTheme from '../themes/default'
import { GeistUIThemes } from '../themes/index'
import ThemeContext from '../use-theme/theme-context'
import useWarning from '../../utils/use-warning'
import { DeepPartial } from '../../utils/types'

type PartialTheme = DeepPartial<GeistUIThemes>
export type ThemeParam = PartialTheme | ((theme: PartialTheme) => PartialTheme) | undefined

export interface Props {
  theme?: ThemeParam
}

export interface MergeObject {
  [key: string]: any
}

export const isObject = (target: any) => target && typeof target === 'object'

export const deepMergeObject = <T extends MergeObject>(source: T, target: T): T => {
  if (!isObject(target) || !isObject(source)) return source

  const sourceKeys = Object.keys(source) as Array<keyof T>
  let result = {} as T
  for (const key of sourceKeys) {
    const sourceValue = source[key]
    const targetValue = target[key]

    if (Array.isArray(sourceValue) && Array.isArray(targetValue)) {
      result[key] = targetValue.concat(sourceValue)
    } else if (isObject(sourceValue) && isObject(targetValue)) {
      result[key] = deepMergeObject(sourceValue, { ...targetValue })
    } else if (targetValue) {
      result[key] = targetValue
    } else {
      result[key] = sourceValue
    }
  }
  return result
}

const mergeTheme = (current: GeistUIThemes, custom: ThemeParam): GeistUIThemes => {
  if (!custom) return current
  if (typeof custom === 'function') {
    const merged = custom(current)
    if (!merged || typeof merged !== 'object') {
      useWarning('The theme function must return object value.')
    }
    return merged as GeistUIThemes
  }
  return deepMergeObject<GeistUIThemes>(current, custom as GeistUIThemes)
}

const switchTheme = (mergedTheme: GeistUIThemes): GeistUIThemes => {
  const themes: { [key in GeistUIThemes['type']]: GeistUIThemes } = {
    light: lightTheme,
    dark: darkTheme,
  }
  return { ...mergedTheme, ...themes[mergedTheme.type] }
}

const ThemeProvider: React.FC<PropsWithChildren<Props>> = ({ children, theme }) => {
  const customTheme = theme
  const currentTheme = useTheme()
  const merged = mergeTheme(currentTheme, customTheme)
  const userTheme = currentTheme.type !== merged.type ? switchTheme(merged) : merged

  return <ThemeContext.Provider value={userTheme}>{children}</ThemeContext.Provider>
}

export default ThemeProvider
