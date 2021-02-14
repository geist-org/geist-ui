import { SnippetTypes } from '../utils/prop-types'
import { GeistUIThemesPalette } from '../themes/presets'

export type TooltipColors = {
  bgColor: string
  color: string
}

export const getColors = (
  type: SnippetTypes,
  palette: GeistUIThemesPalette,
): TooltipColors => {
  const colors: { [key in SnippetTypes]: string } = {
    default: palette.background,
    success: palette.success,
    warning: palette.warning,
    error: palette.error,
    secondary: palette.secondary,
    dark: palette.foreground,
    lite: palette.background,
  }
  const color =
    type === 'lite' || type === 'default' ? palette.foreground : palette.background

  return {
    color,
    bgColor: colors[type],
  }
}
