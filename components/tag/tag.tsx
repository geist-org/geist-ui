import React, { useMemo } from 'react'
import withDefaults from '../utils/with-defaults'
import useTheme from '../styles/use-theme'
import { SnippetTypes } from '../utils/prop-types'
import { ZeitUIThemesPalette } from '../styles/themes'

interface Props {
  type?: SnippetTypes
  invert?: boolean
  className?: string
}

const defaultProps = {
  type: 'default' as SnippetTypes,
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

const getColors = (
  type: SnippetTypes,
  palette: ZeitUIThemesPalette,
  invert: boolean,
) => {
  const colors: { [key in SnippetTypes]: Pick<TagColors, 'color'> & Partial<TagColors> } = {
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
    }
  }
  const hideBorder = invert || type === 'lite'
  
  const cardStyle = {
    ...colors[type],
    bgColor: colors[type].bgColor || palette.background,
    borderColor: hideBorder ? 'transparent' : colors[type].color
  }
  
  return !invert ? cardStyle : {
    ...cardStyle,
    color: cardStyle.bgColor,
    bgColor: cardStyle.color,
  }
}

const Tag: React.FC<React.PropsWithChildren<TagProps>> = ({
  type, children, className, invert, ...props
}) => {
  const theme = useTheme()
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
          line-height: .875rem;
          font-size: .875rem;
          height: 1.75rem;
          border-radius: ${theme.layout.radius};
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
