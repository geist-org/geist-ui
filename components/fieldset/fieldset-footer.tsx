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
export type FieldsetFooterProps = Props & NativeAttrs

const FieldsetFooterComponent: React.FC<React.PropsWithChildren<FieldsetFooterProps>> = ({
  className,
  children,
  ...props
}: React.PropsWithChildren<FieldsetFooterProps> & typeof defaultProps) => {
  const theme = useTheme()
  const { SCALES } = useScaleable()

  return (
    <footer className={className} {...props}>
      {children}
      <style jsx>{`
        footer {
          background-color: ${theme.palette.accents_1};
          border-top: 1px solid ${theme.palette.border};
          border-bottom-left-radius: ${theme.layout.radius};
          border-bottom-right-radius: ${theme.layout.radius};
          display: flex;
          justify-content: space-between;
          align-items: center;
          overflow: hidden;
          color: ${theme.palette.accents_6};
          padding: ${theme.layout.gapHalf} ${theme.layout.gap};
          box-sizing: border-box;
          font-size: ${SCALES.font(0.875)};
          width: ${SCALES.width(1, 'auto')};
          height: ${SCALES.height(2.875)};
          padding: ${SCALES.pt(0.625)} ${SCALES.pr(1.31)} ${SCALES.pb(0.625)}
            ${SCALES.pl(1.31)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }
      `}</style>
    </footer>
  )
}

FieldsetFooterComponent.defaultProps = defaultProps
FieldsetFooterComponent.displayName = 'GeistFieldsetFooter'
const FieldsetFooter = withScaleable(FieldsetFooterComponent)
export default FieldsetFooter
