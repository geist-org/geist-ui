import { ZeitUIThemesPalette } from '../styles/themes'
import { addColorAlpha } from '../utils/color'
import { NormalSizes, ButtonTypes } from '../utils/prop-types'
import { ButtonProps } from './button'

export interface ButtonColorGroup {
  bg: string
  border: string
  color: string
}

export const getButtonColors = (
  palette: ZeitUIThemesPalette,
  props: ButtonProps,
): ButtonColorGroup => {
  const { variant, color } = props
  const category = {
    solid: {
      default: {
        bg: palette.cNeutral0,
        border: palette.cNeutral0,
        color: palette.cNeutral7,
      },
      primary: {
        bg: palette.cTheme5,
        border: palette.cTheme5,
        color: palette.cNeutral8,
      },
      secondary: {
        bg: palette.cNeutral7,
        border: palette.cNeutral7,
        color: palette.cNeutral8,
      },
      success: {
        bg: palette.success,
        border: palette.success,
        color: palette.cNeutral8,
      },
      warning: {
        bg: palette.warning,
        border: palette.warning,
        color: palette.cNeutral8,
      },
      error: {
        bg: palette.error,
        border: palette.error,
        color: palette.cNeutral8,
      },
    },
    lined: {
      default: {
        bg: palette.cNeutral8,
        border: palette.cNeutral2,
        color: palette.cNeutral6,
      },
      primary: {
        bg: palette.cNeutral8,
        border: palette.cTheme5,
        color: palette.cTheme5,
      },
      secondary: {
        bg: palette.cNeutral8,
        border: palette.cNeutral7,
        color: palette.cNeutral7,
      },
      success: {
        bg: palette.cNeutral8,
        border: palette.success,
        color: palette.success,
      },
      warning: {
        bg: palette.cNeutral8,
        border: palette.warning,
        color: palette.warning,
      },
      error: {
        bg: palette.cNeutral8,
        border: palette.error,
        color: palette.error,
      },
    },
    text: {
      primary: {
        bg: 'transparent',
        border: 'transparent',
        color: palette.cTheme5,
      },
      default: {
        bg: 'transparent',
        border: 'transparent',
        color: palette.cNeutral6,
      },
      secondary: {
        bg: 'transparent',
        border: 'transparent',
        color: palette.cTheme4,
      },
      success: {
        bg: 'transparent',
        border: 'transparent',
        color: palette.success,
      },
      warning: {
        bg: 'transparent',
        border: 'transparent',
        color: palette.warning,
      },
      error: {
        bg: 'transparent',
        border: 'transparent',
        color: palette.error,
      },
    },
  }
  const colors: { [key in ButtonTypes]?: ButtonColorGroup } = category[variant]
  const defaultColor = colors.default as ButtonColorGroup
  return colors[color] || defaultColor

  // const { color, disabled, ghost } = props
  // const colors: { [key in ButtonTypes]?: ButtonColorGroup } = {
  //   default: {
  //     bg: palette.cWhite0,
  //     border: palette.cGray2,
  //     color: palette.cGray6,
  //   },
  //   secondary: {
  //     bg: palette.cBlack0,
  //     border: palette.cBlack0,
  //     color: palette.cWhite0,
  //   },
  //   success: {
  //     bg: palette.success,
  //     border: palette.success,
  //     color: '#fff',
  //   },
  //   warning: {
  //     bg: palette.warning,
  //     border: palette.warning,
  //     color: '#fff',
  //   },
  //   error: {
  //     bg: palette.error,
  //     border: palette.error,
  //     color: '#fff',
  //   },
  //   abort: {
  //     bg: 'transparent',
  //     border: 'transparent',
  //     color: palette.accents_5,
  //   },
  // }
  // if (disabled)
  //   return {
  //     bg: palette.cWhite0,
  //     border: palette.cGray3,
  //     color: palette.cGray5,
  //   }

  // /**
  //  * The '-light' color is the same color as the common color,
  //  * only hover's color is different.
  //  * e.g.
  //  *   Color['success'] === Color['success-light']
  //  *   Color['warning'] === Color['warning-light']
  //  */
  // const withoutLightType = color.replace('-light', '') as ButtonTypes
  // const defaultColor = colors.default as ButtonColorGroup

  // if (ghost) return getButtonGhostColors(palette, withoutLightType) || defaultColor
  // return colors[withoutLightType] || defaultColor
}

export const getButtonHoverColors = (
  palette: ZeitUIThemesPalette,
  props: ButtonProps,
): ButtonColorGroup => {
  const { variant, color } = props
  const category = {
    solid: {
      default: {
        bg: palette.cNeutral2,
        border: palette.cNeutral2,
        color: palette.cNeutral7,
      },
      primary: {
        bg: palette.cTheme6,
        border: palette.cTheme6,
        color: palette.cNeutral8,
      },
      secondary: {
        bg: palette.cNeutral7,
        border: palette.cNeutral7,
        color: palette.cNeutral8,
      },
      success: {
        bg: palette.success,
        border: palette.success,
        color: palette.cNeutral8,
      },
      warning: {
        bg: palette.warning,
        border: palette.warning,
        color: palette.cNeutral8,
      },
      error: {
        bg: palette.error,
        border: palette.error,
        color: palette.cNeutral8,
      },
    },
    lined: {
      default: {
        bg: palette.cNeutral8,
        border: palette.cNeutral4,
        color: palette.cNeutral6,
      },
      primary: {
        bg: palette.cNeutral8,
        border: palette.cTheme6,
        color: palette.cTheme6,
      },
      secondary: {
        bg: palette.cNeutral8,
        border: palette.cNeutral7,
        color: palette.cNeutral7,
      },
      success: {
        bg: palette.cNeutral8,
        border: palette.success,
        color: palette.success,
      },
      warning: {
        bg: palette.cNeutral8,
        border: palette.warning,
        color: palette.warning,
      },
      error: {
        bg: palette.cNeutral8,
        border: palette.error,
        color: palette.error,
      },
    },
    text: {
      primary: {
        bg: addColorAlpha(palette.cTheme6, 0.04),
        border: 'transparent',
        color: palette.cTheme6,
      },
      default: {
        bg: palette.cNeutral0,
        border: 'transparent',
        color: palette.cNeutral6,
      },
      secondary: {
        bg: addColorAlpha(palette.cTheme3, 0.12),
        border: 'transparent',
        color: palette.cTheme4,
      },
      success: {
        bg: addColorAlpha(palette.success, 0.12),
        border: 'transparent',
        color: palette.success,
      },
      warning: {
        bg: addColorAlpha(palette.warning, 0.12),
        border: 'transparent',
        color: palette.warning,
      },
      error: {
        bg: addColorAlpha(palette.error, 0.12),
        border: 'transparent',
        color: palette.error,
      },
    },
  }
  const colors: { [key in ButtonTypes]?: ButtonColorGroup } = category[variant]
  const defaultColor = colors.default as ButtonColorGroup
  return colors[color] || defaultColor
  // const { color, disabled, loading, shadow, ghost } = props
  // const defaultColor = getButtonColors(palette, props)
  // const alphaBackground = addColorAlpha(defaultColor.bg, 0.85)
  // const colors: {
  //   [key in ButtonTypes]: Omit<ButtonColorGroup, 'color'> & {
  //     color?: string
  //   }
  // } = {
  //   default: {
  //     bg: palette.cWhite0,
  //     border: palette.cGray4,
  //     color: palette.cGray6,
  //   },
  //   secondary: {
  //     bg: palette.cWhite0,
  //     border: palette.cBlack0,
  //   },
  //   success: {
  //     bg: palette.cWhite0,
  //     border: palette.success,
  //   },
  //   warning: {
  //     bg: palette.cWhite0,
  //     border: palette.warning,
  //   },
  //   error: {
  //     bg: palette.cWhite0,
  //     border: palette.error,
  //   },
  //   abort: {
  //     bg: 'transparent',
  //     border: 'transparent',
  //     color: palette.accents_5,
  //   },
  //   'secondary-light': {
  //     ...defaultColor,
  //     bg: alphaBackground,
  //   },
  //   'success-light': {
  //     ...defaultColor,
  //     bg: alphaBackground,
  //   },
  //   'warning-light': {
  //     ...defaultColor,
  //     bg: alphaBackground,
  //   },
  //   'error-light': {
  //     ...defaultColor,
  //     bg: alphaBackground,
  //   },
  // }
  // if (disabled)
  //   return {
  //     bg: palette.cWhite0,
  //     border: palette.cGray3,
  //     color: palette.cGray5,
  //   }
  // if (loading)
  //   return {
  //     ...defaultColor,
  //     color: 'transparent',
  //   }
  // if (shadow) return defaultColor

  // const hoverColor =
  //   (ghost ? getButtonGhostHoverColors(palette, color) : colors[color]) || colors.default
  // return {
  //   ...hoverColor,
  //   color: hoverColor.color || hoverColor.border,
  // }
}

export const getButtonActiveColors = (
  palette: ZeitUIThemesPalette,
  props: ButtonProps,
): ButtonColorGroup => {
  const { variant, color } = props
  const category = {
    solid: {
      default: {
        bg: palette.cNeutral5,
        border: palette.cNeutral5,
        color: palette.cNeutral7,
      },
      primary: {
        bg: palette.cTheme7,
        border: palette.cTheme7,
        color: palette.cNeutral8,
      },
      secondary: {
        bg: palette.cNeutral7,
        border: palette.cNeutral7,
        color: palette.cNeutral8,
      },
      success: {
        bg: palette.success,
        border: palette.success,
        color: palette.cNeutral8,
      },
      warning: {
        bg: palette.warning,
        border: palette.warning,
        color: palette.cNeutral8,
      },
      error: {
        bg: palette.error,
        border: palette.error,
        color: palette.cNeutral8,
      },
    },
    lined: {
      default: {
        bg: palette.cNeutral8,
        border: palette.cNeutral5,
        color: palette.cNeutral6,
      },
      primary: {
        bg: palette.cNeutral8,
        border: palette.cTheme7,
        color: palette.cTheme7,
      },
      secondary: {
        bg: palette.cNeutral8,
        border: palette.cNeutral7,
        color: palette.cNeutral7,
      },
      success: {
        bg: palette.cNeutral8,
        border: palette.success,
        color: palette.success,
      },
      warning: {
        bg: palette.cNeutral8,
        border: palette.warning,
        color: palette.warning,
      },
      error: {
        bg: palette.cNeutral8,
        border: palette.error,
        color: palette.error,
      },
    },
    text: {
      primary: {
        bg: addColorAlpha(palette.cTheme5, 0.12),
        border: 'transparent',
        color: palette.cTheme7,
      },
      default: {
        bg: palette.cNeutral2,
        border: 'transparent',
        color: palette.cNeutral6,
      },
      secondary: {
        bg: addColorAlpha(palette.cTheme3, 0.24),
        border: 'transparent',
        color: palette.cTheme4,
      },
      success: {
        bg: addColorAlpha(palette.success, 0.24),
        border: 'transparent',
        color: palette.success,
      },
      warning: {
        bg: addColorAlpha(palette.warning, 0.24),
        border: 'transparent',
        color: palette.warning,
      },
      error: {
        bg: addColorAlpha(palette.error, 0.24),
        border: 'transparent',
        color: palette.error,
      },
    },
  }
  const colors: { [key in ButtonTypes]?: ButtonColorGroup } = category[variant]
  const defaultColor = colors.default as ButtonColorGroup
  return colors[color] || defaultColor
}

export const getButtonLoadingColors = (
  palette: ZeitUIThemesPalette,
  props: ButtonProps,
): ButtonColorGroup => {
  const { variant, color } = props
  const category = {
    solid: {
      default: {
        bg: palette.cNeutral5,
        border: palette.cNeutral5,
        color: palette.cNeutral7,
      },
      primary: {
        bg: palette.cTheme7,
        border: palette.cTheme7,
        color: palette.cNeutral8,
      },
      secondary: {
        bg: palette.cNeutral7,
        border: palette.cNeutral7,
        color: palette.cNeutral8,
      },
      success: {
        bg: palette.success,
        border: palette.success,
        color: palette.cNeutral8,
      },
      warning: {
        bg: palette.warning,
        border: palette.warning,
        color: palette.cNeutral8,
      },
      error: {
        bg: palette.error,
        border: palette.error,
        color: palette.cNeutral8,
      },
    },
    lined: {
      default: {
        bg: palette.cNeutral8,
        border: palette.cNeutral5,
        color: palette.cNeutral6,
      },
      primary: {
        bg: palette.cNeutral8,
        border: palette.cTheme7,
        color: palette.cTheme7,
      },
      secondary: {
        bg: palette.cNeutral8,
        border: palette.cNeutral7,
        color: palette.cNeutral7,
      },
      success: {
        bg: palette.cNeutral8,
        border: palette.success,
        color: palette.success,
      },
      warning: {
        bg: palette.cNeutral8,
        border: palette.warning,
        color: palette.warning,
      },
      error: {
        bg: palette.cNeutral8,
        border: palette.error,
        color: palette.error,
      },
    },
    text: {
      primary: {
        bg: addColorAlpha(palette.cTheme5, 0.12),
        border: 'transparent',
        color: palette.cTheme7,
      },
      default: {
        bg: palette.cNeutral2,
        border: 'transparent',
        color: palette.cNeutral6,
      },
      secondary: {
        bg: addColorAlpha(palette.cTheme3, 0.24),
        border: 'transparent',
        color: palette.cTheme4,
      },
      success: {
        bg: addColorAlpha(palette.success, 0.24),
        border: 'transparent',
        color: palette.success,
      },
      warning: {
        bg: addColorAlpha(palette.warning, 0.24),
        border: 'transparent',
        color: palette.warning,
      },
      error: {
        bg: addColorAlpha(palette.error, 0.24),
        border: 'transparent',
        color: palette.error,
      },
    },
  }
  const colors: { [key in ButtonTypes]?: ButtonColorGroup } = category[variant]
  const defaultColor = colors.default as ButtonColorGroup
  return colors[color] || defaultColor
}

export const getButtonDisabledColors = (
  palette: ZeitUIThemesPalette,
  props: ButtonProps,
): ButtonColorGroup => {
  const { variant } = props
  const category = {
    solid: {
      bg: palette.cNeutral3,
      border: palette.cNeutral3,
      color: palette.cNeutral5,
    },
    lined: {
      bg: palette.cNeutral8,
      border: palette.cNeutral3,
      color: palette.cNeutral5,
    },
    text: {
      bg: 'transparent',
      border: 'transparent',
      color: palette.cNeutral5,
    },
  }
  return category[variant]
}

export const getButtonGhostColors = (
  palette: ZeitUIThemesPalette,
  color: ButtonTypes,
): ButtonColorGroup | null => {
  const colors: { [key in ButtonTypes]?: ButtonColorGroup } = {
    secondary: {
      bg: palette.cWhite0,
      border: palette.cBlack0,
      color: palette.cBlack0,
    },
    success: {
      bg: palette.cWhite0,
      border: palette.success,
      color: palette.success,
    },
    warning: {
      bg: palette.cWhite0,
      border: palette.warning,
      color: palette.warning,
    },
    error: {
      bg: palette.cWhite0,
      border: palette.error,
      color: palette.error,
    },
  }

  return colors[color] || null
}

export const getButtonGhostHoverColors = (
  palette: ZeitUIThemesPalette,
  color: ButtonTypes,
): ButtonColorGroup | null => {
  const colors: { [key in ButtonTypes]?: ButtonColorGroup } = {
    secondary: {
      bg: palette.cBlack0,
      border: palette.cWhite0,
      color: palette.cWhite0,
    },
    success: {
      bg: palette.success,
      border: palette.cWhite0,
      color: 'white',
    },
    warning: {
      bg: palette.warning,
      border: palette.cWhite0,
      color: 'white',
    },
    error: {
      bg: palette.error,
      border: palette.cWhite0,
      color: 'white',
    },
  }
  const withoutLightType = color.replace('-light', '') as ButtonTypes
  return colors[withoutLightType] || null
}

export interface ButtonCursorGroup {
  cursor: string
  events: string
}

export const getButtonCursor = (disabled: boolean, loading: boolean): ButtonCursorGroup => {
  if (disabled)
    return {
      cursor: 'not-allowed',
      events: 'auto',
    }
  if (loading)
    return {
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
    height: '2.8571rem',
    width: 'auto',
    padding: '1.375rem',
    fontSize: '1rem',
    minWidth: '10rem',
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
      padding: '1.375rem',
      fontSize: '.75rem',
      minWidth: '5.25rem',
    },
    small: {
      height: '2.2857rem',
      width: 'initial',
      padding: '1.25rem',
      fontSize: '0.8571rem',
      minWidth: '7.7143rem',
    },
    medium: defaultLayout,
    large: {
      height: '3.4286rem',
      width: 'initial',
      padding: '1.875rem',
      fontSize: '1.1429rem',
      minWidth: '11.1429rem',
    },
  }

  if (auto)
    return {
      ...(layouts[size] || defaultLayout),
      padding: autoPaddings[size] || autoPaddings.medium,
      minWidth: 'min-content',
      width: 'auto',
    }

  return layouts[size] || defaultLayout
}

export const getButtonDripColor = (palette: ZeitUIThemesPalette, props: ButtonProps) => {
  const { color } = props
  const isLightHover = color.endsWith('light')
  const hoverColors = getButtonHoverColors(palette, props)
  return isLightHover ? addColorAlpha(hoverColors.bg, 0.65) : addColorAlpha(palette.accents_2, 0.65)
}
