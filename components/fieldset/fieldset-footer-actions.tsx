import React from 'react'
import withDefaults from '../utils/with-defaults'

interface Props {
  className?: string
}

const defaultProps = {
  className: ''
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type FieldsetFooterActionsProps = Props & typeof defaultProps & NativeAttrs

const FieldsetFooterActions: React.FC<FieldsetFooterActionsProps> = React.memo(({
  className, children, ...props
}) => {
  return (
    <>
      <div className={className} {...props}>{children}</div>
      <style jsx>{`
        div {
          display: flex;
          justify-content: flex-end;
        }
      `}</style>
    </>
  )
})

export default withDefaults(FieldsetFooterActions, defaultProps)
