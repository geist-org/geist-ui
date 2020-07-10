import { NormalSizes, NormalTypes } from '../utils/prop-types'
import { ZeitUIThemesPalette } from '../styles/themes'

export type InputSize = {
  heightRatio: string
  fontSize: string
  lineHeight: string
  margin: string
}

export const getSizes = (size?: NormalSizes) => {
  const sizes: { [key in NormalSizes]: InputSize } = {
    mini: {
      heightRatio: '1.25',
      fontSize: '0.7143rem',
      lineHeight: '1.1429rem',
      margin: '0.4286rem 1.1429rem',
    },
    small: {
      heightRatio: '1.5',
      fontSize: '0.8571rem',
      lineHeight: '1.2857rem',
      margin: '0.5rem 1.1429rem',
    },
    medium: {
      heightRatio: '1.875',
      fontSize: '1rem',
      lineHeight: '1.5714rem',
      margin: '0.6429rem 1.1429rem',
    },
    large: {
      heightRatio: '2.25',
      fontSize: '1.1429rem',
      lineHeight: '2.1429rem',
      margin: '0.6429rem 1.1429rem',
    },
  }
  if (!size) return sizes.medium
  return sizes[size]
}

export type InputColor = {
  color: string
  hoverColor?: string
  borderColor: string
  hoverBorder: string
}

export const getColors = (palette: ZeitUIThemesPalette, status?: NormalTypes): InputColor => {
  const colors: { [key in NormalTypes]: InputColor } = {
    default: {
      color: palette.cBlack0,
      hoverColor: palette.brand,
      borderColor: palette.cGray2,
      hoverBorder: palette.cTheme5,
    },
    primary: {
      color: palette.cBlack0,
      hoverColor: palette.brand,
      borderColor: palette.brand,
      hoverBorder: palette.brand,
    },
    secondary: {
      color: palette.cBlack0,
      borderColor: palette.secondary,
      hoverBorder: palette.secondary,
    },
    success: {
      color: palette.cBlack0,
      borderColor: palette.successLight,
      hoverBorder: palette.success,
    },
    warning: {
      color: palette.cBlack0,
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
