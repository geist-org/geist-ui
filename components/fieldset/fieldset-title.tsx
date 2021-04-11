import React from 'react'
import withDefaults from '../utils/with-defaults'

interface Props {
  className?: string
}

const defaultProps = {
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>
export type FieldsetTitleProps = Props & typeof defaultProps & NativeAttrs

const FieldsetTitle: React.FC<FieldsetTitleProps> = ({
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
          font-size: 1.25rem;
          line-height: 1.5;
          margin: 0;
          display: inline-flex;
          word-break: break-word;
          font-weight: 600;
          letter-spacing: -0.020625rem;
        }
      `}</style>
    </>
  )
}

const MemoFieldsetTitle = React.memo(FieldsetTitle)

export default withDefaults(MemoFieldsetTitle, defaultProps)
