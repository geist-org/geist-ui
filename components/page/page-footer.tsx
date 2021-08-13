import React from 'react'
import useScaleable, { withScaleable } from '../use-scaleable'

interface Props {
  className?: string
}

const defaultProps = {
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type PageFooterProps = Props & NativeAttrs

const PageFooterComponent: React.FC<React.PropsWithChildren<PageFooterProps>> = ({
  children,
  ...props
}: React.PropsWithChildren<PageFooterProps> & typeof defaultProps) => {
  const { SCALES } = useScaleable()

  return (
    <footer {...props}>
      {children}
      <style jsx>{`
        footer {
          position: absolute;
          bottom: 0;
          font-size: ${SCALES.font(1)};
          width: ${SCALES.width(1, '100%')};
          height: ${SCALES.height(1, 'auto')};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }
      `}</style>
    </footer>
  )
}

PageFooterComponent.defaultProps = defaultProps
PageFooterComponent.displayName = 'GeistPageFooter'
const PageFooter = withScaleable(PageFooterComponent)
export default PageFooter
