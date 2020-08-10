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
  secondary: '#666',
  error: '#e15c56',
  errorLight: '#ffc2c2',
  errorDark: '#b34a50',
  success: '#58f17a',
  successLight: '#8afb88',
  successDark: '#61be8f',
  warning: '#ffc438',
  warningLight: '#ffde40',
  warningDark: '#f48b4f',
  code: '#f81ce5',
  border: '#eaeaea',
  cTheme0: '#e8f4ff',
  cTheme1: '#cce5ff',
  cTheme2: '#c0d8fc',
  cTheme3: '#a9bde6',
  cTheme4: '#6d8bc8',
  cTheme5: '#0054fe',
  cTheme6: '#0433dc',
  cTheme7: '#0626ae',
  cBlack0: '#000',
  cWhite0: '#fff',
  cNeutral0: '#f9fafb',
  cNeutral1: '#f1f3f6',
  cNeutral2: '#ebeced',
  cNeutral3: '#dbdde0',
  cNeutral4: '#aaafbb',
  cNeutral5: '#9b9eac',
  cNeutral6: '#444',
  cNeutral7: '#282d30',
  cNeutral8: '#fdfdfe',
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

  // border-width
  L1: '1px',
  L2: '2px',
  L4: '4px',

  // border-style
  cLineStyle1: 'solid',
  cLineStyle2: 'dashed',
  cLineStyle3: 'dotted',

  // drop shadows
  D0: 'none',
  D1: '0px 4px 6px -4px rgba(0, 0, 0, 0.12)',
  D2: '0px 6px 16px rgba(0, 0, 0, 0.08)',
  D3: '0px 8px 24px 8px rgba(0, 0, 0, 0.06)',
  D4: '8px 12px 16px rgba(0, 0, 0, 0.08)',
  D5: '12px 12px 24px rgba(0, 0, 0, 0.12)',
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
