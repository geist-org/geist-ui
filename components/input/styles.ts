import { NormalSizes, NormalTypes } from '../utils/prop-types'
import { ZeitUIThemesPalette } from '../styles/themes'

export type InputSize = {
  heightRatio: string
  fontSize: string
  margin: string
}

export const getSizes = (size?: NormalSizes) => {
  const sizes: { [key in NormalSizes]: InputSize } = {
    mini: {
      heightRatio: '1.125',
      fontSize: '0.5714rem',
      margin: '0 1.1429rem',
    },
    small: {
      heightRatio: '1.5',
      fontSize: '0.8571rem',
      margin: '0 1.1429rem',
    },
    medium: {
      heightRatio: '1.875',
      fontSize: '1rem',
      margin: '0 1.1429rem',
    },
    large: {
      heightRatio: '2.25',
      fontSize: '1.1429rem',
      margin: '0 1.1429rem',
    },
  }
  if (!size) return sizes.medium
  return sizes[size]
}

export type InputColor = {
  color: string
  backgroundColor?: string
  hoverBackgroundColor?: string
  hoverColor?: string
  border: string
  hoverBorderColor: string
}

export const getColors = (
  palette: ZeitUIThemesPalette,
  status?: NormalTypes,
  solid?: boolean,
): InputColor => {
  const colors: { [key in NormalTypes]: InputColor } = {
    default: {
      color: palette.cBlack0,
      hoverColor: solid ? 'inherit' : palette.brand,
      backgroundColor: solid ? palette.cGray0 : 'transparent',
      hoverBackgroundColor: solid ? palette.cTheme0 : 'inherit',
      border: solid ? 'none' : `1px solid ${palette.cGray2}`,
      hoverBorderColor: palette.brand,
    },
    primary: {
      color: palette.cBlack0,
      hoverColor: solid ? 'inherit' : palette.brand,
      backgroundColor: solid ? palette.cTheme0 : 'transparent',
      hoverBackgroundColor: solid ? palette.brand : 'inherit',
      border: solid ? 'none' : `1px solid ${palette.brandLight}`,
      hoverBorderColor: palette.brand,
    },
    secondary: {
      color: palette.cBlack0,
      hoverColor: 'inherit',
      backgroundColor: solid ? palette.secondary : 'transparent',
      hoverBackgroundColor: solid ? palette.secondary : 'inherit',
      border: solid ? 'none' : `1px solid ${palette.secondary}`,
      hoverBorderColor: palette.secondary,
    },
    success: {
      color: palette.cBlack0,
      hoverColor: 'inherit',
      backgroundColor: solid ? palette.successLight : 'transparent',
      hoverBackgroundColor: solid ? palette.success : 'inherit',
      border: solid ? 'none' : `1px solid ${palette.successLight}`,
      hoverBorderColor: palette.success,
    },
    warning: {
      color: palette.cBlack0,
      hoverColor: 'inherit',
      backgroundColor: solid ? palette.warningLight : 'transparent',
      hoverBackgroundColor: solid ? palette.warning : 'inherit',
      border: solid ? 'none' : `1px solid ${palette.warningLight}`,
      hoverBorderColor: palette.warning,
    },
    error: {
      color: palette.error,
      hoverColor: palette.error,
      backgroundColor: solid ? palette.errorLight : 'transparent',
      hoverBackgroundColor: solid ? palette.errorLight : 'inherit',
      border: solid ? 'none' : `1px solid ${palette.error}`,
      hoverBorderColor: palette.errorDark,
    },
  }

  if (!status) return colors.default
  return colors[status]
}
