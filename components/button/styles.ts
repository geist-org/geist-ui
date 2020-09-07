import { CfxUIThemesPalette } from '../styles/themes'
import { addColorAlpha } from '../utils/color'
import { NormalSizes, TagSizes, ButtonColors } from '../utils/prop-types'
import { ButtonProps } from './button'

export interface ButtonOrTagColorGroup {
  bg: string
  border: string
  color: string
}

export interface ButtonOrTagStatusGroup {
  default: ButtonOrTagColorGroup
  hover: ButtonOrTagColorGroup
  active: ButtonOrTagColorGroup
}

export const getButtonColors = (
  palette: CfxUIThemesPalette,
  props: ButtonProps,
  isTag: boolean,
): ButtonOrTagStatusGroup => {
  const { variant, color, disabled } = props
  const disabledCategory = {
    solid: {
      bg: palette.cNeutral2,
      border: palette.cNeutral2,
      color: palette.cNeutral4,
    },
    line: {
      bg: palette.cNeutral2,
      border: palette.cNeutral3,
      color: palette.cNeutral4,
    },
    text: {
      bg: 'transparent',
      border: 'transparent',
      color: palette.cNeutral4,
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
          bg: palette.successDark,
          border: palette.successDark,
          color: palette.cNeutral8,
        },
        active: {
          bg: palette.successDark,
          border: palette.successDark,
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
          bg: palette.warningDark,
          border: palette.warningDark,
          color: palette.cNeutral8,
        },
        active: {
          bg: palette.warningDark,
          border: palette.warningDark,
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
          bg: palette.errorDark,
          border: palette.errorDark,
          color: palette.cNeutral8,
        },
        active: {
          bg: palette.errorDark,
          border: palette.errorDark,
          color: palette.cNeutral8,
        },
      },
      disabled: {
        default: disabledCategory.solid,
        hover: disabledCategory.solid,
        active: disabledCategory.solid,
      },
    },
    line: {
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
          border: palette.successDark,
          color: palette.successDark,
        },
        active: {
          bg: palette.cNeutral8,
          border: palette.successDark,
          color: palette.successDark,
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
          border: palette.warningDark,
          color: palette.warningDark,
        },
        active: {
          bg: palette.cNeutral8,
          border: palette.warningDark,
          color: palette.warningDark,
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
          border: palette.errorDark,
          color: palette.errorDark,
        },
        active: {
          bg: palette.cNeutral8,
          border: palette.errorDark,
          color: palette.errorDark,
        },
      },
      disabled: {
        default: disabledCategory.line,
        hover: disabledCategory.line,
        active: disabledCategory.line,
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
          bg: palette.cTheme0,
          border: 'transparent',
          color: palette.cTheme6,
        },
        active: {
          bg: palette.cTheme2,
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
          bg: palette.cTheme0,
          border: 'transparent',
          color: palette.cTheme4,
        },
        active: {
          bg: palette.cTheme1,
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
          bg: palette.successLight,
          border: 'transparent',
          color: palette.successDark,
        },
        active: {
          bg: palette.successLight,
          border: 'transparent',
          color: palette.successDark,
        },
      },
      warning: {
        default: {
          bg: 'transparent',
          border: 'transparent',
          color: palette.warning,
        },
        hover: {
          bg: palette.warningLight,
          border: 'transparent',
          color: palette.warningDark,
        },
        active: {
          bg: palette.warningLight,
          border: 'transparent',
          color: palette.warningDark,
        },
      },
      error: {
        default: {
          bg: 'transparent',
          border: 'transparent',
          color: palette.error,
        },
        hover: {
          bg: palette.errorLight,
          border: 'transparent',
          color: palette.errorDark,
        },
        active: {
          bg: palette.errorLight,
          border: 'transparent',
          color: palette.errorDark,
        },
      },
      disabled: {
        default: disabledCategory.text,
        hover: disabledCategory.text,
        active: disabledCategory.text,
      },
    },
  }
  const tagCategory = {
    solid: { ...category.solid },
    line: {
      ...category.line,
      default: {
        default: {
          bg: palette.cNeutral8,
          border: palette.cNeutral2,
          color: palette.cNeutral6,
        },
        hover: {
          bg: palette.cNeutral8,
          border: palette.cTheme5,
          color: palette.cTheme5,
        },
        active: {
          bg: palette.cNeutral8,
          border: palette.cTheme7,
          color: palette.cTheme7,
        },
      },
    },
    text: {
      ...category.text,
    },
  }

  let result: ButtonOrTagStatusGroup

  try {
    if (isTag) result = tagCategory[variant][color]
    else result = category[variant][color]
    if (disabled) {
      result = category[variant].disabled
    }
    if (!result) {
      throw new Error('no match color')
    }
  } catch (e) {
    // if no match variant or color, return default button style
    result = category.line.default
  }
  return result
}

export const getButtonGhostColors = (
  palette: CfxUIThemesPalette,
  color: ButtonColors,
): ButtonOrTagColorGroup | null => {
  const colors: { [key in ButtonColors]?: ButtonOrTagColorGroup } = {
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
  }

  return colors[color] || null
}

export const getButtonGhostHoverColors = (
  palette: CfxUIThemesPalette,
  color: ButtonColors,
): ButtonOrTagColorGroup | null => {
  const colors: { [key in ButtonColors]?: ButtonOrTagColorGroup } = {
    secondary: {
      bg: palette.cNeutral7,
      border: palette.cNeutral8,
      color: palette.cNeutral8,
    },
    success: {
      bg: palette.success,
      border: palette.cNeutral8,
      color: palette.cNeutral8,
    },
    warning: {
      bg: palette.warning,
      border: palette.cNeutral8,
      color: palette.cNeutral8,
    },
    error: {
      bg: palette.error,
      border: palette.cNeutral8,
      color: palette.cNeutral8,
    },
  }
  const withoutLightType = color.replace('-light', '') as ButtonColors
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
export type TagSizeGroup = ButtonSizeGroup

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

export const getTagSize = (size: TagSizes = 'medium'): TagSizeGroup => {
  const defaultLayout: TagSizeGroup = {
    height: '2.2857rem',
    width: 'auto',
    padding: '1.7143rem',
    fontSize: '1rem',
    minWidth: '2.2857rem',
  }
  const layouts: { [key in TagSizes]: TagSizeGroup } = {
    small: {
      height: '2rem',
      width: 'initial',
      padding: '1.1429rem',
      fontSize: '0.8571rem',
      minWidth: '3.7143rem',
    },
    medium: defaultLayout,
    large: {
      height: '2.8571rem',
      width: 'initial',
      padding: '1.7143rem',
      fontSize: '1rem',
      minWidth: '2.8571rem',
    },
  }

  return layouts[size] || defaultLayout
}

export const getButtonDripColor = (palette: CfxUIThemesPalette, props: ButtonProps) => {
  const { color } = props
  const isLightHover = color.endsWith('light')
  const hoverColors = getButtonColors(palette, props, false).hover
  return isLightHover ? addColorAlpha(hoverColors.bg, 0.65) : addColorAlpha(palette.accents_2, 0.65)
}
