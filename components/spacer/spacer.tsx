import React from 'react'
import useScaleable, { withScaleable } from '../use-scaleable'

interface Props {
  inline?: boolean
  className?: string
}

const defaultProps = {
  inline: false,
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type SpacerProps = Props & NativeAttrs

const SpacerComponent: React.FC<SpacerProps> = ({
  inline,
  className,
  ...props
}: SpacerProps & typeof defaultProps) => {
  const { SCALES } = useScaleable()

  return (
    <span className={className} {...props}>
      <style jsx>{`
        span {
          display: ${inline ? 'inline-block' : 'block'};
          width: ${SCALES.width(1)};
          height: ${SCALES.height(1)};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }
      `}</style>
    </span>
  )
}

SpacerComponent.defaultProps = defaultProps
SpacerComponent.displayName = 'GeistSpacer'
const Spacer = withScaleable(SpacerComponent)
export default Spacer
