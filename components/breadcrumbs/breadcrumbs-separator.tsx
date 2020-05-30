import React from 'react'
// import useTheme from '../styles/use-theme'
import withDefaults from '../utils/with-defaults'

interface Props {
  className?: string
}

const defaultProps = {
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type BreadcrumbsProps = Props & typeof defaultProps & NativeAttrs

const BreadcrumbsSeparator: React.FC<React.PropsWithChildren<BreadcrumbsProps>> = ({
  children,
  className,
}) => {
  // const theme = useTheme()

  return (
    <div className={`separator ${className}`}>
      {children}
      <style jsx>{`
        .separator {
          display: inline-flex;
          margin: 0 8px;
          user-select: none;
          pointer-events: none;
          align-items: center;
        }
      `}</style>
    </div>
  )
}

const MemoBreadcrumbsSeparator = React.memo(BreadcrumbsSeparator)

export default withDefaults(MemoBreadcrumbsSeparator, defaultProps)
