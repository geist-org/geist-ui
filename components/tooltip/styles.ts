import { SnippetColors } from '../utils/prop-types'
import { CfxUIThemesPalette } from '../styles/themes'

export type TooltipColors = {
  bgColor: string
  color: string
}

export const getColors = (color: SnippetColors, palette: CfxUIThemesPalette): TooltipColors => {
  if (color === 'default') color = 'dark'
  const colors: { [key in SnippetColors]: string } = {
    default: palette.cNeutral8,
    success: palette.success,
    warning: palette.warning,
    error: palette.error,
    secondary: palette.cNeutral4,
    dark: palette.cNeutral7,
    lite: palette.cNeutral8,
  }
  const fontColor = color === 'lite' ? palette.foreground : palette.background

  return {
    color: fontColor,
    bgColor: colors[color],
  }
}
