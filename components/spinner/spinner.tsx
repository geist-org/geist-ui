import React from 'react'
import useTheme from '../use-theme'
import { GeistUIThemes } from '../themes/presets'
import useScaleable, { withScaleable } from '../use-scaleable'

interface Props {
  className?: string
}

const defaultProps = {
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type SpinnerProps = Props & NativeAttrs

const getSpans = (theme: GeistUIThemes) => {
  return [...new Array(12)].map((_, index) => (
    <span key={`spinner-${index}`}>
      <style jsx>{`
        span {
          background-color: ${theme.palette.foreground};
          position: absolute;
          top: -3.9%;
          width: 24%;
          height: 8%;
          left: -10%;
          border-radius: ${theme.layout.radius};
          animation: spinner 1.2s linear 0s infinite normal none running;
        }

        span:nth-child(1) {
          animation-delay: -1.2s;
          transform: rotate(0deg) translate(146%);
        }

        span:nth-child(2) {
          animation-delay: -1.1s;
          transform: rotate(30deg) translate(146%);
        }

        span:nth-child(3) {
          animation-delay: -1s;
          transform: rotate(60deg) translate(146%);
        }

        span:nth-child(4) {
          animation-delay: -0.9s;
          transform: rotate(90deg) translate(146%);
        }

        span:nth-child(5) {
          animation-delay: -0.8s;
          transform: rotate(120deg) translate(146%);
        }

        span:nth-child(6) {
          animation-delay: -0.7s;
          transform: rotate(150deg) translate(146%);
        }

        span:nth-child(7) {
          animation-delay: -0.6s;
          transform: rotate(180deg) translate(146%);
        }

        span:nth-child(8) {
          animation-delay: -0.5s;
          transform: rotate(210deg) translate(146%);
        }

        span:nth-child(9) {
          animation-delay: -0.4s;
          transform: rotate(240deg) translate(146%);
        }

        span:nth-child(10) {
          animation-delay: -0.3s;
          transform: rotate(270deg) translate(146%);
        }

        span:nth-child(11) {
          animation-delay: -0.2s;
          transform: rotate(300deg) translate(146%);
        }

        span:nth-child(12) {
          animation-delay: -0.1s;
          transform: rotate(330deg) translate(146%);
        }

        @keyframes spinner {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0.15;
          }
        }
      `}</style>
    </span>
  ))
}

const SpinnerComponent: React.FC<SpinnerProps> = ({
  className,
  ...props
}: SpinnerProps & typeof defaultProps) => {
  const theme = useTheme()
  const { SCALES } = useScaleable()

  return (
    <div className={`spinner ${className}`} {...props}>
      <div className="container">{getSpans(theme)}</div>

      <style jsx>{`
        .spinner {
          display: block;
          box-sizing: border-box;
          width: ${SCALES.width(1.25)};
          height: ${SCALES.height(1.25)};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }

        .container {
          width: 100%;
          height: 100%;
          position: relative;
          left: 50%;
          top: 50%;
        }
      `}</style>
    </div>
  )
}

SpinnerComponent.defaultProps = defaultProps
SpinnerComponent.displayName = 'GeistSpinner'
const Spinner = withScaleable(SpinnerComponent)
export default Spinner
