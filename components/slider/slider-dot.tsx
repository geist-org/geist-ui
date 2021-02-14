import React from 'react'
import useTheme from '../use-theme'
import withDefaults from '../utils/with-defaults'

interface Props {
  left: number
  disabled?: boolean
  isClick?: boolean
}

const defaultProps = {
  left: 0,
  disabled: false,
  isClick: false,
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type SliderDotProps = Props & typeof defaultProps & NativeAttrs

const SliderDot = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<SliderDotProps>
>(({ children, disabled, left, isClick }, ref: React.Ref<HTMLDivElement>) => {
  const theme = useTheme()

  return (
    <div
      className={`dot ${disabled ? 'disabled' : ''} ${isClick ? 'click' : ''}`}
      ref={ref}>
      {children}
      <style jsx>{`
        .dot {
          position: absolute;
          left: ${left}%;
          top: 50%;
          transform: translate(-50%, -50%);
          height: 1.25rem;
          line-height: 1.25rem;
          border-radius: 0.625rem;
          user-select: none;
          font-weight: 700;
          font-size: 0.75rem;
          z-index: 100;
          background-color: ${theme.palette.success};
          color: ${theme.palette.background};
          text-align: center;
          padding: 0 calc(0.86 * ${theme.layout.gapHalf});
        }

        .dot.disabled {
          cursor: not-allowed !important;
          background-color: ${theme.palette.accents_2};
          color: ${theme.palette.accents_4};
        }

        .dot.click {
          transition: all 200ms ease;
        }

        .dot:hover {
          cursor: grab;
        }

        .dot:active {
          cursor: grabbing;
        }
      `}</style>
    </div>
  )
})

export default withDefaults(SliderDot, defaultProps)
