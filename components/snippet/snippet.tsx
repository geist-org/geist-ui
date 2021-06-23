import React, { useMemo, useRef } from 'react'
import useTheme from '../use-theme'
import { SnippetTypes, CopyTypes, NormalTypes } from '../utils/prop-types'
import { getStyles } from './styles'
import SnippetIcon from './snippet-icon'
import useClipboard from '../utils/use-clipboard'
import useToasts from '../use-toasts'
import useScaleable, { withScaleable } from '../use-scaleable'

export type ToastTypes = NormalTypes
interface Props {
  text?: string | string[]
  symbol?: string
  toastText?: string
  toastType?: ToastTypes
  filled?: boolean
  copy?: CopyTypes
  type?: SnippetTypes
  className?: string
}

const defaultProps = {
  filled: false,
  symbol: '$',
  toastText: 'Copied to clipboard!',
  toastType: 'success' as ToastTypes,
  copy: 'default' as CopyTypes,
  type: 'default' as SnippetTypes,
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type SnippetProps = Props & NativeAttrs

const textArrayToString = (text: string[]): string => {
  return text.reduce((pre, current) => {
    if (!current) return pre
    return pre ? `${pre}\n${current}` : current
  }, '')
}

const SnippetComponent: React.FC<React.PropsWithChildren<SnippetProps>> = ({
  type,
  filled,
  children,
  symbol,
  toastText,
  toastType,
  text,
  copy: copyType,
  className,
  ...props
}: React.PropsWithChildren<SnippetProps> & typeof defaultProps) => {
  const theme = useTheme()
  const { SCALES } = useScaleable()
  const { copy } = useClipboard()
  const [, setToast] = useToasts()
  const ref = useRef<HTMLPreElement>(null)
  const isMultiLine = text && Array.isArray(text)

  const style = useMemo(
    () => getStyles(type, theme.palette, filled),
    [type, theme.palette, filled],
  )
  const showCopyIcon = useMemo(() => copyType !== 'prevent', [copyType])
  const childText = useMemo<string | undefined | null>(() => {
    if (isMultiLine) return textArrayToString(text as string[])
    if (!children) return text as string
    if (!ref.current) return ''
    return ref.current.textContent
  }, [ref.current, children, text])
  const symbolBefore = useMemo(() => {
    const str = symbol.trim()
    return str ? `${str} ` : ''
  }, [symbol])

  const clickHandler = () => {
    if (!childText || !showCopyIcon) return
    copy(childText)
    if (copyType === 'silent') return
    setToast({ text: toastText, type: toastType })
  }

  return (
    <div className={`snippet ${className}`} {...props}>
      {isMultiLine ? (
        (text as string[]).map((t, index) => <pre key={`snippet-${index}-${t}`}>{t}</pre>)
      ) : (
        <pre ref={ref}>{children || text}</pre>
      )}
      {showCopyIcon && (
        <div className="copy" onClick={clickHandler}>
          <SnippetIcon />
        </div>
      )}
      <style jsx>{`
        .snippet {
          position: relative;
          max-width: 100%;
          color: ${style.color};
          background-color: ${style.bgColor};
          border: 1px solid ${style.border};
          border-radius: ${theme.layout.radius};
          --snippet-font-size: ${SCALES.font(0.8125)};
          --snippet-padding-top: ${SCALES.pt(0.667)};
          font-size: var(--snippet-font-size);
          width: ${SCALES.width(1, 'initial')};
          height: ${SCALES.height(1, 'auto')};
          padding: ${SCALES.pt(0.667)} ${SCALES.pr(2.667)} ${SCALES.pb(0.667)}
            ${SCALES.pl(0.667)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }

        pre {
          margin: 0;
          padding: 0;
          border: none;
          background-color: transparent;
          color: ${style.color};
          font-size: inherit;
        }

        pre::before {
          content: '${symbolBefore}';
          user-select: none;
        }

        pre :global(*) {
          margin: 0;
          padding: 0;
          font-size: inherit;
          color: inherit;
        }

        .copy {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          height: calc(100% - 2px);
          background-color: ${style.bgColor};
          display: inline-flex;
          justify-content: center;
          align-items: ${isMultiLine ? 'flex-start' : 'center'};
          width: calc(3.281 * var(--snippet-font-size));
          color: inherit;
          transition: opacity 0.2s ease 0s;
          border-radius: ${theme.layout.radius};
          cursor: pointer;
          user-select: none;
          padding-top: ${isMultiLine ? 'var(--snippet-padding-top)' : 0};
        }

        .copy:hover {
          opacity: 0.7;
        }
      `}</style>
    </div>
  )
}

SnippetComponent.defaultProps = defaultProps
SnippetComponent.displayName = 'GeistSnippet'
const Snippet = withScaleable(SnippetComponent)
export default Snippet
