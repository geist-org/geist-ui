import React, { useMemo } from 'react'
import useTheme from '../use-theme'
import withDefaults from '../utils/with-defaults'
import { NormalSizes, NormalTypes } from 'components/utils/prop-types'
import { GeistUIThemesPalette } from 'components/themes/presets'

type LoadingSizes = NormalSizes | string

interface Props {
  size?: LoadingSizes
  type?: NormalTypes
  color?: string
  className?: string
  spaceRatio?: number
}

const defaultProps = {
  size: 'medium' as LoadingSizes,
  type: 'default' as NormalTypes,
  className: '',
  spaceRatio: 1,
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type LoadingProps = Props & typeof defaultProps & NativeAttrs

const getIconSize = (size: LoadingSizes) => {
  const sizes: { [key in LoadingSizes]: string } = {
    mini: '2px',
    small: '3px',
    medium: '4px',
    large: '5px',
  }
  return sizes[size] || size
}

const getIconBgColor = (
  type: NormalTypes,
  palette: GeistUIThemesPalette,
  color?: string,
) => {
  const colors: { [key in NormalTypes]: string } = {
    default: palette.accents_6,
    secondary: palette.secondary,
    success: palette.success,
    warning: palette.warning,
    error: palette.error,
  }

  return color ? color : colors[type]
}

const Loading: React.FC<React.PropsWithChildren<LoadingProps>> = ({
  children,
  size,
  type,
  color,
  className,
  spaceRatio,
  ...props
}) => {
  const theme = useTheme()
  const width = useMemo(() => getIconSize(size), [size])
  const bgColor = useMemo(() => getIconBgColor(type, theme.palette, color), [
    type,
    theme.palette,
    color,
  ])

  return (
    <div className={`loading-container ${className}`} {...props}>
      <span className="loading">
        {children && <label>{children}</label>}
        <i />
        <i />
        <i />
      </span>
      <style jsx>{`
        .loading-container {
          display: inline-flex;
          align-items: center;
          position: relative;
          width: 100%;
          height: 100%;
        }

        label {
          margin-right: ${theme.layout.gapHalf};
          color: ${theme.palette.accents_5};
        }

        label :global(*) {
          margin: 0;
        }

        .loading {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: transparent;
          user-select: none;
        }

        i {
          width: ${width};
          height: ${width};
          border-radius: 50%;
          background-color: ${bgColor};
          margin: 0 calc(${width} / 2 * ${spaceRatio});
          display: inline-block;
          animation: loading-blink 1.4s infinite both;
        }

        i:nth-child(2) {
          animation-delay: 0.2s;
        }

        i:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes loading-blink {
          0% {
            opacity: 0.2;
          }

          20% {
            opacity: 1;
          }

          100% {
            opacity: 0.2;
          }
        }
      `}</style>
    </div>
  )
}

const MemoLoading = React.memo(Loading)

export default withDefaults(MemoLoading, defaultProps)
