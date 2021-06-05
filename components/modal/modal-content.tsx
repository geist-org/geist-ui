import React from 'react'
import useScaleable, { withScaleable } from '../use-scaleable'

interface Props {
  className?: string
}

const defaultProps = {
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLElement>, keyof Props>
export type ModalContentProps = Props & NativeAttrs

const ModalContentComponent: React.FC<React.PropsWithChildren<ModalContentProps>> = ({
  className,
  children,
  ...props
}: React.PropsWithChildren<ModalContentProps> & typeof defaultProps) => {
  const { SCALES } = useScaleable()

  return (
    <>
      <div className={`content ${className}`} {...props}>
        {children}
      </div>
      <style jsx>{`
        .content {
          position: relative;
          text-align: left;
          font-size: ${SCALES.font(1)};
          width: ${SCALES.width(1, 'auto')};
          height: ${SCALES.height(1, 'auto')};
          padding: ${SCALES.pt(1.3125)} ${SCALES.pr(1.3125)} ${SCALES.pb(0.6625)}
            ${SCALES.pl(1.3125)};
          margin: ${SCALES.mt(0)}
            ${SCALES.mr(0, 'calc(var(--modal-wrapper-padding-right) * -1)')}
            ${SCALES.mb(0)}
            ${SCALES.ml(0, 'calc(var(--modal-wrapper-padding-left) * -1)')};
        }

        .content > :global(*:first-child) {
          margin-top: 0;
        }

        .content > :global(*:last-child) {
          margin-bottom: 0;
        }
      `}</style>
    </>
  )
}

ModalContentComponent.defaultProps = defaultProps
ModalContentComponent.displayName = 'GeistModalContent'
const ModalContent = withScaleable(ModalContentComponent)
export default ModalContent
