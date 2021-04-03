import React from 'react'

interface Props {}

const defaultProps = {}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type FooterColumnProps = Props & typeof defaultProps & NativeAttrs

const FooterColumn: React.FC<React.PropsWithChildren<FooterColumnProps>> = ({
  children,
  ...props
}) => {
  return <div {...props}>{children}</div>
}

const MemoFooterColumn = React.memo(FooterColumn)

export default MemoFooterColumn
