import React, { ReactNode } from 'react'
import withDefaults from '../utils/with-defaults'
import useTheme from '../styles/use-theme'

interface Props {
  caption?: ReactNode | string
  shadow?: boolean
  className?: string
  minWidth?: string
}

const defaultProps = {
  caption: '',
  shadow: false,
  className: '',
}

export type DisplayProps = Props & typeof defaultProps & React.HTMLAttributes<any>

const Display: React.FC<React.PropsWithChildren<DisplayProps>> = React.memo(({
  children, caption, shadow, className, minWidth, ...props
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
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto;
          border-radius: 4px;
          overflow: hidden;
          width: fit-content;
          min-width: ${minWidth ? minWidth : 'unset'};
          box-shadow: ${shadow ? theme.expressiveness.shadowLarge : 'none'};
        }
        
        .content :global(pre) {
          margin: 0;
          transition: min-width ease .2s;
          min-width: ${minWidth ? minWidth : 'unset'};
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
