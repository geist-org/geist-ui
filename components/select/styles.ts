import { NormalSizes, NormalTypes } from 'components/utils/prop-types'
import { GeistUIThemes, GeistUIThemesPalette } from 'components/themes/presets'

export interface SelectSize {
  height: string
  fontSize: string
  minWidth: string
}

export const getSizes = (theme: GeistUIThemes, size?: NormalSizes) => {
  const sizes: { [key in NormalSizes]: SelectSize } = {
    medium: {
      height: `calc(1.688 * ${theme.layout.gap})`,
      fontSize: '.875rem',
      minWidth: '10rem',
    },
    small: {
      height: `calc(1.344 * ${theme.layout.gap})`,
      fontSize: '.75rem',
      minWidth: '8rem',
    },
    mini: {
      height: `calc(1 * ${theme.layout.gap})`,
      fontSize: '.75rem',
      minWidth: '6.5rem',
    },
    large: {
      height: `calc(2 * ${theme.layout.gap})`,
      fontSize: '1.225rem',
      minWidth: '12.5rem',
    },
  }

  return size ? sizes[size] : sizes.medium
}

export type SelectColor = {
  border: string
  placeholderColor: string
}

export const getColors = (
  palette: GeistUIThemesPalette,
  status?: NormalTypes,
): SelectColor => {
  const colors: { [key in NormalTypes]: SelectColor } = {
    default: {
      border: palette.border,
      placeholderColor: palette.accents_3,
    },
    secondary: {
      border: palette.border,
      placeholderColor: palette.accents_3,
    },
    success: {
      border: palette.success,
      placeholderColor: palette.accents_3,
    },
    warning: {
      border: palette.warning,
      placeholderColor: palette.accents_3,
    },
    error: {
      border: palette.error,
      placeholderColor: palette.error,
    },
  }

  if (!status) return colors.default
  return colors[status]
}
