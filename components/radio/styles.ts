import { GeistUIThemesPalette } from '../themes/presets'
import { NormalTypes } from '../utils/prop-types'

export type RadioColor = {
  label: string
  border: string
  bg: string
}

export const getColors = (
  palette: GeistUIThemesPalette,
  status?: NormalTypes,
): RadioColor => {
  const colors: { [key in NormalTypes]: RadioColor } = {
    default: {
      label: palette.foreground,
      border: palette.border,
      bg: palette.foreground,
    },
    secondary: {
      label: palette.foreground,
      border: palette.border,
      bg: palette.foreground,
    },
    success: {
      label: palette.success,
      border: palette.success,
      bg: palette.success,
    },
    warning: {
      label: palette.warning,
      border: palette.warning,
      bg: palette.warning,
    },
    error: {
      label: palette.error,
      border: palette.error,
      bg: palette.error,
    },
  }

  if (!status) return colors.default
  return colors[status]
}
