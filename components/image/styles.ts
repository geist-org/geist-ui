import { GeistUIThemesPalette } from 'components/themes/presets'

export type BrowserColors = {
  color: string
  barBgColor: string
  inputBgColor: string
  borderColor: string
  titleColor: string
}

export const getBrowserColors = (
  invert: boolean,
  palette: GeistUIThemesPalette,
): BrowserColors => {
  return invert
    ? {
        color: palette.background,
        barBgColor: palette.foreground,
        inputBgColor: palette.accents_8,
        borderColor: palette.accents_7,
        titleColor: palette.accents_2,
      }
    : {
        color: palette.foreground,
        barBgColor: palette.background,
        inputBgColor: palette.accents_1,
        borderColor: palette.border,
        titleColor: palette.accents_5,
      }
}
