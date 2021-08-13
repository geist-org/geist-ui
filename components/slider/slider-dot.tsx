import React from 'react'
import useTheme from '../use-theme'

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
export type SliderDotProps = Props & NativeAttrs

const SliderDot = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<SliderDotProps>
>(
  (
    {
      children,
      disabled,
      left,
      isClick,
    }: React.PropsWithChildren<SliderDotProps> & typeof defaultProps,
    ref: React.Ref<HTMLDivElement>,
  ) => {
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
            height: calc(var(--slider-font-size) * 1.25);
            min-width: calc(var(--slider-font-size) * 1.25);
            line-height: calc(var(--slider-font-size) * 1.25);
            border-radius: calc(var(--slider-font-size) * 0.625);
            user-select: none;
            font-weight: 700;
            font-size: calc(var(--slider-font-size) * 0.75);
            z-index: 100;
            background-color: ${theme.palette.success};
            color: ${theme.palette.background};
            text-align: center;
            padding: 0 calc(0.57 * var(--slider-font-size));
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
  },
)

SliderDot.defaultProps = defaultProps
SliderDot.displayName = 'GeistSliderDot'
export default SliderDot
