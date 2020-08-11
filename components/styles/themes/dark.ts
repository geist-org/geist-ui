import { ZeitUIThemes, ZeitUIThemesPalette, ZeitUIThemesExpressiveness } from './index'
import { defaultFont, defaultBreakpoints, defaultLayout } from './shared'

export const palette: ZeitUIThemesPalette = {
  /* eslint-disable @typescript-eslint/camelcase */
  accents_1: '#111',
  accents_2: '#333',
  accents_3: '#444',
  accents_4: '#666',
  accents_5: '#888',
  accents_6: '#999',
  accents_7: '#eaeaea',
  accents_8: '#fafafa',
  /* eslint-enable camelcase */
  background: '#000',
  foreground: '#fff',
  selection: '#f81ce5',
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
  link: '#3291ff',

  // conflux ui
  secondary: '#888',
  error: '#e00',
  errorLight: '#ffc2c2',
  errorDark: '#c50000',
  success: '#0070f3',
  successLight: '#3291ff',
  successDark: '#0761d1',
  warning: '#f5a623',
  warningLight: '#f7b955',
  warningDark: '#ab570a',
  code: '#79ffe1',
  border: '#333',
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
  dropdownBoxShadow: '0 0 0 1px #333',
  scrollerStart: 'rgba(255, 255, 255, 1)',
  scrollerEnd: 'rgba(255, 255, 255, 0)',
  shadowSmall: '0 0 0 1px #333',
  shadowMedium: '0 0 0 1px #333',
  shadowLarge: '0 0 0 1px #333',
  portalOpacity: 0.75,

  L1: '1px',
  L2: '2px',
  L4: '4px',

  cLineStyle1: 'solid',
  cLineStyle2: 'dashed',
  cLineStyle3: 'dotted',

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
  D5: '12px 12px 24px rgba(0, 0, 0, 0.12)',
}

export const font = defaultFont

export const breakpoints = defaultBreakpoints

export const layout = defaultLayout

export const themes: ZeitUIThemes = {
  type: 'dark',
  font,
  layout,
  palette,
  breakpoints,
  expressiveness,
}

export default themes
