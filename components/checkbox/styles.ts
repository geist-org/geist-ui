import { GeistUIThemesPalette } from '../themes/presets'
import { NormalTypes } from '../utils/prop-types'

export type CheckboxColor = {
  fill: string
  bg: string
}

export const getColors = (
  palette: GeistUIThemesPalette,
  status?: NormalTypes,
): CheckboxColor => {
  const colors: { [key in NormalTypes]: CheckboxColor } = {
    default: {
      fill: palette.foreground,
      bg: palette.background,
    },
    secondary: {
      fill: palette.foreground,
      bg: palette.background,
    },
    success: {
      fill: palette.success, // fondo
      bg: palette.background,
    },
    warning: {
      fill: palette.warning,
      bg: palette.background,
    },
    error: {
      fill: palette.error,
      bg: palette.background,
    },
  }

  if (!status) return colors.default
  return colors[status]
}
