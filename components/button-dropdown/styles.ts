import { GeistUIThemesPalette } from '../styles/themes'
import { NormalTypes } from '../utils/prop-types'

type ButtonDropdownColors = {
  color: string
  bgColor: string
  hoverBgColor: string
  hoverBorder: string
  borderLeftColor: string
}

export const getColor = (
  palette: GeistUIThemesPalette,
  type: NormalTypes | undefined,
  disabled: boolean = false,
) => {
  const colors: { [key in NormalTypes]: ButtonDropdownColors } = {
    default: {
      color: palette.accents_5,
      bgColor: palette.background,
      borderLeftColor: palette.accents_2,
      hoverBgColor: palette.accents_1,
      hoverBorder: palette.accents_2,
    },
    secondary: {
      color: palette.background,
      bgColor: palette.foreground,
      borderLeftColor: palette.accents_7,
      hoverBgColor: palette.accents_7,
      hoverBorder: palette.accents_7,
    },
    success: {
      color: palette.background,
      bgColor: palette.success,
      borderLeftColor: palette.successDark,
      hoverBgColor: palette.successDark,
      hoverBorder: palette.successDark,
    },
    warning: {
      color: palette.background,
      bgColor: palette.warning,
      borderLeftColor: palette.warningDark,
      hoverBgColor: palette.warningDark,
      hoverBorder: palette.warningDark,
    },
    error: {
      color: palette.background,
      bgColor: palette.error,
      borderLeftColor: palette.errorDark,
      hoverBgColor: palette.errorDark,
      hoverBorder: palette.errorDark,
    },
  }

  if (disabled)
    return {
      ...colors.default,
      bgColor: palette.accents_1,
      color: palette.accents_4,
    }
  return type ? colors[type] : colors.default
}
