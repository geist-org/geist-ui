import { NormalSizes, PaginationVariants } from 'components/utils/prop-types'
import { ZeitUIThemesPalette } from 'components/styles/themes'

export interface PaginationSize {
  font: string
  width: string
}

type PaginationColor = {
  color: string
  hoverColor: string
  borderColor: string
  hoverBorderColor: string
  bgColor: string
  hoverBgColor: string
}

export const getSizes = (size?: NormalSizes) => {
  const sizes: { [key in NormalSizes]: PaginationSize } = {
    mini: {
      font: '.75rem',
      width: '1.5rem',
    },
    small: {
      font: '0.8571rem',
      width: '2.2857rem',
    },
    medium: {
      font: '1rem',
      width: '2.2857rem',
    },
    large: {
      font: '1.1429rem',
      width: '3.4286rem',
    },
  }
  return size ? sizes[size] : sizes.medium
}

export const getColors = (
  palette: ZeitUIThemesPalette,
  variant: PaginationVariants = 'line',
  active: boolean = false,
) => {
  const colors: { [key in PaginationVariants]: PaginationColor } = {
    line: {
      color: active ? palette.cTheme5 : palette.cNeutral6,
      borderColor: active ? palette.cTheme5 : palette.cNeutral2,
      bgColor: palette.cWhite0,
      hoverColor: palette.cNeutral6,
      hoverBorderColor: palette.cTheme0,
      hoverBgColor: palette.cWhite0,
    },
    solid: {
      color: active ? palette.cWhite0 : palette.cBlack0,
      bgColor: active ? palette.cTheme5 : palette.cTheme0,
      borderColor: 'transparent',
      hoverBgColor: palette.cTheme1,
      hoverColor: palette.cNeutral6,
      hoverBorderColor: 'transparent',
    },
  }
  return colors[variant]
}
