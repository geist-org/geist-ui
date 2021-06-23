import React, { useMemo } from 'react'
import useTheme from '../use-theme'
import { NormalTypes } from '../utils/prop-types'
import { GeistUIThemesPalette } from '../themes/presets'
import useScaleable from '../use-scaleable'

export interface Props {
  tag: keyof JSX.IntrinsicElements
  type?: NormalTypes
  className?: string
}

const defaultProps = {
  type: 'default' as NormalTypes,
  className: '',
}

const getTypeColor = (type: NormalTypes, palette: GeistUIThemesPalette) => {
  const colors: { [key in NormalTypes]: string } = {
    default: 'inherit',
    secondary: palette.secondary,
    success: palette.success,
    warning: palette.warning,
    error: palette.error,
  }

  return colors[type] || colors.default
}

type NativeAttrs = Omit<React.DetailsHTMLAttributes<any>, keyof Props>
export type TextChildProps = Props & NativeAttrs

const TextChild: React.FC<React.PropsWithChildren<TextChildProps>> = ({
  children,
  tag,
  className,
  type,
  ...props
}: React.PropsWithChildren<TextChildProps> & typeof defaultProps) => {
  const Component = tag
  const theme = useTheme()
  const { SCALES, getScaleableProps } = useScaleable()
  const font = getScaleableProps('font')
  const mx = getScaleableProps(['margin', 'marginLeft', 'marginRight', 'mx', 'ml', 'mr'])
  const my = getScaleableProps(['margin', 'marginTop', 'marginBottom', 'my', 'mt', 'mb'])
  const px = getScaleableProps([
    'padding',
    'paddingLeft',
    'paddingRight',
    'pl',
    'pr',
    'px',
  ])
  const py = getScaleableProps([
    'padding',
    'paddingTop',
    'paddingBottom',
    'pt',
    'pb',
    'py',
  ])
  const color = useMemo(() => getTypeColor(type, theme.palette), [type, theme.palette])
  const classNames = useMemo<string>(() => {
    const keys = [
      { value: mx, className: 'mx' },
      { value: my, className: 'my' },
      { value: px, className: 'px' },
      { value: py, className: 'py' },
      { value: font, className: 'font' },
    ]
    const scaleClassNames = keys.reduce((pre, next) => {
      if (typeof next.value === 'undefined') return pre
      return `${pre} ${next.className}`
    }, '')
    return `${scaleClassNames} ${className}`.trim()
  }, [mx, my, px, py, font, className])

  return (
    <Component className={classNames} {...props}>
      {children}
      <style jsx>{`
        ${tag} {
          color: ${color};
          width: ${SCALES.width(1, 'auto')};
          height: ${SCALES.height(1, 'auto')};
        }
        .font {
          font-size: ${SCALES.font(1, 'inherit')};
        }
        .mx {
          margin-left: ${SCALES.ml(0, 'revert')};
          margin-right: ${SCALES.mr(0, 'revert')};
        }
        .my {
          margin-top: ${SCALES.mt(0, 'revert')};
          margin-bottom: ${SCALES.mb(0, 'revert')};
        }
        .px {
          padding-left: ${SCALES.pl(0, 'revert')};
          padding-right: ${SCALES.pr(0, 'revert')};
        }
        .py {
          padding-top: ${SCALES.pt(0, 'revert')};
          padding-bottom: ${SCALES.pb(0, 'revert')};
        }
      `}</style>
    </Component>
  )
}

TextChild.defaultProps = defaultProps
TextChild.displayName = 'GeistTextChild'
export default TextChild
