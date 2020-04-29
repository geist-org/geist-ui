import React, { useMemo } from 'react'
import withDefaults from '../utils/with-defaults'
import useWarning from '../utils/use-warning'

interface Props {
  bash?: boolean
  darkBash?: boolean
  block?: boolean
  width?: string
  className?: string
}

const defaultProps = {
  bash: false,
  darkBash: false,
  block: false,
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type CodeProps = Props & typeof defaultProps & NativeAttrs

const Code: React.FC<React.PropsWithChildren<CodeProps>> = ({
  children, block, bash, darkBash, className, width, ...props
}) => {
  if (bash) {
    useWarning('Props "bash" is deprecated. Use `Snippet` instead of it.', 'code')
  }
  if (darkBash) {
    useWarning('Props "darkBash" is deprecated. Use `Snippet` instead of it.', 'code')
  }
  
  const isBash = bash || darkBash
  const isBlock = isBash || block
  if (!isBlock) return <code {...props}>{children}</code>
  const classes = useMemo(
    () => `${darkBash ? 'dark' : ''} ${className}`,
    [className, darkBash]
  )

  return (
    <>
      <pre className={classes} {...props}><code>{children}</code></pre>
      <style jsx>{`
        pre {
          width: ${width ? width : 'initial'};
          max-width: 100%;
        }
        
        .dark {
          color: white;
          background: black;
        }
        
        .dark code {
          color: white;
        }
        
        pre:before {
          content: '$ ';
          display: ${isBash ? 'inline-block' : 'none'};
          font-weight: 500;
          user-select: none;
        }
      `}</style>
    </>
  )
}

const MemoCode = React.memo(Code)

export default withDefaults(MemoCode, defaultProps)
