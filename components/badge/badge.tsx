import React, { useMemo } from 'react'
import useTheme from '../styles/use-theme'
import { NormalSizes, NormalTypes } from '../utils/prop-types'
import { ZeitUIThemesPalette } from 'components/styles/themes'
import BadgeAnchor from './badge-anchor'

interface Props {
  type?: NormalTypes
  size?: NormalSizes
  dot?: boolean
  className?: string
}

const defaultProps = {
  type: 'default' as NormalTypes,
  size: 'medium' as NormalSizes,
  dot: false,
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type BadgeProps = Props & typeof defaultProps & NativeAttrs

const getFontSize = (size: NormalSizes) => {
  const sizes: { [key in NormalSizes]: string } = {
    mini: '.7rem',
    small: '.75rem',
    medium: '.875rem',
    large: '1rem',
  }
  return sizes[size]
}

const getBgColor = (type: NormalTypes, palette: ZeitUIThemesPalette) => {
  const colors: { [key in NormalTypes]: string } = {
    default: palette.foreground,
    success: palette.success,
    warning: palette.warning,
    error: palette.error,
    secondary: palette.secondary,
  }
  return colors[type]
}

const Badge: React.FC<React.PropsWithChildren<BadgeProps>> = ({
  type,
  size,
  className,
  children,
  dot,
  ...props
}) => {
  const theme = useTheme()
  const bg = useMemo(() => getBgColor(type, theme.palette), [type, theme.palette])
  const font = useMemo(() => getFontSize(size), [size])
  const color = useMemo(() => {
    if (!type || type === 'default') return theme.palette.background
    return 'white'
  }, [type, theme.palette.background])

  return (
    <span className={`${dot ? 'dot' : ''} ${className}`} {...props}>
      {!dot && children}
      <style jsx>{`
        span {
          display: inline-block;
          padding: 4px 7px;
          border-radius: 16px;
          font-variant: tabular-nums;
          line-height: 1;
          vertical-align: middle;
          background-color: ${bg};
          color: ${color};
          font-size: ${font};
          border: 0;
        }

        .dot {
          padding: 4px;
          border-radius: 50%;
        }
      `}</style>
    </span>
  )
}

type MemoBadgeComponent<P = {}> = React.NamedExoticComponent<P> & {
  Anchor: typeof BadgeAnchor
}
type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  NativeAttrs

Badge.defaultProps = defaultProps

export default React.memo(Badge) as MemoBadgeComponent<ComponentProps>
