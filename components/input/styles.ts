import { NormalSizes, NormalTypes } from '../utils/prop-types'
import { GeistUIThemesPalette } from '../styles/themes'

export type InputSize = {
  heightRatio: string
  fontSize: string
}

export const getSizes = (size?: NormalSizes) => {
  const sizes: { [key in NormalSizes]: InputSize } = {
    mini: {
      heightRatio: '1.313',
      fontSize: '.75rem',
    },
    small: {
      heightRatio: '1.5',
      fontSize: '.75rem',
    },
    medium: {
      heightRatio: '1.687',
      fontSize: '.875rem',
    },
    large: {
      heightRatio: '1.875',
      fontSize: '1rem',
    },
  }
  if (!size) return sizes.medium
  return sizes[size]
}

export type InputColor = {
  color: string
  borderColor: string
  hoverBorder: string
}

export const getColors = (palette: GeistUIThemesPalette, status?: NormalTypes): InputColor => {
  const colors: { [key in NormalTypes]: InputColor } = {
    default: {
      color: palette.foreground,
      borderColor: palette.border,
      hoverBorder: palette.accents_5,
    },
    secondary: {
      color: palette.foreground,
      borderColor: palette.secondary,
      hoverBorder: palette.secondary,
    },
    success: {
      color: palette.foreground,
      borderColor: palette.successLight,
      hoverBorder: palette.success,
    },
    warning: {
      color: palette.foreground,
      borderColor: palette.warningLight,
      hoverBorder: palette.warning,
    },
    error: {
      color: palette.error,
      borderColor: palette.error,
      hoverBorder: palette.errorDark,
    },
  }

  if (!status) return colors.default
  return colors[status]
}
