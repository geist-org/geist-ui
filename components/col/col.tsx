import React from 'react'

interface Props {
  span?: number
  offset?: number
  component?: keyof JSX.IntrinsicElements
  className?: string
}

const defaultProps = {
  span: 24,
  offset: 0,
  component: 'div' as keyof JSX.IntrinsicElements,
  className: '',
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type ColProps = Props & NativeAttrs

const Col: React.FC<React.PropsWithChildren<ColProps>> = ({
  component,
  children,
  span,
  offset,
  className,
  ...props
}: React.PropsWithChildren<ColProps> & typeof defaultProps) => {
  const Component = component

  return (
    <Component className={`col ${className}`} {...props}>
      {children}
      <style jsx>{`
        .col {
          float: left;
          box-sizing: border-box;
          padding-left: calc(var(--row-gap) / 2);
          padding-right: calc(var(--row-gap) / 2);
          width: ${(100 / 24) * span}%;
          margin-left: ${(100 / 24) * offset}%;
        }
      `}</style>
    </Component>
  )
}

Col.defaultProps = defaultProps
Col.displayName = 'GeistCol'
export default Col
