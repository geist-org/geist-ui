import React from 'react'
import useTheme from '../use-theme'
import { useProportions } from '../utils/calculations'
import { GeistUIThemesPalette } from '../themes/presets'
import { NormalTypes } from '../utils/prop-types'
import useScaleable, { withScaleable } from '../use-scaleable'

export type ProgressColors = {
  [key: number]: string
}
export type ProgressTypes = NormalTypes

interface Props {
  value?: number
  max?: number
  fixedTop?: boolean
  fixedBottom?: boolean
  colors?: ProgressColors
  type?: ProgressTypes
  className?: string
}

const defaultProps = {
  value: 0,
  max: 100,
  type: 'default' as ProgressTypes,
  fixedTop: false,
  fixedBottom: false,
  className: '',
}

type NativeAttrs = Omit<React.ProgressHTMLAttributes<any>, keyof Props>
export type ProgressProps = Props & NativeAttrs

const getCurrentColor = (
  ratio: number,
  palette: GeistUIThemesPalette,
  type: ProgressTypes,
  colors: ProgressColors = {},
): string => {
  const defaultColors: { [key in ProgressTypes]: string } = {
    default: palette.foreground,
    success: palette.success,
    secondary: palette.secondary,
    warning: palette.warning,
    error: palette.error,
  }
  const colorKeys = Object.keys(colors)
  if (colorKeys.length === 0) return defaultColors[type]

  const customColorKey = colorKeys.find(key => ratio <= +key)
  if (!customColorKey || Number.isNaN(+customColorKey)) return defaultColors[type]
  return colors[+customColorKey]
}

const ProgressComponent: React.FC<ProgressProps> = ({
  value,
  max,
  className,
  type,
  colors,
  fixedTop,
  fixedBottom,
  ...props
}: ProgressProps & typeof defaultProps) => {
  const theme = useTheme()
  const { SCALES } = useScaleable()
  const percentValue = useProportions(value, max)
  const currentColor = getCurrentColor(percentValue, theme.palette, type, colors)
  const fixed = fixedTop || fixedBottom

  return (
    <div className={`progress ${className} ${fixed ? 'fixed' : ''}`}>
      <div className="inner" title={`${percentValue}%`} />
      <progress className={className} value={value} max={max} {...props} />
      <style jsx>{`
        progress {
          position: fixed;
          top: -1000px;
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .progress {
          position: relative;
          background-color: ${theme.palette.accents_2};
          border-radius: ${theme.layout.radius};
          width: ${SCALES.width(1, '100%')};
          height: ${SCALES.height(0.625)};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }

        .fixed {
          position: fixed;
          top: ${fixedTop ? 0 : 'unset'};
          bottom: ${fixedBottom ? 0 : 'unset'};
          left: 0;
          border-radius: 0;
        }

        .fixed > .inner {
          border-radius: 0;
        }

        .inner {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          bottom: 0;
          transition: all 100ms ease-in;
          border-radius: ${theme.layout.radius};
          background-color: ${currentColor};
          width: ${percentValue}%;
        }
      `}</style>
    </div>
  )
}

ProgressComponent.defaultProps = defaultProps
ProgressComponent.displayName = 'GeistProgress'
const Progress = withScaleable(ProgressComponent)
export default Progress
