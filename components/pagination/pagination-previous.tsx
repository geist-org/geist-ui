import React from 'react'
import PaginationItem from './pagination-item'
import { usePaginationContext } from './pagination-context'

export type PaginationPreviousProps = React.ButtonHTMLAttributes<any>

const PaginationPrevious: React.FC<React.PropsWithChildren<PaginationPreviousProps>> = ({
  children,
  ...props
}) => {
  const { update, isFirst } = usePaginationContext()
  return (
    <PaginationItem
      onClick={() => update && update('prev')}
      disabled={isFirst}
      {...props}>
      {children}
    </PaginationItem>
  )
}

PaginationPrevious.displayName = 'GeistPaginationPrevious'
export default PaginationPrevious
