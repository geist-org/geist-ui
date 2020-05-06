import {
  ZeitUIThemes,
  ZeitUIThemesPalette,
  ZeitUIThemesExpressiveness,
  ZeitUIThemesLayout,
  ZeitUIThemesFont,
} from './index'

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
  error: '#ff0000',
  errorLight: '#ff1a1a',
  errorDark: '#c00',
  success: '#0070f3',
  successLight: '#3291ff',
  successDark: '#0366d6',
  warning: '#f5a623',
  warningLight: '#f7b955',
  warningDark: '#f49b0b',
  cyan: '#79ffe1',
  purple: '#f81ce5',
  alert: '#ff0080',
  violet: '#7928ca',
  link: '#0070f3',
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
}

export const layout: ZeitUIThemesLayout = {
  gap: '16pt',
  gapNegative: '-16pt',
  gapHalf: '8pt',
  gapHalfNegative: '-8pt',
  gapQuarter: '4pt',
  gapQuarterNegative: '-4pt',
  pageMargin: '16pt',
  pageWidth: '750pt',
  pageWidthWithMargin: '782pt',
  breakpointMobile: '720px',
  breakpointTablet: '960px',
  radius: '5px',
}

export const font: ZeitUIThemesFont = {
  sans:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  mono:
    'Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace',
}

export const themes: ZeitUIThemes = {
  palette,
  expressiveness,
  layout,
  font,
  type: 'light',
}

export default themes
