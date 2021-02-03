import React from 'react'
import withDefaults from '../utils/with-defaults'
import useTheme from '../use-theme'
import { useProportions } from '../utils/calculations'
import { GeistUIThemesPalette } from 'components/themes/presets'
import { NormalTypes } from 'components/utils/prop-types'

export type ProgressColors = {
  [key: number]: string
}

interface Props {
  value?: number
  max?: number
  fixedTop?: boolean
  fixedBottom?: boolean
  colors?: ProgressColors
  type?: NormalTypes
  className?: ''
}

const defaultProps = {
  value: 0,
  max: 100,
  type: 'default' as NormalTypes,
  fixedTop: false,
  fixedBottom: false,
  className: '',
}

type NativeAttrs = Omit<React.ProgressHTMLAttributes<any>, keyof Props>
export type ProgressProps = Props & typeof defaultProps & NativeAttrs

const getCurrentColor = (
  ratio: number,
  palette: GeistUIThemesPalette,
  type: NormalTypes,
  colors: ProgressColors = {},
): string => {
  const defaultColors: { [key in NormalTypes]: string } = {
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

const Progress: React.FC<ProgressProps> = ({
  value,
  max,
  className,
  type,
  colors,
  fixedTop,
  fixedBottom,
  ...props
}) => {
  const theme = useTheme()
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
          width: 100%;
          height: 0.625rem;
          background-color: ${theme.palette.accents_2};
          border-radius: ${theme.layout.radius};
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

export default withDefaults(Progress, defaultProps)
