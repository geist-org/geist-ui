import React from 'react'
import withDefaults from '../utils/with-defaults'

interface Props {
  center?: boolean
  className?: string
}

const defaultProps = {
  center: false,
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type PageHeaderProps = Props & typeof defaultProps & NativeAttrs

const PageHeader: React.FC<React.PropsWithChildren<PageHeaderProps>> = ({
  children,
  center,
  className,
  ...props
}) => {
  return (
    <header className={`${center ? 'center' : ''} ${className}`} {...props}>
      {children}
      <style jsx>{`
        header {
          width: 100%;
        }

        .center {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </header>
  )
}

export default withDefaults(PageHeader, defaultProps)
