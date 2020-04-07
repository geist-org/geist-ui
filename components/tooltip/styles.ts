import { SnippetTypes } from '../utils/prop-types'
import { ZeitUIThemesPalette } from '../styles/themes'

export type TooltipColors = {
  bgColor: string
  color: string
}

export const getColors = (
  type: SnippetTypes,
  palette: ZeitUIThemesPalette,
): TooltipColors => {
  const colors: { [key in SnippetTypes ]: string } = {
    default: palette.background,
    success: palette.success,
    warning: palette.warning,
    error: palette.error,
    secondary: palette.secondary,
    dark: palette.foreground,
    lite: palette.background
  }
  const color = type === 'lite' || type === 'default' ? palette.foreground : palette.background
  
  return {
    color,
    bgColor: colors[type]
  }
}
