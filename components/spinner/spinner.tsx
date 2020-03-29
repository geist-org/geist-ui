import React, { useMemo } from 'react'
import withDefaults from '../utils/with-defaults'
import useTheme from '../styles/use-theme'
import { NormalSizes } from '../utils/prop-types'
import { ZeitUIThemes } from '../styles/themes'

interface Props {
  size?: NormalSizes
  className?: string
}

const defaultProps = {
  size: 'medium' as NormalSizes,
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type SpinnerProps = Props & typeof defaultProps & NativeAttrs

const getSpans = (theme: ZeitUIThemes) => {
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
          animation-delay: -.9s;
          transform: rotate(90deg) translate(146%);
        }
      
        span:nth-child(5) {
          animation-delay: -.8s;
          transform: rotate(120deg) translate(146%);
        }
      
        span:nth-child(6) {
          animation-delay: -.7s;
          transform: rotate(150deg) translate(146%);
        }
      
        span:nth-child(7) {
          animation-delay: -.6s;
          transform: rotate(180deg) translate(146%);
        }
      
        span:nth-child(8) {
          animation-delay: -.5s;
          transform: rotate(210deg) translate(146%);
        }
      
        span:nth-child(9) {
          animation-delay: -.4s;
          transform: rotate(240deg) translate(146%);
        }
      
        span:nth-child(10) {
          animation-delay: -.3s;
          transform: rotate(270deg) translate(146%);
        }
      
        span:nth-child(11) {
          animation-delay: -.2s;
          transform: rotate(300deg) translate(146%);
        }
      
        span:nth-child(12) {
          animation-delay: -.1s;
          transform: rotate(330deg) translate(146%);
        }
        
       @keyframes spinner {
          0% {
            opacity: 1;
          }
          100% {
            opacity: .15;
          }
        }
      `}</style>
    </span>
  ))
}

const getWidth = (size: NormalSizes) => {
  const widths: { [key in NormalSizes]: string } = {
    mini: '.75rem',
    small: '1rem',
    medium: '1.25rem',
    large: '1.875rem',
  }
  
  return widths[size]
}

const Spinner: React.FC<SpinnerProps> = React.memo(({
  size, className, ...props
}) => {
  const theme = useTheme()
  const width = useMemo(() => getWidth(size), [size])

  return (
    <div className={`spinner ${className}`} {...props}>
      <div className="container">
        {getSpans(theme)}
      </div>
      
      <style jsx>{`
        .spinner {
          display: block;
          width: ${width};
          height: ${width};
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
})

export default withDefaults(Spinner, defaultProps)
