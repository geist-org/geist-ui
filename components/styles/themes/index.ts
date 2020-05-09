import { ThemeTypes } from '../../utils/prop-types'

export interface ZeitUIThemesPalette {
  /* eslint-disable @typescript-eslint/camelcase */
  accents_1: string
  accents_2: string
  accents_3: string
  accents_4: string
  accents_5: string
  accents_6: string
  accents_7: string
  accents_8: string
  /* eslint-enable camelcase */
  background: string
  foreground: string
  selection: string
  secondary: string
  code: string
  border: string
  success: string
  successLight: string
  successDark: string
  error: string
  errorLight: string
  errorDark: string
  warning: string
  warningLight: string
  warningDark: string
  cyan: string
  purple: string
  alert: string
  violet: string
  link: string
}

export interface ZeitUIThemesExpressiveness {
  linkStyle: string
  linkHoverStyle: string
  dropdownBoxShadow: string
  scrollerStart: string
  scrollerEnd: string
  shadowSmall: string
  shadowMedium: string
  shadowLarge: string
  portalOpacity: number
}

export interface ZeitUIThemesLayout {
  gap: string
  gapNegative: string
  gapHalf: string
  gapHalfNegative: string
  gapQuarter: string
  gapQuarterNegative: string
  pageMargin: string
  pageWidth: string
  pageWidthWithMargin: string
  breakpointMobile: string
  breakpointTablet: string
  radius: string
}

export interface ZeitUIThemesFont {
  sans: string
  mono: string
}

export interface BreakpointsItem {
  min: string
  max: string
}

export interface ZeitUIThemesBreakpoints {
  xs: BreakpointsItem
  sm: BreakpointsItem
  md: BreakpointsItem
  lg: BreakpointsItem
  xl: BreakpointsItem
}

export interface ZeitUIThemes {
  type: ThemeTypes
  font: ZeitUIThemesFont
  layout: ZeitUIThemesLayout
  palette: ZeitUIThemesPalette
  breakpoints: ZeitUIThemesBreakpoints
  expressiveness: ZeitUIThemesExpressiveness
}
