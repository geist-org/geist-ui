import React from 'react'
import useScaleable, { withScaleable } from '../use-scaleable'

interface Props {
  block?: boolean
  className?: string
}

const defaultProps = {
  block: false,
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type CodeProps = Props & NativeAttrs

const CodeComponent: React.FC<React.PropsWithChildren<CodeProps>> = ({
  children,
  block,
  className,
  ...props
}: React.PropsWithChildren<CodeProps> & typeof defaultProps) => {
  const { SCALES } = useScaleable()

  if (!block) return <code {...props}>{children}</code>

  return (
    <>
      <pre className={className} {...props}>
        <code>{children}</code>
      </pre>
      <style jsx>{`
        pre {
          max-width: 100%;
          font-size: ${SCALES.font(0.875)};
          width: ${SCALES.width(1, 'initial')};
          height: ${SCALES.height(1, 'auto')};
          padding: ${SCALES.pt(1)} ${SCALES.pr(1.3)} ${SCALES.pb(1)} ${SCALES.pl(1.3)};
          margin: ${SCALES.mt(1.3)} ${SCALES.mr(0)} ${SCALES.mb(1.3)} ${SCALES.ml(0)};
        }

        .dark {
          color: white;
          background: black;
        }

        .dark code {
          color: white;
        }
      `}</style>
    </>
  )
}

CodeComponent.defaultProps = defaultProps
CodeComponent.displayName = 'GeistCode'
const Code = withScaleable(CodeComponent)
export default Code
