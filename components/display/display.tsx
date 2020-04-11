import React, { ReactNode } from 'react'
import withDefaults from '../utils/with-defaults'
import useTheme from '../styles/use-theme'

interface Props {
  caption?: ReactNode | string
  shadow?: boolean
  className?: string
  width?: string
}

const defaultProps = {
  caption: '' as ReactNode | string,
  shadow: false,
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type DisplayProps = Props & typeof defaultProps & NativeAttrs

const Display: React.FC<React.PropsWithChildren<DisplayProps>> = React.memo(({
  children, caption, shadow, className, width, ...props
}) => {
  const theme = useTheme()
  return (
    <div className={`display ${className}`} {...props}>
      <div className="content">{children}</div>
      <div className="caption">{caption}</div>
  
      <style jsx>{`
        .display {
          display: block;
          margin: 2.5rem auto;
          max-width: 100%;
        }
        
        .content {
          display: block;
          margin: 0 auto;
          border-radius: 4px;
          overflow: hidden;
          width: ${width ? width : 'max-content'};
          box-shadow: ${shadow ? theme.expressiveness.shadowLarge : 'none'};
          max-width: 100%;
        }
        
        .content :global(pre) {
          margin: 0;
          transition: min-width ease .2s;
        }
        
        .content :global(img) {
          display: block;
        }

        .caption {
          font-size: .875rem;
          line-height: 1.571em;
          color: ${theme.palette.accents_5};
          margin: ${shadow ? '2.5rem' : '1.3rem'} auto 0;
          text-align: center;
          max-width: 85%;
        }
      `}</style>
    </div>
  )
})

export default withDefaults(Display, defaultProps)
