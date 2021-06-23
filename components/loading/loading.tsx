import React, { useMemo } from 'react'
import useTheme from '../use-theme'
import { NormalTypes } from '../utils/prop-types'
import { GeistUIThemesPalette } from '../themes/presets'
import useScaleable, { withScaleable } from '../use-scaleable'

export type LoadingTypes = NormalTypes
interface Props {
  type?: LoadingTypes
  color?: string
  className?: string
  spaceRatio?: number
}

const defaultProps = {
  type: 'default' as LoadingTypes,
  className: '',
  spaceRatio: 1,
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type LoadingProps = Props & NativeAttrs

const getIconBgColor = (
  type: LoadingTypes,
  palette: GeistUIThemesPalette,
  color?: string,
) => {
  const colors: { [key in LoadingTypes]: string } = {
    default: palette.accents_6,
    secondary: palette.secondary,
    success: palette.success,
    warning: palette.warning,
    error: palette.error,
  }

  return color ? color : colors[type]
}

const LoadingComponent: React.FC<React.PropsWithChildren<LoadingProps>> = ({
  children,
  type,
  color,
  className,
  spaceRatio,
  ...props
}: React.PropsWithChildren<LoadingProps> & typeof defaultProps) => {
  const theme = useTheme()
  const { SCALES } = useScaleable()
  const bgColor = useMemo(
    () => getIconBgColor(type, theme.palette, color),
    [type, theme.palette, color],
  )

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
          font-size: ${SCALES.font(1)};
          width: ${SCALES.width(1, '100%')};
          height: ${SCALES.height(1, '100%')};
          min-height: 1em;
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }

        label {
          margin-right: 0.5em;
          color: ${theme.palette.accents_5};
          line-height: 1;
        }

        label :global(*) {
          margin: 0;
        }

        .loading {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          transform: translate(-50%, -50%);
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: transparent;
          user-select: none;
        }

        i {
          width: 0.25em;
          height: 0.25em;
          border-radius: 50%;
          background-color: ${bgColor};
          margin: 0 calc(0.25em / 2 * ${spaceRatio});
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

LoadingComponent.defaultProps = defaultProps
LoadingComponent.displayName = 'GeistLoading'
const Loading = withScaleable(LoadingComponent)
export default Loading
