import React from 'react'
import withDefaults from '../utils/with-defaults'

interface Props {
  className?: string
}

const defaultProps = {
  className: ''
}

export type FieldsetFooterStatusProps = Props & typeof defaultProps & React.HTMLAttributes<any>

const FieldsetFooterStatus: React.FC<FieldsetFooterStatusProps> = React.memo(({
  className, children, ...props
}) => {
  return (
    <>
      <div className={className} {...props}>{children}</div>
      <style jsx>{`
        div {
          font-size: .875rem;
          line-height: 1.2;
          margin: 0;
          display: inline-flex;
          word-break: break-word;
        }
        
        div>:global(p) {
          margin: 0;
        }
      `}</style>
    </>
  )
})

export default withDefaults(FieldsetFooterStatus, defaultProps)
