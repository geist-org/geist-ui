import React, { useMemo } from 'react'
import useScale, { withScale } from '../use-scale'
import useTheme from '../use-theme'
import { addColorAlpha } from '../utils/color'

interface Props {
  block?: boolean
  className?: string
  name?: string
  classic?: boolean
}

const defaultProps = {
  block: false,
  className: '',
  name: '',
  classic: false,
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type CodeProps = Props & NativeAttrs

const CodeComponent: React.FC<React.PropsWithChildren<CodeProps>> = ({
  children,
  block,
  className,
  name,
  classic,
  ...props
}: React.PropsWithChildren<CodeProps> & typeof defaultProps) => {
  const { SCALES } = useScale()
  const theme = useTheme()
  const { background, border } = useMemo(() => {
    if (!classic)
      return {
        border: theme.palette.accents_1,
        background: addColorAlpha(theme.palette.accents_1, 0.75),
      }
    return {
      border: theme.palette.accents_2,
      background: theme.palette.background,
    }
  }, [classic, theme.palette])

  if (!block) return <code {...props}>{children}</code>

  return (
    <div className="pre">
      {name && (
        <header>
          <div className="name">{name}</div>
        </header>
      )}
      <pre className={className} {...props}>
        {children}
      </pre>
      <style jsx>{`
        .pre {
          max-width: 100%;
          border: 1px solid ${border};
          font-size: ${SCALES.font(0.875)};
          width: ${SCALES.width(1, 'initial')};
          height: ${SCALES.height(1, 'auto')};
          margin: ${SCALES.mt(1.3)} ${SCALES.mr(0)} ${SCALES.mb(1.3)} ${SCALES.ml(0)};
          border-radius: ${theme.layout.radius};
          background-color: ${background};
        }
        pre {
          max-width: 100%;
          font-size: inherit;
          border: none;
          margin: 0;
          line-height: 1.5em;
          padding: ${SCALES.pt(1.1)} ${SCALES.pr(1)} ${SCALES.pb(1.1)} ${SCALES.pl(1)};
        }
        .dark {
          color: white;
          background: black;
        }
        .dark code {
          color: white;
        }
        header {
          height: auto;
          width: 100%;
          display: flex;
          justify-content: space-between;
          border-radius: ${theme.layout.radius};
          background-color: transparent;
        }
        .name {
          border: 1px solid ${theme.palette.accents_2};
          background-color: ${theme.palette.accents_2};
          color: ${theme.palette.accents_5};
          height: auto;
          line-height: 1.35em;
          display: inline-flex;
          align-items: center;
          font-size: ${SCALES.font(0.8125)};
          padding: ${SCALES.font(0.32)} ${SCALES.font(0.5)} ${SCALES.font(0.32)}
            ${SCALES.font(0.5)};
          width: auto;
          border-top-left-radius: calc(${theme.layout.radius} - 1px);
          border-bottom-right-radius: ${theme.layout.radius};
        }
      `}</style>
    </div>
  )
}

CodeComponent.defaultProps = defaultProps
CodeComponent.displayName = 'GeistCode'
const Code = withScale(CodeComponent)
export default Code
