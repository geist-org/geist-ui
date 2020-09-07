import {
  CfxUIThemesBreakpoints,
  CfxUIThemesFont,
  CfxUIThemesLayout,
} from 'components/styles/themes/index'

export const defaultFont: CfxUIThemesFont = {
  sans:
    '"Circular Std Book", "PingFang SC", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  mono:
    'Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace',
}

export const defaultBreakpoints: CfxUIThemesBreakpoints = {
  xs: {
    min: '0',
    max: '650px',
  },
  sm: {
    min: '650px',
    max: '900px',
  },
  md: {
    min: '900px',
    max: '1280px',
  },
  lg: {
    min: '1280px',
    max: '1920px',
  },
  xl: {
    min: '1920px',
    max: '10000px',
  },
}

export const defaultLayout: CfxUIThemesLayout = {
  gap: '16px',
  gapNegative: '-16px',
  gapHalf: '8px',
  gapHalfNegative: '-8px',
  gapQuarter: '4px',
  gapQuarterNegative: '-4px',
  pageMargin: '16px',
  pageWidth: '950px',
  pageWidthWithMargin: '982px',
  breakpointMobile: defaultBreakpoints.xs.max,
  breakpointTablet: defaultBreakpoints.sm.max,
  // radius: '5px',
}
