import React from 'react'
import withDefaults from '../utils/with-defaults'

interface Props {
  className?: string
}

const defaultProps = {
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type PageHeaderProps = Props & typeof defaultProps & NativeAttrs

const PageFooter: React.FC<React.PropsWithChildren<PageHeaderProps>> = ({ children, ...props }) => {
  return (
    <footer {...props}>
      {children}
      <style jsx>{`
        footer {
          width: 100%;
          position: absolute;
          bottom: 0;
        }
      `}</style>
    </footer>
  )
}

export default withDefaults(PageFooter, defaultProps)
