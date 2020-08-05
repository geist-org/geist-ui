import React, { useMemo } from 'react'
import withDefaults from '../utils/with-defaults'
import useTheme from '../styles/use-theme'
import { SnippetColors } from '../utils/prop-types'
import { ZeitUIThemesPalette } from '../styles/themes'

interface Props {
  color?: SnippetColors
  invert?: boolean
  className?: string
}

const defaultProps = {
  color: 'default' as SnippetColors,
  invert: false,
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type TagProps = Props & typeof defaultProps & NativeAttrs

export type TagColors = {
  color: string
  bgColor: string
  borderColor: string
}

const getColors = (color: SnippetColors, palette: ZeitUIThemesPalette, invert: boolean) => {
  const colors: { [key in SnippetColors]: Pick<TagColors, 'color'> & Partial<TagColors> } = {
    default: {
      color: palette.foreground,
    },
    success: {
      color: palette.success,
    },
    warning: {
      color: palette.warning,
    },
    error: {
      color: palette.error,
    },
    secondary: {
      color: palette.secondary,
    },
    dark: {
      color: palette.foreground,
      bgColor: palette.background,
    },
    lite: {
      color: palette.foreground,
      bgColor: palette.accents_2,
    },
  }
  const hideBorder = invert || color === 'lite'

  const cardStyle = {
    ...colors[color],
    bgColor: colors[color].bgColor || palette.background,
    borderColor: hideBorder ? 'transparent' : colors[color].color,
  }

  return !invert
    ? cardStyle
    : {
        ...cardStyle,
        color: cardStyle.bgColor,
        bgColor: cardStyle.color,
      }
}

const Tag: React.FC<React.PropsWithChildren<TagProps>> = ({
  color: tagColor,
  children,
  className,
  invert,
  ...props
}) => {
  const theme = useTheme()
  const { color, bgColor, borderColor } = useMemo(
    () => getColors(tagColor, theme.palette, invert),
    [tagColor, theme.palette, invert],
  )

  return (
    <span className={className} {...props}>
      {children}
      <style jsx>{`
        span {
          display: inline-block;
          line-height: 0.875rem;
          font-size: 0.875rem;
          height: 1.75rem;
          border-radius: ${theme.expressiveness.R2};
          border: 1px solid ${borderColor};
          background-color: ${bgColor};
          color: ${color};
          padding: 6px;
          box-sizing: border-box;
        }
      `}</style>
    </span>
  )
}

const MemoTag = React.memo(Tag)

export default withDefaults(MemoTag, defaultProps)
