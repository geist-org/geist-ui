import React from 'react'
import useScaleable, { withScaleable } from '../use-scaleable'

interface Props {
  className?: string
}

const defaultProps = {
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type FieldsetContentProps = Props & NativeAttrs

const FieldsetContentComponent: React.FC<
  React.PropsWithChildren<FieldsetContentProps>
> = ({
  className,
  children,
  ...props
}: React.PropsWithChildren<FieldsetContentProps> & typeof defaultProps) => {
  const { SCALES } = useScaleable()

  return (
    <div className={`content ${className}`} {...props}>
      {children}
      <style jsx>{`
        .content {
          width: ${SCALES.width(1, '100%')};
          height: ${SCALES.height(1, 'auto')};
          padding: ${SCALES.pt(1.3)} ${SCALES.pr(1.3)} ${SCALES.pb(1.3)} ${SCALES.pl(1.3)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }

        .content :global(> *:first-child) {
          margin-top: 0;
        }

        .content :global(> *:last-child) {
          margin-bottom: 0;
        }
      `}</style>
    </div>
  )
}

FieldsetContentComponent.defaultProps = defaultProps
FieldsetContentComponent.displayName = 'GeistFieldsetContent'
const FieldsetContent = withScaleable(FieldsetContentComponent)
export default FieldsetContent
