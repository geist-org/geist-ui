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
  successLighter: string
  successLight: string
  successDark: string
  error: string
  errorLighter: string
  errorLight: string
  errorDark: string
  warning: string
  warningLighter: string
  warningLight: string
  warningDark: string
  cyan: string
  cyanLighter: string
  cyanLight: string
  cyanDark: string
  violet: string
  violetLighter: string
  violetLight: string
  violetDark: string
  link: string
  purple: string
  magenta: string
  alert: string

  // conflux
  cThem0: string
  cThem1: string
  cThem2: string
  cThem3: string
  cThem4: string
  cThem5: string
  cThem6: string
  cThem7: string
  cBlack0: string
  cGray0: string
  cGray1: string
  cGray2: string
  cGray3: string
  cGray4: string
  cGray5: string
  cGray6: string
  cWhite0: string
  brandLight: string
  brand: string
  brandDark: string
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

  // radius
  R0: string
  R1: string
  R2: string
  R3: string
  R4: string
  R5: string

  // drop shadows
  D0: string
  D1: string
  D2: string
  D3: string
  D4: string
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
  circular: string
  pingfang: string
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
