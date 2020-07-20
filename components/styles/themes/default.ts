import { ZeitUIThemes, ZeitUIThemesPalette, ZeitUIThemesExpressiveness } from './index'
import { defaultFont, defaultBreakpoints, defaultLayout } from './shared'

export const palette: ZeitUIThemesPalette = {
  /* eslint-disable @typescript-eslint/camelcase */
  accents_1: '#fafafa',
  accents_2: '#eaeaea',
  accents_3: '#999',
  accents_4: '#888',
  accents_5: '#666',
  accents_6: '#444',
  accents_7: '#333',
  accents_8: '#111',
  /* eslint-enable camelcase */
  background: '#fff',
  foreground: '#000',
  selection: '#79ffe1',
  secondary: '#666',
  code: '#f81ce5',
  border: '#eaeaea',
  error: '#e15c56',
  errorLight: '#ff8585',
  errorLighter: '#f7d4d6',
  errorDark: '#b34a50',
  success: '#58f17a',
  successLight: '#8afb88',
  successLighter: '#d3e5ff',
  successDark: '#61be8f',
  warning: '#ffc438',
  warningLight: '#ffde40',
  warningLighter: '#ffefcf',
  warningDark: '#f48b4f',
  cyan: '#50e3c2',
  cyanLighter: '#aaffec',
  cyanLight: '#79ffe1',
  cyanDark: '#29bc9b',
  violet: '#7928ca',
  violetLighter: '#e3d7fc',
  violetLight: '#8a63d2',
  violetDark: '#4c2889',
  purple: '#f81ce5',
  alert: '#ff0080',
  magenta: '#eb367f',
  link: '#0070f3',

  // conflux ui
  cTheme0: '#e8f4ff',
  cTheme1: '#cce5ff',
  cTheme2: '#c0d8fc',
  cTheme3: '#a9bde6',
  cTheme4: '#6d8bc8',
  cTheme5: '#0054fe',
  cTheme6: '#0433dc',
  cTheme7: '#0626ae',
  cBlack0: '#282D30',
  cGray0: '#f9fafb',
  cGray1: '#f1f3f6',
  cGray2: '#ebeced',
  cGray3: '#dbdde0',
  cGray4: '#aaafbb',
  cGray5: '#9b9eac',
  cGray6: '#444',
  cWhite0: '#fff',
  brandLight: '#c0d8fc',
  brand: '#0054fe',
  brandDark: '#0626ae',
}

export const expressiveness: ZeitUIThemesExpressiveness = {
  linkStyle: 'none',
  linkHoverStyle: 'none',
  dropdownBoxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.02)',
  scrollerStart: 'rgba(255, 255, 255, 1)',
  scrollerEnd: 'rgba(255, 255, 255, 0)',
  shadowSmall: '0 5px 10px rgba(0, 0, 0, 0.12)',
  shadowMedium: '0 8px 30px rgba(0, 0, 0, 0.12)',
  shadowLarge: '0 30px 60px rgba(0, 0, 0, 0.12)',
  portalOpacity: 0.25,

  // radius
  R0: '0',
  R1: '2px',
  R2: '4px',
  R3: '8px',
  R4: '12px',
  R5: '50%',

  // drop shadows
  D0: 'none',
  D1: '0px 0px 2px rgba(0, 0, 0, 0.08)',
  D2: '0px 4px 8px rgba(0, 0, 0, 0.08)',
  D3: '0px 4px 8px rgba(0, 0, 0, 0.16)',
  D4: '0px 8px 16px rgba(0, 0, 0, 0.24)',
}

export const font = defaultFont

export const breakpoints = defaultBreakpoints

export const layout = defaultLayout

export const themes: ZeitUIThemes = {
  type: 'light',
  font,
  layout,
  palette,
  breakpoints,
  expressiveness,
}

export default themes
