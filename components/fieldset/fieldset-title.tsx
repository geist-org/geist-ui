import React from 'react'

interface Props {
  className?: string
}

const defaultProps = {
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>
export type FieldsetTitleProps = Props & NativeAttrs

const FieldsetTitle: React.FC<React.PropsWithChildren<FieldsetTitleProps>> = ({
  className,
  children,
  ...props
}: React.PropsWithChildren<FieldsetTitleProps> & typeof defaultProps) => {
  return (
    <>
      <div className={`title ${className}`} {...props}>
        {children}
      </div>
      <style jsx>{`
        .title {
          line-height: 1.5;
          display: inline-flex;
          word-break: break-word;
          font-weight: 600;
          letter-spacing: -0.020625em;
          font-size: 1.25em;
          width: auto;
        }
      `}</style>
    </>
  )
}

FieldsetTitle.defaultProps = defaultProps
FieldsetTitle.displayName = 'GeistFieldsetTitle'
export default FieldsetTitle
