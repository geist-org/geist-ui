import {
  ZeitUIThemes,
  ZeitUIThemesPalette,
  ZeitUIThemesExpressiveness,
  ZeitUIThemesLayout,
  ZeitUIThemesFont,
} from './index'

export const palette: ZeitUIThemesPalette = {
  accents_1: '#111',
  accents_2: '#333',
  accents_3: '#444',
  accents_4: '#666',
  accents_5: '#888',
  accents_6: '#999',
  accents_7: '#eaeaea',
  accents_8: '#fafafa',
  background: '#000',
  foreground: '#fff',
  selection: '#f81ce5',
  secondary: '#888',
  code: '#79ffe1',
  border: '#333',
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
}

export const expressiveness: ZeitUIThemesExpressiveness = {
  linkColor: '#fff',
  linkStyle: 'none',
  linkHoverStyle: 'none',
  dropdownBoxShadow: '0 0 0 1px #333',
  dropdownTriangleStroke: '#fff',
  scrollerStart: 'rgba(255, 255, 255, 1)',
  scrollerEnd: 'rgba(255, 255, 255, 0)',
  shadowSmall: '0 0 0 1px #333',
  shadowMedium: '0 0 0 1px #333',
  shadowLarge: '0 0 0 1px #333',
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
  breakpointMobile: '600px',
  breakpointTablet: '960px',
  radius: '5px',
}

export const font: ZeitUIThemesFont = {
  sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  mono: 'Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace',
}

export const themes: ZeitUIThemes = {
  palette,
  expressiveness,
  layout,
  font,
  type: 'dark',
}

export default themes
