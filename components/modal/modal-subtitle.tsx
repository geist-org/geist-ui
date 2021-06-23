import React from 'react'
import useTheme from '../use-theme'
import useScaleable, { withScaleable } from '../use-scaleable'

interface Props {
  className?: string
}

const defaultProps = {
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLHeadingElement>, keyof Props>
export type ModalSubtitleProps = Props & NativeAttrs

const ModalSubtitleComponent: React.FC<React.PropsWithChildren<ModalSubtitleProps>> = ({
  className,
  children,
  ...props
}: React.PropsWithChildren<ModalSubtitleProps> & typeof defaultProps) => {
  const theme = useTheme()
  const { SCALES } = useScaleable()

  return (
    <>
      <p className={className} {...props}>
        {children}
      </p>
      <style jsx>{`
        p {
          font-weight: normal;
          display: inline-block;
          text-align: center;
          word-break: break-word;
          text-transform: uppercase;
          color: ${theme.palette.accents_5};
          font-size: ${SCALES.font(0.875)};
          line-height: 1.5em;
          width: ${SCALES.width(1, 'auto')};
          height: ${SCALES.height(1, '1.5em')};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }
      `}</style>
    </>
  )
}

ModalSubtitleComponent.defaultProps = defaultProps
ModalSubtitleComponent.displayName = 'GeistModalSubtitle'
const ModalSubtitle = withScaleable(ModalSubtitleComponent)
export default ModalSubtitle
