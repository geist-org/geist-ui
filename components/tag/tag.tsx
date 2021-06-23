import React, { useMemo } from 'react'
import useTheme from '../use-theme'
import { SnippetTypes } from '../utils/prop-types'
import { GeistUIThemesPalette } from '../themes/presets'
import useScaleable, { withScaleable } from '../use-scaleable'

export type TagTypes = SnippetTypes
interface Props {
  type?: TagTypes
  invert?: boolean
  className?: string
}

const defaultProps = {
  type: 'default' as TagTypes,
  invert: false,
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type TagProps = Props & NativeAttrs

export type TagColors = {
  color: string
  bgColor: string
  borderColor: string
}

const getColors = (type: TagTypes, palette: GeistUIThemesPalette, invert: boolean) => {
  const colors: {
    [key in TagTypes]: Pick<TagColors, 'color'> & Partial<TagColors>
  } = {
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
  const hideBorder = invert || type === 'lite'

  const cardStyle = {
    ...colors[type],
    bgColor: colors[type].bgColor || palette.background,
    borderColor: hideBorder ? 'transparent' : colors[type].color,
  }

  return !invert
    ? cardStyle
    : {
        ...cardStyle,
        color: cardStyle.bgColor,
        bgColor: cardStyle.color,
      }
}

const TagComponent: React.FC<React.PropsWithChildren<TagProps>> = ({
  type,
  children,
  className,
  invert,
  ...props
}: React.PropsWithChildren<TagProps> & typeof defaultProps) => {
  const theme = useTheme()
  const { SCALES } = useScaleable()
  const { color, bgColor, borderColor } = useMemo(
    () => getColors(type, theme.palette, invert),
    [type, theme.palette, invert],
  )

  return (
    <span className={className} {...props}>
      {children}
      <style jsx>{`
        span {
          display: inline-block;
          border: 1px solid ${borderColor};
          background-color: ${bgColor};
          color: ${color};
          box-sizing: border-box;
          line-height: 1em;
          border-radius: ${SCALES.height(0.3125)};
          font-size: ${SCALES.font(0.875)};
          width: ${SCALES.width(1, 'auto')};
          height: ${SCALES.height(1.75)};
          padding: ${SCALES.pt(0.375)} ${SCALES.pr(0.375)} ${SCALES.pb(0.375)}
            ${SCALES.pl(0.375)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }
      `}</style>
    </span>
  )
}

TagComponent.defaultProps = defaultProps
TagComponent.displayName = 'GeistTag'
const Tag = withScaleable(TagComponent)
export default Tag
