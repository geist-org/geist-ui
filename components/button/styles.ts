import { ZeitUIThemes } from '../styles/themes'
import { NormalSizes, ButtonTypes } from '../utils/prop-types'

export interface ButtonColorGroup {
  bg: string
  border: string
  color: string
}

export const getButtonGhostColors = (theme: ZeitUIThemes, type: ButtonTypes): ButtonColorGroup | null => {
  const colors: { [key in ButtonTypes]?: ButtonColorGroup } = {
    secondary: {
      bg: theme.palette.background,
      border: theme.palette.foreground,
      color: theme.palette.foreground
    },
    success: {
      bg: theme.palette.background,
      border: theme.palette.success,
      color: theme.palette.success
    },
    warning: {
      bg: theme.palette.background,
      border: theme.palette.warning,
      color: theme.palette.warning,
    },
    error: {
      bg: theme.palette.background,
      border: theme.palette.error,
      color: theme.palette.error,
    }
  }
  
  return colors[type] || null
}

export const getButtonColors = (
  theme: ZeitUIThemes,
  type: ButtonTypes,
  disabled: boolean,
  ghost: boolean,
): ButtonColorGroup => {
  const colors: { [key in ButtonTypes]?: ButtonColorGroup } = {
    default: {
      bg: theme.palette.background,
      border: theme.palette.border,
      color: theme.palette.accents_5,
    },
    secondary: {
      bg: theme.palette.foreground,
      border: theme.palette.foreground,
      color: theme.palette.background,
    },
    success: {
      bg: theme.palette.success,
      border: theme.palette.success,
      color: '#fff',
    },
    warning: {
      bg: theme.palette.warning,
      border: theme.palette.warning,
      color: '#fff',
    },
    error: {
      bg: theme.palette.error,
      border: theme.palette.error,
      color: '#fff',
    },
    abort: {
      bg: 'transparent',
      border: 'transparent',
      color: theme.palette.accents_5,
    }
  }
  if (disabled) return {
    bg: theme.palette.accents_1,
    border: theme.palette.accents_2,
    color: '#ccc',
  }
  
  const defaultColor = colors['default'] as ButtonColorGroup
  
  if (ghost) return getButtonGhostColors(theme, type) || defaultColor
  return colors[type] || defaultColor
}

export const getButtonGhostHoverColors = (theme: ZeitUIThemes, type: ButtonTypes): ButtonColorGroup | null => {
  const colors: { [key in ButtonTypes]?: ButtonColorGroup } = {
    secondary: {
      bg: theme.palette.foreground,
      border: theme.palette.background,
      color: theme.palette.background
    },
    success: {
      bg: theme.palette.success,
      border: theme.palette.background,
      color: 'white'
    },
    warning: {
      bg: theme.palette.warning,
      border: theme.palette.background,
      color: 'white',
    },
    error: {
      bg: theme.palette.error,
      border: theme.palette.background,
      color: 'white',
    }
  }
  
  return colors[type] || null
}

export const getButtonHoverColors = (
  theme: ZeitUIThemes,
  type: ButtonTypes,
  disabled: boolean,
  loading: boolean,
  shadow: boolean,
  ghost: boolean,
): ButtonColorGroup => {
  const colors: { [key in ButtonTypes]?: any } = {
    default: {
      bg: theme.palette.background,
      border: theme.palette.foreground,
      color: theme.palette.foreground,
    },
    secondary: {
      bg: theme.palette.background,
      border: theme.palette.foreground,
      color: theme.palette.foreground,
    },
    success: {
      bg: theme.palette.background,
      border: theme.palette.success,
      color: theme.palette.success,
    },
    warning: {
      bg: theme.palette.background,
      border: theme.palette.warning,
      color: theme.palette.warning,
    },
    error: {
      bg: theme.palette.background,
      border: theme.palette.error,
      color: theme.palette.error,
    },
    abort: {
      bg: 'transparent',
      border: 'transparent',
      color: theme.palette.accents_5,
    }
  }
  const defaultHover = colors['default']
  
  if (disabled) return {
    bg: theme.palette.accents_1,
    border: theme.palette.accents_2,
    color: '#ccc',
  }
  if (loading) return {
    ...getButtonColors(theme, type, disabled, ghost),
    color: 'transparent',
  }
  if (shadow) return getButtonColors(theme, type, disabled, ghost)
  if (ghost) return getButtonGhostHoverColors(theme, type) || defaultHover
  return colors[type] || defaultHover
}

export interface ButtonCursorGroup {
  cursor: string
  events: string
}

export const getButtonCursor = (disabled: boolean, loading: boolean): ButtonCursorGroup => {
  if (disabled) return {
    cursor: 'not-allowed',
    events: 'auto',
  }
  if (loading) return {
    cursor: 'default',
    events: 'none',
  }
  
  return {
    cursor: 'pointer',
    events: 'auto',
  }
}

export type ButtonSizeGroup = {
  height: string
  width: string
  padding: string
  minWidth: string
  fontSize: string
}

export const getButtonSize = (size: NormalSizes = 'medium', auto: boolean): ButtonSizeGroup => {
  const defaultLayout: ButtonSizeGroup = {
    height: '2.5rem',
    width: 'auto',
    padding: '1.375rem',
    fontSize: '.875rem',
    minWidth: '12.5rem',
  }
  const autoPaddings: { [key in NormalSizes]: string } = {
    medium: '1.25rem',
    mini: '0.625rem',
    small: '0.9375rem',
    large: '1.5625rem',
  }
  const layouts: { [key in NormalSizes]: ButtonSizeGroup } = {
    mini: {
      height: '1.5rem',
      width: 'initial',
      padding: '1.875rem',
      fontSize: '.75rem',
      minWidth: '6.25rem',
    },
    small: {
      height: '2rem',
      width: 'initial',
      padding: '1.25rem',
      fontSize: '.875rem',
      minWidth: '9.375rem',
    },
    medium: defaultLayout,
    large: {
      height: '2.75rem',
      width: 'initial',
      padding: '1.875rem',
      fontSize: '1rem',
      minWidth: '15.625rem',
    }
  }
  
  if (auto) return {
    ...(layouts[size] || defaultLayout),
    padding: autoPaddings[size] || autoPaddings.medium,
    minWidth: 'min-content',
    width: 'auto'
  }
  
  
  return layouts[size] || defaultLayout
}
