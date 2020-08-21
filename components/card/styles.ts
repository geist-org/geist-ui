import { CardColors, CardVariants } from '../utils/prop-types'
import { ZeitUIThemesPalette } from '../styles/themes'

export type CardStyles = {
  color: string
  bgColor: string
  hoverBgColor: string
  borderColor: string
  hoverBorderColor: string
}

export type SolidCardStyles = {
  color: string
  bgColor: string
  hoverBgColor: string
}

export type LineCardStyles = {
  color: string
  borderColor: string
  hoverBorderColor: string
}

export const getStyles = (
  color: CardColors,
  palette: ZeitUIThemesPalette,
  variant: CardVariants,
  hoverable: boolean,
): CardStyles => {
  const customColor = color
  const solidColors: { [key in CardColors]: SolidCardStyles } = {
    default: {
      color: palette.cNeutral7,
      bgColor: palette.cNeutral8,
      hoverBgColor: palette.cNeutral0,
    },
    primary: {
      color: palette.cNeutral7,
      bgColor: palette.cTheme0,
      hoverBgColor: palette.cTheme1,
    },
    success: {
      color: palette.cNeutral7,
      bgColor: palette.successLight,
      hoverBgColor: palette.success,
    },
    warning: {
      color: palette.cNeutral7,
      bgColor: palette.warningLight,
      hoverBgColor: palette.warning,
    },
    error: {
      color: palette.cNeutral7,
      bgColor: palette.errorLight,
      hoverBgColor: palette.error,
    },
  }

  const lineColors: { [key in CardColors]: LineCardStyles } = {
    default: {
      color: palette.cNeutral7,
      borderColor: palette.cNeutral3,
      hoverBorderColor: palette.cNeutral4,
    },
    primary: {
      color: palette.cNeutral7,
      borderColor: palette.cTheme0,
      hoverBorderColor: palette.cTheme5,
    },
    success: {
      color: palette.cNeutral7,
      borderColor: palette.successLight,
      hoverBorderColor: palette.success,
    },
    warning: {
      color: palette.cNeutral7,
      borderColor: palette.warningLight,
      hoverBorderColor: palette.warning,
    },
    error: {
      color: palette.cNeutral7,
      borderColor: palette.errorLight,
      hoverBorderColor: palette.error,
    },
  }

  if (variant === 'solid') {
    return {
      ...solidColors[customColor],
      hoverBgColor: hoverable
        ? solidColors[customColor].hoverBgColor
        : solidColors[customColor].bgColor,
      borderColor: 'transparent',
      hoverBorderColor: 'transparent',
    }
  } else {
    return {
      ...lineColors[customColor],
      hoverBorderColor: hoverable
        ? lineColors[customColor].hoverBorderColor
        : lineColors[customColor].borderColor,
      bgColor: palette.cNeutral8,
      hoverBgColor: palette.cNeutral8,
    }
  }
}
