import { GeistUIThemes } from './presets/index'
import { DeepPartial } from '../utils/types'
import lightTheme from './presets/default'
import darkTheme from './presets/dark'

export type GeistUserTheme = DeepPartial<GeistUIThemes> & { type: string }

export const isObject = (target: unknown) => target && typeof target === 'object'

export const deepDuplicable = <T extends Record<string, unknown>>(
  source: T,
  target: T,
): T => {
  if (!isObject(target) || !isObject(source)) return source as T

  const sourceKeys = Object.keys(source) as Array<keyof T>
  let result = {} as any
  for (const key of sourceKeys) {
    const sourceValue = source[key]
    const targetValue = target[key]

    if (Array.isArray(sourceValue) && Array.isArray(targetValue)) {
      result[key] = targetValue.concat(sourceValue)
    } else if (isObject(sourceValue) && isObject(targetValue)) {
      result[key] = deepDuplicable(sourceValue as Record<string, unknown>, {
        ...(targetValue as Record<string, unknown>),
      })
    } else if (targetValue) {
      result[key] = targetValue
    } else {
      result[key] = sourceValue
    }
  }
  return result
}

const getPresets = (): Array<GeistUIThemes> => {
  return [lightTheme, darkTheme]
}

const getPresetStaticTheme = (): GeistUIThemes => {
  return lightTheme
}

const isAvailableThemeType = (type?: string): boolean => {
  if (!type) return false
  const presetThemes = getPresets()
  const hasType = presetThemes.find(theme => theme.type === type)
  return !hasType
}

const isPresetTheme = (
  themeOrType?: GeistUserTheme | GeistUIThemes | string,
): boolean => {
  if (!themeOrType) return false
  const isType = typeof themeOrType === 'string'
  const type = isType
    ? (themeOrType as string)
    : (themeOrType as Exclude<typeof themeOrType, string>).type
  return !isAvailableThemeType(type)
}

const hasUserCustomTheme = (themes: Array<GeistUIThemes> = []): boolean => {
  return !!themes.find(item => isAvailableThemeType(item.type))
}

const create = (base: GeistUIThemes, custom: GeistUserTheme): GeistUIThemes => {
  if (!isAvailableThemeType(custom.type)) {
    throw new Error('Duplicate or unavailable theme type')
  }

  return deepDuplicable(base, custom) as GeistUIThemes
}

const createFromDark = (custom: GeistUserTheme) => create(darkTheme, custom)
const createFromLight = (custom: GeistUserTheme) => create(lightTheme, custom)

const Themes = {
  isPresetTheme,
  isAvailableThemeType,
  hasUserCustomTheme,
  getPresets,
  getPresetStaticTheme,
  create,
  createFromDark,
  createFromLight,
}

export default Themes
