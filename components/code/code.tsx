import React, { useMemo } from 'react'
import withDefaults from '../utils/with-defaults'
import useTheme from '../styles/use-theme'

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

export type CodeProps = Props & typeof defaultProps & React.HTMLAttributes<any>

const Code: React.FC<React.PropsWithChildren<CodeProps>> = React.memo(({
  children, block, bash, darkBash, className, width, ...props
}) => {
  const theme = useTheme()
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
          line-height: 1.5;
          padding: ${theme.layout.gapHalf};
          text-align: left;
          width: ${width ? width : 'initial'};
          max-width: 100%;
        }
        
        pre :global(p) {
          margin: 0;
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
})

export default withDefaults(Code, defaultProps)
