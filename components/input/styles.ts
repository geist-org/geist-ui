import { NormalSizes, InputTypes } from '../utils/prop-types'
import { ZeitUIThemesPalette } from '../styles/themes'
import { addColorAlpha } from '../utils/color'

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
  status?: InputTypes,
  solid?: boolean,
): InputColor => {
  const colors: { [key in InputTypes]: InputColor } = {
    default: {
      color: palette.cNeutral7,
      hoverColor: solid ? 'inherit' : palette.cTheme5,
      backgroundColor: solid ? palette.cNeutral0 : palette.cNeutral8,
      hoverBackgroundColor: solid ? palette.cTheme0 : palette.cNeutral8,
      border: solid ? 'transparent' : `1px solid ${palette.cNeutral2}`,
      hoverBorderColor: solid ? 'transparent' : palette.cTheme5,
    },
    primary: {
      color: palette.cNeutral7,
      hoverColor: solid ? 'inherit' : palette.cTheme5,
      backgroundColor: solid ? palette.cTheme0 : palette.cNeutral8,
      hoverBackgroundColor: solid ? palette.cTheme1 : palette.cNeutral8,
      border: solid ? 'transparent' : `1px solid ${palette.cTheme2}`,
      hoverBorderColor: solid ? 'transparent' : palette.cTheme5,
    },
    success: {
      color: palette.cNeutral7,
      hoverColor: 'inherit',
      backgroundColor: solid ? palette.successLight : palette.cNeutral8,
      hoverBackgroundColor: solid ? palette.success : palette.cNeutral8,
      border: solid ? 'transparent' : `1px solid ${palette.successLight}`,
      hoverBorderColor: solid ? 'transparent' : palette.success,
    },
    warning: {
      color: palette.cNeutral7,
      hoverColor: 'inherit',
      backgroundColor: solid ? palette.warningLight : palette.cNeutral8,
      hoverBackgroundColor: solid ? palette.warning : palette.cNeutral8,
      border: solid ? 'transparent' : `1px solid ${palette.warningLight}`,
      hoverBorderColor: solid ? 'transparent' : palette.warning,
    },
    error: {
      color: palette.error,
      hoverColor: palette.error,
      backgroundColor: solid ? addColorAlpha(palette.errorLight, 0.8) : palette.cNeutral8,
      hoverBackgroundColor: solid ? palette.errorLight : palette.cNeutral8,
      border: solid ? 'transparent' : `1px solid ${addColorAlpha(palette.errorLight, 0.8)}`,
      hoverBorderColor: solid ? 'transparent' : palette.errorLight,
    },
  }

  if (!status) return colors.default
  return colors[status]
}
