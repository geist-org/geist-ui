import { NormalTypes } from '../utils/prop-types'
import { GeistUIThemesPalette } from '../themes/presets'

export type InputColor = {
  color: string
  borderColor: string
  hoverBorder: string
}

export const getColors = (
  palette: GeistUIThemesPalette,
  status?: NormalTypes,
): InputColor => {
  const colors: { [key in NormalTypes]: InputColor } = {
    default: {
      color: palette.foreground,
      borderColor: palette.border,
      hoverBorder: palette.accents_5,
    },
    secondary: {
      color: palette.foreground,
      borderColor: palette.secondary,
      hoverBorder: palette.secondary,
    },
    success: {
      color: palette.foreground,
      borderColor: palette.successLight,
      hoverBorder: palette.success,
    },
    warning: {
      color: palette.foreground,
      borderColor: palette.warningLight,
      hoverBorder: palette.warning,
    },
    error: {
      color: palette.error,
      borderColor: palette.error,
      hoverBorder: palette.errorDark,
    },
  }

  if (!status) return colors.default
  return colors[status]
}
