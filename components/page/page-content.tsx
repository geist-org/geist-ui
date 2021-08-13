import React from 'react'
import useScaleable, { withScaleable } from '../use-scaleable'

interface Props {
  className?: string
}

const defaultProps = {
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type PageContentProps = Props & NativeAttrs

const PageContentComponent: React.FC<React.PropsWithChildren<PageContentProps>> = ({
  className,
  children,
  ...props
}: React.PropsWithChildren<PageContentProps> & typeof defaultProps) => {
  const { SCALES } = useScaleable()

  return (
    <main className={className} {...props}>
      {children}
      <style jsx>{`
        main {
          font-size: ${SCALES.font(1)};
          width: ${SCALES.width(1, '100%')};
          height: ${SCALES.height(1, '100%')};
          padding: ${SCALES.pt(3.125)} ${SCALES.pr(0)} ${SCALES.pb(3.125)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }
      `}</style>
    </main>
  )
}

PageContentComponent.defaultProps = defaultProps
PageContentComponent.displayName = 'GeistPageContent'
const PageContent = withScaleable(PageContentComponent)
export default PageContent
