import { NormalTypes } from '../utils/prop-types'
import { GeistUIThemesPalette } from '../themes/presets'

export type SelectColor = {
  border: string
  borderHover: string
  iconBorder: string
  placeholderColor: string
}

export const getColors = (
  palette: GeistUIThemesPalette,
  status?: NormalTypes,
): SelectColor => {
  const colors: { [key in NormalTypes]: SelectColor } = {
    default: {
      border: palette.border,
      borderHover: palette.foreground,
      iconBorder: palette.accents_5,
      placeholderColor: palette.accents_3,
    },
    secondary: {
      border: palette.border,
      borderHover: palette.foreground,
      iconBorder: palette.accents_5,
      placeholderColor: palette.accents_3,
    },
    success: {
      border: palette.success,
      borderHover: palette.successDark,
      iconBorder: palette.success,
      placeholderColor: palette.accents_3,
    },
    warning: {
      border: palette.warning,
      borderHover: palette.warningDark,
      iconBorder: palette.warning,

      placeholderColor: palette.accents_3,
    },
    error: {
      border: palette.error,
      borderHover: palette.errorDark,
      iconBorder: palette.error,

      placeholderColor: palette.error,
    },
  }

  if (!status) return colors.default
  return colors[status]
}
