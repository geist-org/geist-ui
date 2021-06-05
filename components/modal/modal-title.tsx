import React from 'react'
import useTheme from '../use-theme'
import useScaleable, { withScaleable } from '../use-scaleable'

interface Props {
  className?: string
}

const defaultProps = {
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type ModalTitleProps = Props & NativeAttrs

const ModalTitleComponent: React.FC<React.PropsWithChildren<ModalTitleProps>> = ({
  className,
  children,
  ...props
}: React.PropsWithChildren<ModalTitleProps> & typeof defaultProps) => {
  const theme = useTheme()
  const { SCALES } = useScaleable()

  return (
    <>
      <h2 className={className} {...props}>
        {children}
      </h2>
      <style jsx>{`
        h2 {
          line-height: 1.6;
          font-weight: normal;
          text-align: center;
          display: inline-flex;
          flex-shrink: 0;
          justify-content: center;
          align-items: center;
          word-break: break-word;
          text-transform: capitalize;
          font-size: ${SCALES.font(1.5)};
          color: ${theme.palette.foreground};
          width: ${SCALES.width(1, 'auto')};
          height: ${SCALES.height(1, 'auto')};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }
      `}</style>
    </>
  )
}

ModalTitleComponent.defaultProps = defaultProps
ModalTitleComponent.displayName = 'GeistModalTitle'
const ModalTitle = withScaleable(ModalTitleComponent)
export default ModalTitle
