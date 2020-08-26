import { NormalSizes, InputColors } from '../utils/prop-types'
import { ZeitUIThemes } from '../styles/themes'
import { addColorAlpha } from '../utils/color'

export type InputSize = {
  heightRatio: string
  fontSize: string
  margin: string
}

export const getSizes = (size?: NormalSizes) => {
  const sizes: { [key in NormalSizes]: InputSize } = {
    mini: {
      heightRatio: '1.5',
      fontSize: '0.5714rem',
      margin: '0 1.1429rem',
    },
    small: {
      heightRatio: '2',
      fontSize: '0.8571rem',
      margin: '0 1.1429rem',
    },
    medium: {
      heightRatio: '2.5',
      fontSize: '1rem',
      margin: '0 1.1429rem',
    },
    large: {
      heightRatio: '3',
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
  theme: ZeitUIThemes,
  color?: InputColors,
  solid?: boolean,
): InputColor => {
  const colors: { [key in InputColors]: InputColor } = {
    default: {
      color: theme.palette.cNeutral7,
      hoverColor: solid ? 'inherit' : theme.palette.cTheme5,
      backgroundColor: solid ? theme.palette.cNeutral0 : theme.palette.cNeutral8,
      hoverBackgroundColor: solid ? theme.palette.cTheme0 : theme.palette.cNeutral8,
      border: solid
        ? 'transparent'
        : `${theme.expressiveness.L1} ${theme.expressiveness.cLineStyle1} ${theme.palette.cNeutral2}`,
      hoverBorderColor: solid ? 'transparent' : theme.palette.cTheme5,
    },
    primary: {
      color: theme.palette.cNeutral7,
      hoverColor: solid ? 'inherit' : theme.palette.cTheme5,
      backgroundColor: solid ? theme.palette.cTheme0 : theme.palette.cNeutral8,
      hoverBackgroundColor: solid ? theme.palette.cTheme1 : theme.palette.cNeutral8,
      border: solid
        ? 'transparent'
        : `${theme.expressiveness.L1} ${theme.expressiveness.cLineStyle1} ${theme.palette.cTheme2}`,
      hoverBorderColor: solid ? 'transparent' : theme.palette.cTheme5,
    },
    success: {
      color: theme.palette.cNeutral7,
      hoverColor: 'inherit',
      backgroundColor: solid ? theme.palette.successLight : theme.palette.cNeutral8,
      hoverBackgroundColor: solid ? theme.palette.success : theme.palette.cNeutral8,
      border: solid
        ? 'transparent'
        : `${theme.expressiveness.L1} ${theme.expressiveness.cLineStyle1} ${theme.palette.successLight}`,
      hoverBorderColor: solid ? 'transparent' : theme.palette.success,
    },
    warning: {
      color: theme.palette.cNeutral7,
      hoverColor: 'inherit',
      backgroundColor: solid ? theme.palette.warningLight : theme.palette.cNeutral8,
      hoverBackgroundColor: solid ? theme.palette.warning : theme.palette.cNeutral8,
      border: solid
        ? 'transparent'
        : `${theme.expressiveness.L1} ${theme.expressiveness.cLineStyle1} ${theme.palette.warningLight}`,
      hoverBorderColor: solid ? 'transparent' : theme.palette.warning,
    },
    error: {
      color: theme.palette.error,
      hoverColor: theme.palette.error,
      backgroundColor: solid
        ? addColorAlpha(theme.palette.errorLight, 0.4)
        : theme.palette.cNeutral8,
      hoverBackgroundColor: solid ? theme.palette.errorLight : theme.palette.cNeutral8,
      border: solid
        ? 'transparent'
        : `${theme.expressiveness.L1} ${theme.expressiveness.cLineStyle1} ${addColorAlpha(
            theme.palette.error,
            0.4,
          )}`,
      hoverBorderColor: solid ? 'transparent' : theme.palette.error,
    },
  }

  if (!color) return colors.default
  return colors[color]
}
