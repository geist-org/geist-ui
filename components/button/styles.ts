import { ZeitUIThemesPalette } from '../styles/themes'
import { addColorAlpha } from '../utils/color'
import { NormalSizes, ButtonTypes } from '../utils/prop-types'
import { ButtonProps } from './button'

export interface ButtonColorGroup {
  bg: string
  border: string
  color: string
}

export interface ButtonStatusGroup {
  default: ButtonColorGroup
  hover: ButtonColorGroup
  active: ButtonColorGroup
}

export const getButtonColors = (
  palette: ZeitUIThemesPalette,
  props: ButtonProps,
): ButtonStatusGroup => {
  const { variant, color, disabled } = props
  const disabledCategory = {
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
  const category = {
    solid: {
      default: {
        default: {
          bg: palette.cNeutral0,
          border: palette.cNeutral0,
          color: palette.cNeutral7,
        },
        hover: {
          bg: palette.cNeutral2,
          border: palette.cNeutral2,
          color: palette.cNeutral7,
        },
        active: {
          bg: palette.cNeutral5,
          border: palette.cNeutral5,
          color: palette.cNeutral7,
        },
      },
      primary: {
        default: {
          bg: palette.cTheme5,
          border: palette.cTheme5,
          color: palette.cNeutral8,
        },
        hover: {
          bg: palette.cTheme6,
          border: palette.cTheme6,
          color: palette.cNeutral8,
        },
        active: {
          bg: palette.cTheme7,
          border: palette.cTheme7,
          color: palette.cNeutral8,
        },
      },
      secondary: {
        default: {
          bg: palette.cNeutral7,
          border: palette.cNeutral7,
          color: palette.cNeutral8,
        },
        hover: {
          bg: palette.cNeutral7,
          border: palette.cNeutral7,
          color: palette.cNeutral8,
        },
        active: {
          bg: palette.cNeutral7,
          border: palette.cNeutral7,
          color: palette.cNeutral8,
        },
      },
      success: {
        default: {
          bg: palette.success,
          border: palette.success,
          color: palette.cNeutral8,
        },
        hover: {
          bg: palette.success,
          border: palette.success,
          color: palette.cNeutral8,
        },
        active: {
          bg: palette.success,
          border: palette.success,
          color: palette.cNeutral8,
        },
      },
      warning: {
        default: {
          bg: palette.warning,
          border: palette.warning,
          color: palette.cNeutral8,
        },
        hover: {
          bg: palette.warning,
          border: palette.warning,
          color: palette.cNeutral8,
        },
        active: {
          bg: palette.warning,
          border: palette.warning,
          color: palette.cNeutral8,
        },
      },
      error: {
        default: {
          bg: palette.error,
          border: palette.error,
          color: palette.cNeutral8,
        },
        hover: {
          bg: palette.error,
          border: palette.error,
          color: palette.cNeutral8,
        },
        active: {
          bg: palette.error,
          border: palette.error,
          color: palette.cNeutral8,
        },
      },
      disabled: {
        default: disabledCategory.solid,
        hover: disabledCategory.solid,
        active: disabledCategory.solid,
      },
    },
    lined: {
      default: {
        default: {
          bg: palette.cNeutral8,
          border: palette.cNeutral2,
          color: palette.cNeutral6,
        },
        hover: {
          bg: palette.cNeutral8,
          border: palette.cNeutral4,
          color: palette.cNeutral6,
        },
        active: {
          bg: palette.cNeutral8,
          border: palette.cNeutral5,
          color: palette.cNeutral6,
        },
      },
      primary: {
        default: {
          bg: palette.cNeutral8,
          border: palette.cTheme5,
          color: palette.cTheme5,
        },
        hover: {
          bg: palette.cNeutral8,
          border: palette.cTheme6,
          color: palette.cTheme6,
        },
        active: {
          bg: palette.cNeutral8,
          border: palette.cTheme7,
          color: palette.cTheme7,
        },
      },
      secondary: {
        default: {
          bg: palette.cNeutral8,
          border: palette.cNeutral7,
          color: palette.cNeutral7,
        },
        hover: {
          bg: palette.cNeutral8,
          border: palette.cNeutral7,
          color: palette.cNeutral7,
        },
        active: {
          bg: palette.cNeutral8,
          border: palette.cNeutral7,
          color: palette.cNeutral7,
        },
      },
      success: {
        default: {
          bg: palette.cNeutral8,
          border: palette.success,
          color: palette.success,
        },
        hover: {
          bg: palette.cNeutral8,
          border: palette.success,
          color: palette.success,
        },
        active: {
          bg: palette.cNeutral8,
          border: palette.success,
          color: palette.success,
        },
      },
      warning: {
        default: {
          bg: palette.cNeutral8,
          border: palette.warning,
          color: palette.warning,
        },
        hover: {
          bg: palette.cNeutral8,
          border: palette.warning,
          color: palette.warning,
        },
        active: {
          bg: palette.cNeutral8,
          border: palette.warning,
          color: palette.warning,
        },
      },
      error: {
        default: {
          bg: palette.cNeutral8,
          border: palette.error,
          color: palette.error,
        },
        hover: {
          bg: palette.cNeutral8,
          border: palette.error,
          color: palette.error,
        },
        active: {
          bg: palette.cNeutral8,
          border: palette.error,
          color: palette.error,
        },
      },
      disabled: {
        default: disabledCategory.lined,
        hover: disabledCategory.lined,
        active: disabledCategory.lined,
      },
    },
    text: {
      default: {
        default: {
          bg: 'transparent',
          border: 'transparent',
          color: palette.cNeutral6,
        },
        hover: {
          bg: palette.cNeutral0,
          border: 'transparent',
          color: palette.cNeutral6,
        },
        active: {
          bg: palette.cNeutral2,
          border: 'transparent',
          color: palette.cNeutral6,
        },
      },
      primary: {
        default: {
          bg: 'transparent',
          border: 'transparent',
          color: palette.cTheme5,
        },
        hover: {
          bg: addColorAlpha(palette.cTheme6, 0.04),
          border: 'transparent',
          color: palette.cTheme6,
        },
        active: {
          bg: addColorAlpha(palette.cTheme5, 0.12),
          border: 'transparent',
          color: palette.cTheme7,
        },
      },
      secondary: {
        default: {
          bg: 'transparent',
          border: 'transparent',
          color: palette.cTheme4,
        },
        hover: {
          bg: addColorAlpha(palette.cTheme3, 0.12),
          border: 'transparent',
          color: palette.cTheme4,
        },
        active: {
          bg: addColorAlpha(palette.cTheme3, 0.24),
          border: 'transparent',
          color: palette.cTheme4,
        },
      },
      success: {
        default: {
          bg: 'transparent',
          border: 'transparent',
          color: palette.success,
        },
        hover: {
          bg: addColorAlpha(palette.success, 0.12),
          border: 'transparent',
          color: palette.success,
        },
        active: {
          bg: addColorAlpha(palette.success, 0.24),
          border: 'transparent',
          color: palette.success,
        },
      },
      warning: {
        default: {
          bg: 'transparent',
          border: 'transparent',
          color: palette.warning,
        },
        hover: {
          bg: addColorAlpha(palette.warning, 0.12),
          border: 'transparent',
          color: palette.warning,
        },
        active: {
          bg: addColorAlpha(palette.warning, 0.24),
          border: 'transparent',
          color: palette.warning,
        },
      },
      error: {
        default: {
          bg: 'transparent',
          border: 'transparent',
          color: palette.error,
        },
        hover: {
          bg: addColorAlpha(palette.error, 0.12),
          border: 'transparent',
          color: palette.error,
        },
        active: {
          bg: addColorAlpha(palette.error, 0.24),
          border: 'transparent',
          color: palette.error,
        },
      },
      disabled: {
        default: disabledCategory.text,
        hover: disabledCategory.text,
        active: disabledCategory.text,
      },
    },
  }

  let result: ButtonStatusGroup
  try {
    result = category[variant][color]
    if (disabled) {
      result = category[variant].disabled
    }
    if (!result) {
      throw new Error('no match color')
    }
  } catch (e) {
    // if no match variant or color, return default button style
    result = category.lined.default
  }
  return result
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
  const hoverColors = getButtonColors(palette, props).hover
  return isLightHover ? addColorAlpha(hoverColors.bg, 0.65) : addColorAlpha(palette.accents_2, 0.65)
}
