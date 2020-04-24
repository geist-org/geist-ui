import React, { useMemo, useRef } from 'react'
import useTheme from '../styles/use-theme'
import withDefaults from '../utils/with-defaults'
import { SnippetTypes, CopyTypes } from '../utils/prop-types'
import { getStyles } from './styles'
import SnippetIcon from './snippet-icon'
import useClipboard from '../utils/use-clipboard'
import useToasts from '../toast/use-toast'

interface Props {
  text?: string | string[]
  filled?: boolean
  width?: string
  copy?: CopyTypes
  type?: SnippetTypes
  className?: string
}

const defaultProps = {
  filled: false,
  width: 'initial',
  copy: 'default' as CopyTypes,
  type: 'default' as SnippetTypes,
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type SnippetProps = Props & typeof defaultProps & NativeAttrs

const textArrayToString = (text: string[]): string => {
  return text.reduce((pre, current) => {
    if (!current) return pre
    return pre ? `${pre}\n${current}` : current
  }, '')
}

const Snippet: React.FC<React.PropsWithChildren<SnippetProps>> = React.memo(({
  type, filled, children, text, width, copy: copyType, className, ...props
}) => {
  const theme = useTheme()
  const { copy } = useClipboard()
  const [, setToast] = useToasts()
  const ref = useRef<HTMLPreElement>(null)
  const isMultiLine = text && Array.isArray(text)
  
  const style = useMemo(() => getStyles(type, theme.palette, filled),[type, theme.palette, filled])
  const showCopyIcon = useMemo(() => copyType !== 'prevent', [copyType])
  const childText = useMemo<string | undefined | null>(() => {
    if (isMultiLine) return textArrayToString(text as string[])
    if (!children) return text as string
    if (!ref.current) return ''
    return ref.current.textContent
  }, [ref.current, children, text])

  const clickHandler = () => {
    if (!childText || !showCopyIcon) return
    copy(childText)
    if (copyType === 'slient') return
    setToast({ text: 'Copied to clipboard!', type: 'success' })
  }
  
  return (
    <div className={`snippet ${className}`} {...props}>
      {isMultiLine ? (
        (text as string[]).map((t, index) => <pre key={`snippet-${index}-${t}`}>{t}</pre>)
      ) : <pre ref={ref}>{children || text}</pre>}
      {showCopyIcon && <div className="copy" onClick={clickHandler}><SnippetIcon /></div>}
      <style jsx>{`
        .snippet {
          position: relative;
          width: ${width};
          max-width: 100%;
          padding: ${theme.layout.gapHalf};
          padding-right: calc(2 * ${theme.layout.gap});
          color: ${style.color};
          background-color: ${style.bgColor};
          border: 1px solid ${style.border};
          border-radius: ${theme.layout.radius};
        }
        
        pre {
          margin: 0;
          padding: 0;
          border: none;
          background-color: transparent;
          color: ${style.color};
          font-size: .8125rem;
        }
        
        pre::before {
          content: "$ ";
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
          top: -2px;
          transform: translateY(50%);
          background-color: ${style.bgColor};
          display: inline-flex;
          justify-content: center;
          align-items: center;
          width: calc(2 * ${theme.layout.gap});
          color: inherit;
          transition: opacity 0.2s ease 0s;
          border-radius: ${theme.layout.radius};
          cursor: pointer;
          user-select: none;
        }
        
        .copy:hover {
          opacity: .7;
        }
      `}</style>
    </div>
  )
})

export default withDefaults(Snippet, defaultProps)
