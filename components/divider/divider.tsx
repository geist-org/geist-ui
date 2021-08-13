import React, { useMemo } from 'react'
import useTheme from '../use-theme'
import { DividerAlign, SnippetTypes } from '../utils/prop-types'
import { GeistUIThemesPalette } from '../themes/presets'
import useScaleable, { withScaleable } from '../use-scaleable'

export type DividerTypes = SnippetTypes

interface Props {
  type?: DividerTypes
  align?: DividerAlign
  className?: string
}

const defaultProps = {
  align: 'center' as DividerAlign,
  type: 'default' as DividerTypes,
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type DividerProps = Props & NativeAttrs

const getColor = (type: DividerTypes, palette: GeistUIThemesPalette) => {
  const colors: { [key in DividerTypes]: string } = {
    default: palette.border,
    lite: palette.accents_1,
    success: palette.successLight,
    warning: palette.warningLight,
    error: palette.errorLight,
    secondary: palette.secondary,
    dark: palette.foreground,
  }
  return colors[type]
}

const DividerComponent: React.FC<React.PropsWithChildren<DividerProps>> = ({
  type,
  align,
  children,
  className,
  ...props
}: React.PropsWithChildren<DividerProps> & typeof defaultProps) => {
  const theme = useTheme()
  const { SCALES } = useScaleable()
  const color = useMemo(() => getColor(type, theme.palette), [type, theme.palette])
  const alignClassName = useMemo(() => {
    if (!align || align === 'center') return ''
    if (align === 'left' || align === 'start') return 'start'
    return 'end'
  }, [align])
  const textColor = type === 'default' ? theme.palette.foreground : color

  return (
    <div role="separator" className={`divider ${className}`} {...props}>
      {children && <span className={`text ${alignClassName}`}>{children}</span>}
      <style jsx>{`
        .divider {
          max-width: 100%;
          background-color: ${color};
          position: relative;
          font-size: ${SCALES.font(1)};
          width: ${SCALES.width(1, 'auto')};
          height: ${SCALES.height(0.0625)};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(0.5)} ${SCALES.mr(0)} ${SCALES.mb(0.5)} ${SCALES.ml(0)};
        }

        .text {
          position: absolute;
          left: 50%;
          top: 50%;
          min-height: 100%;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          transform: translate(-50%, -50%);
          padding: 0 0.75em;
          font-size: inherit;
          font-weight: bold;
          text-transform: capitalize;
          background-color: ${theme.palette.background};
          color: ${textColor};
          z-index: 10;
        }

        .text.start {
          transform: translateY(-50%);
          left: 7%;
        }

        .text.end {
          transform: translateY(-50%);
          left: auto;
          right: 7%;
        }
      `}</style>
    </div>
  )
}

DividerComponent.defaultProps = defaultProps
DividerComponent.displayName = 'GeistDivider'
const Divider = withScaleable(DividerComponent)
export default Divider
