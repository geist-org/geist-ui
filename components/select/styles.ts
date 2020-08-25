import { NormalSizes, SelectVariants } from 'components/utils/prop-types'
import { ZeitUIThemes, ZeitUIThemesPalette } from 'components/styles/themes'

export interface SelectSize {
  height: string
  fontSize: string
  labelFontSize: string
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
  bgColor: string
  border: string
  hoverColor: string
  hoverBgColor: string
  hoverBorder: string
  placeholderColor: string
}

export const getSizes = (theme: ZeitUIThemes, size?: NormalSizes) => {
  const sizes: { [key in NormalSizes]: SelectSize } = {
    medium: {
      height: `calc(2.625 * ${theme.layout.gap})`,
      fontSize: '1rem',
      labelFontSize: '1.1428rem',
    },
    small: {
      height: `calc(2 * ${theme.layout.gap})`,
      fontSize: '.8571rem',
      labelFontSize: '1rem',
    },
    mini: {
      height: `calc(1.5 * ${theme.layout.gap})`,
      fontSize: '.8571rem',
      labelFontSize: '1rem',
    },
    large: {
      height: `calc(3 * ${theme.layout.gap})`,
      fontSize: '1.225rem',
      labelFontSize: '1.375rem',
    },
  }

  return size ? sizes[size] : sizes.medium
}

export const getOptionColors = (
  selected: boolean,
  disabled: boolean = false,
  palette: ZeitUIThemesPalette,
  isLabel: boolean = false,
  variant: SelectVariants = 'line',
) => {
  const colors: { [key in SelectVariants]: optionColors } = {
    line: {
      color: selected ? palette.cNeutral8 : palette.cNeutral6,
      bgColor: selected ? palette.cTheme5 : palette.cNeutral8,
      border: 'transparent',
      hoverColor: selected ? palette.cNeutral8 : palette.cTheme5,
      hoverBgColor: selected ? palette.cTheme5 : palette.cTheme0,
      hoverBorder: 'transparent',
    },
    text: {
      color: selected ? palette.cTheme5 : palette.cNeutral6,
      bgColor: palette.cNeutral8,
      border: selected ? palette.cTheme5 : 'transparent',
      hoverColor: palette.cTheme5,
      hoverBgColor: palette.cNeutral8,
      hoverBorder: selected ? palette.cTheme5 : palette.cTheme0,
    },
  }
  if (disabled) {
    return {
      color: palette.cNeutral4,
      bgColor: palette.cNeutral8,
      border: 'transparent',
      hoverColor: palette.cNeutral4,
      hoverBgColor: palette.cNeutral8,
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
  variant: SelectVariants = 'line',
): selectColors => {
  if (disabled) {
    return {
      color: palette.cNeutral4,
      bgColor: palette.cNeutral2,
      border: variant === 'text' ? 'transparent' : palette.cNeutral3,
      placeholderColor: palette.cNeutral4,
      hoverColor: palette.cNeutral4,
      hoverBgColor: palette.cNeutral2,
      hoverBorder: palette.cNeutral3,
    }
  }
  return {
    color: palette.cNeutral6,
    bgColor: palette.cNeutral8,
    border: variant === 'text' ? 'transparent' : palette.cNeutral3,
    placeholderColor: palette.cNeutral5,
    hoverColor: palette.cTheme5,
    hoverBgColor: palette.cNeutral8,
    hoverBorder: variant === 'text' ? 'transparent' : palette.cTheme5,
  }
}
