import React from 'react'
import useScaleable, { withScaleable } from '../use-scaleable'

interface Props {
  className?: string
}

const defaultProps = {
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type BreadcrumbsSeparatorProps = Props & NativeAttrs

const Separator: React.FC<React.PropsWithChildren<BreadcrumbsSeparatorProps>> = ({
  children,
  className,
}: BreadcrumbsSeparatorProps & typeof defaultProps) => {
  const { SCALES } = useScaleable()

  return (
    <div className={`separator ${className}`}>
      {children}
      <style jsx>{`
        .separator {
          display: inline-flex;
          user-select: none;
          pointer-events: none;
          align-items: center;
          width: ${SCALES.width(1, 'auto')};
          height: ${SCALES.height(1, 'auto')};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0.5)} ${SCALES.mb(0)} ${SCALES.ml(0.5)};
        }
      `}</style>
    </div>
  )
}

Separator.defaultProps = defaultProps
Separator.displayName = 'GeistBreadcrumbsSeparator'
const BreadcrumbsSeparator = withScaleable(Separator)
export default BreadcrumbsSeparator
