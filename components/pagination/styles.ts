import { NormalSizes, PaginationVariants } from 'components/utils/prop-types'
import { ZeitUIThemesPalette } from 'components/styles/themes'
import { addColorAlpha } from 'components/utils/color'

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
      width: '1.25rem',
    },
    small: {
      font: '.75rem',
      width: '1.65rem',
    },
    medium: {
      font: '.875rem',
      width: '2rem',
    },
    large: {
      font: '1rem',
      width: '2.4rem',
    },
  }
  return size ? sizes[size] : sizes.medium
}

export const getColors = (
  palette: ZeitUIThemesPalette,
  variant: PaginationVariants = 'line',
  disabled: boolean = false,
  active: boolean = false,
) => {
  const colors: { [key in PaginationVariants]: PaginationColor } = {
    line: {
      color: active ? palette.cTheme5 : palette.cNeutral6,
      borderColor: active ? palette.cTheme5 : palette.cNeutral2,
      bgColor: 'transparent',
      hoverColor: palette.cTheme5,
      hoverBorderColor: palette.cTheme0,
      hoverBgColor: 'transparent',
    },
    solid: {
      color: active ? palette.cWhite0 : palette.cBlack0,
      bgColor: active ? palette.cTheme5 : addColorAlpha(palette.cTheme5, 0.04),
      borderColor: 'transparent',
      hoverBgColor: palette.cTheme0,
      hoverColor: palette.cNeutral6,
      hoverBorderColor: 'transparent',
    },
  }
  if (disabled) {
    return {
      color: palette.cNeutral6,
      hoverColor: palette.cTheme5,
      borderColor: palette.cNeutral2,
      hoverBorderColor: palette.cTheme5,
      bgColor: 'transparent',
      hoverBgColor: 'transparent',
    }
  }
  return variant ? colors[variant] : colors.line
}
