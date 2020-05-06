import React from 'react'
import withDefaults from '../utils/with-defaults'

interface Props {
  className?: string
}

const defaultProps = {
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type FieldsetFooterStatusProps = Props & typeof defaultProps & NativeAttrs

const FieldsetFooterStatus: React.FC<FieldsetFooterStatusProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <>
      <div className={className} {...props}>
        {children}
      </div>
      <style jsx>{`
        div {
          font-size: 0.875rem;
          line-height: 1.2;
          margin: 0;
          display: inline-flex;
          word-break: break-word;
        }

        div > :global(p) {
          margin: 0;
        }
      `}</style>
    </>
  )
}

const MemoFieldsetFooterStatus = React.memo(FieldsetFooterStatus)

export default withDefaults(MemoFieldsetFooterStatus, defaultProps)
