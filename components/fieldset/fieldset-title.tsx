import React from 'react'
import withDefaults from '../utils/with-defaults'

interface Props {
  className?: string
}

const defaultProps = {
  className: ''
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLHeadingElement>, keyof Props>
export type FieldsetTitleProps = Props & typeof defaultProps & NativeAttrs

const FieldsetTitle: React.FC<FieldsetTitleProps> = ({
  className, children, ...props
}) => {
  return (
    <>
      <h4 className={className} {...props}>{children}</h4>
      <style jsx>{`
        h4 {
          font-size: 1.25rem;
          line-height: 1.5;
          margin: 0;
          display: inline-flex;
          word-break: break-word;
        }
      `}</style>
    </>
  )
}

const MemoFieldsetTitle = React.memo(FieldsetTitle)

export default withDefaults(MemoFieldsetTitle, defaultProps)
