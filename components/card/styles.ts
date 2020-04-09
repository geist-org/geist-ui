import { CardTypes } from '../utils/prop-types'
import { ZeitUIThemesPalette } from '../styles/themes'

export type CardStyles = {
  color: string
  bgColor: string
  borderColor: string
}

export const getStyles = (
  type: CardTypes,
  palette: ZeitUIThemesPalette,
  isShadow?: boolean,
): CardStyles => {
  const colors: { [key in CardTypes]: Omit<CardStyles, 'borderColor'> } = {
    default: {
      color: palette.foreground,
      bgColor: palette.background,
    },
    dark: {
      color: palette.background,
      bgColor: palette.foreground,
    },
    secondary: {
      color: palette.background,
      bgColor: palette.secondary,
    },
    success: {
      color: palette.background,
      bgColor: palette.success,
    },
    warning: {
      color: palette.background,
      bgColor: palette.warning,
    },
    error: {
      color: palette.background,
      bgColor: palette.error,
    },
    lite: {
      color: palette.foreground,
      bgColor: palette.background,
    },
    alert: {
      color: 'white',
      bgColor: palette.alert,
    },
    purple: {
      color: 'white',
      bgColor: palette.purple,
    },
    violet: {
      color: 'white',
      bgColor: palette.violet,
    },
    cyan: {
      color: 'black',
      bgColor: palette.cyan,
    },
  }
  const showBorder = type === 'default' && !isShadow
  return {
    ...colors[type],
    borderColor: showBorder ? palette.border : 'transparent',
  }
}
