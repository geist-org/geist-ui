import { NormalSizes, SelectTypes } from 'components/utils/prop-types'
import { ZeitUIThemes, ZeitUIThemesPalette } from 'components/styles/themes'

export interface SelectSize {
  height: string
  fontSize: string
  minWidth: string
}

type optionColors = {
  color: string
  bgColor: string
  border: string
  hoverColor: string
  hoverBgColor: string
  hoverBorder: string
}

type selectColors = {
  color: string
  hoverColor: string
  border: string
  placeholderColor: string
}

export const getSizes = (theme: ZeitUIThemes, size?: NormalSizes) => {
  const sizes: { [key in NormalSizes]: SelectSize } = {
    medium: {
      height: `calc(2.625 * ${theme.layout.gap})`,
      fontSize: '1rem',
      minWidth: '10rem',
    },
    small: {
      height: `calc(1.8 * ${theme.layout.gap})`,
      fontSize: '.75rem',
      minWidth: '8rem',
    },
    mini: {
      height: `calc(1.334 * ${theme.layout.gap})`,
      fontSize: '.75rem',
      minWidth: '6.5rem',
    },
    large: {
      height: `calc(2.667 * ${theme.layout.gap})`,
      fontSize: '1.225rem',
      minWidth: '12.5rem',
    },
  }

  return size ? sizes[size] : sizes.medium
}

export const getOptionColors = (
  selected: boolean,
  disabled: boolean = false,
  palette: ZeitUIThemesPalette,
  isLabel: boolean = false,
  variant: SelectTypes = 'line',
  rgb: number[],
) => {
  const [r, g, b] = rgb
  const colors: { [key in SelectTypes]: optionColors } = {
    line: {
      color: selected ? palette.cNeutral8 : palette.cNeutral6,
      bgColor: selected ? palette.cTheme5 : palette.cNeutral8,
      border: 'transparent',
      hoverColor: selected ? palette.cNeutral8 : palette.cTheme5,
      hoverBgColor: selected ? palette.cTheme5 : `rgba(${r}, ${g}, ${b}, 0.04)`,
      hoverBorder: 'transparent',
    },
    text: {
      color: selected ? palette.cTheme5 : palette.cNeutral6,
      bgColor: palette.cNeutral8,
      border: selected ? palette.cTheme5 : 'transparent',
      hoverColor: palette.cTheme5,
      hoverBgColor: palette.cNeutral8,
      hoverBorder: selected ? palette.cTheme5 : `rgba(${r}, ${g}, ${b}, 0.12)`,
    },
  }
  if (disabled) {
    return {
      color: palette.cNeutral4,
      bgColor: palette.cNeutral3,
      border: 'transparent',
      hoverColor: palette.cNeutral4,
      hoverBgColor: palette.cNeutral3,
      hoverBorder: 'transparent',
    }
  }
  if (isLabel) {
    return {
      color: palette.cNeutral7,
      bgColor: palette.cNeutral8,
      border: 'transparent',
      hoverColor: palette.cNeutral7,
      hoverBgColor: palette.cNeutral8,
      hoverBorder: 'transparent',
    }
  }
  return variant ? colors[variant] : colors.line
}

export const getSelectColors = (
  disabled: boolean = false,
  palette: ZeitUIThemesPalette,
  variant: SelectTypes = 'line',
): selectColors => {
  if (disabled) {
    return {
      color: palette.cNeutral3,
      hoverColor: palette.cNeutral3,
      placeholderColor: palette.cNeutral3,
      border: variant === 'text' ? 'parent' : palette.cNeutral3,
    }
  }
  return {
    color: palette.cNeutral6,
    hoverColor: palette.cTheme5,
    placeholderColor: palette.cNeutral5,
    border: variant === 'text' ? 'parent' : palette.cNeutral3,
  }
}
