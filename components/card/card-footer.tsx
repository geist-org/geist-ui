import React from 'react'
import useTheme from '../use-theme'
import useScaleable, { withScaleable } from '../use-scaleable'

interface Props {
  disableAutoMargin?: boolean
  className?: string
}

const defaultProps = {
  disableAutoMargin: false,
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type CardFooterProps = Props & NativeAttrs

const CardFooterComponent: React.FC<React.PropsWithChildren<CardFooterProps>> = ({
  children,
  className,
  disableAutoMargin,
  ...props
}: CardFooterProps & typeof defaultProps) => {
  const theme = useTheme()
  const { SCALES } = useScaleable()

  return (
    <footer
      className={`${disableAutoMargin ? '' : 'auto-margin'} ${className}`}
      {...props}>
      {children}
      <style jsx>{`
        footer {
          padding: ${SCALES.py(0.66)} ${SCALES.px(1.31)};
          display: flex;
          align-items: center;
          overflow: hidden;
          color: inherit;
          background-color: inherit;
          font-size: ${SCALES.font(0.875)};
          border-top: 1px solid ${theme.palette.border};
          border-bottom-left-radius: ${theme.layout.radius};
          border-bottom-right-radius: ${theme.layout.radius};
          min-height: ${SCALES.height(3.3)};
          width: ${SCALES.width(1, 'auto')};
          height: ${SCALES.height(1, 'auto')};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }

        .auto-margin :global(*) {
          margin-top: 0;
          margin-bottom: 0;
          margin-right: ${theme.layout.gapQuarter};
        }
      `}</style>
    </footer>
  )
}

CardFooterComponent.defaultProps = defaultProps
CardFooterComponent.displayName = 'GeistCardFooter'
const CardFooter = withScaleable(CardFooterComponent)
export default CardFooter
